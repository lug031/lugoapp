import { defineStore } from 'pinia'
import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  confirmSignUp,
  confirmSignIn,
  fetchAuthSession,
  fetchUserAttributes,
} from 'aws-amplify/auth'
import { jwtDecode } from 'jwt-decode'
import type { DecodedToken, LoginResponse, AuthState } from '@/types/auth.types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
    isAdminUser: false,
    isLeadUser: false,
    userAttributes: null,
  }),

  actions: {
    resetUserState() {
      this.user = null
      this.isAdminUser = false
      this.isLeadUser = false
      this.userAttributes = null
    },

    resetUIState() {
      this.loading = false
      this.error = null
    },

    async updateUserRoles(): Promise<void> {
      try {
        const token = await this.getAuthToken()
        if (!token) {
          this.isAdminUser = false
          this.isLeadUser = false
          return
        }

        const decoded = jwtDecode<DecodedToken>(token)

        // Verificar si el usuario pertenece al grupo 'admin'
        this.isAdminUser = decoded['cognito:groups']?.includes('admin') || false

        // Verificar si el usuario pertenece al grupo 'lead'
        this.isLeadUser = decoded['cognito:groups']?.includes('lead') || false

        // También podemos verificar roles personalizados si existen
        if (decoded['custom:role'] === 'lead') {
          this.isLeadUser = true
        }
      } catch (error) {
        console.error('Error updating user roles:', error)
        this.isAdminUser = false
        this.isLeadUser = false
      }
    },

    async login(email: string, password: string): Promise<LoginResponse> {
      this.loading = true
      this.error = null

      this.resetUserState()
      try {
        const result = await signIn({
          username: email,
          password,
        })

        if (!result) {
          throw new Error('Sign in failed - no result returned')
        }

        if (result.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          return {
            requiresNewPassword: true,
            email,
            temporaryPassword: password,
          }
        }

        if (result.isSignedIn) {
          try {
            const user = await getCurrentUser()
            this.user = user
            const attributes = await fetchUserAttributes()
            this.userAttributes = attributes
            await this.updateUserRoles()
          } catch (error) {
            throw new Error(
              `Signed in but failed to get user details: ${
                error instanceof Error ? error.message : String(error)
              }`,
            )
          }
        }

        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
        this.error = errorMessage
        throw new Error(`Login failed: ${errorMessage}`)
      } finally {
        this.loading = false
      }
    },

    async completeNewPasswordChallenge(
      email: string,
      temporaryPassword: string,
      newPassword: string,
    ) {
      this.loading = true
      this.error = null
      try {
        const result = await signIn({
          username: email,
          password: temporaryPassword,
          options: {
            authFlowType: 'USER_PASSWORD_AUTH',
          },
        })

        if (result.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          await this.handleConfirmPasswordChallenge(newPassword)
          const user = await getCurrentUser()
          this.user = user
          await this.updateUserRoles()
          return true
        }
        return false
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    async handleConfirmPasswordChallenge(newPassword: string) {
      try {
        const response = await confirmSignIn({
          challengeResponse: newPassword,
        })
        return response
      } catch (error) {
        throw new Error('Error al confirmar la nueva contraseña')
      }
    },

    async register(email: string, password: string, isLead: boolean = false) {
      this.loading = true
      this.error = null
      try {
        // Preparar atributos de usuario incluyendo el rol personalizado si es lead
        const userAttributes: Record<string, string> = {
          email,
        }

        if (isLead) {
          userAttributes['custom:role'] = 'lead'
        }

        const { isSignUpComplete, userId, nextStep } = await signUp({
          username: email,
          password,
          options: {
            userAttributes,
            autoSignIn: false, // No iniciar sesión automáticamente
          },
        })

        return { isSignUpComplete, userId, nextStep }
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    async getAuthToken(): Promise<string | null> {
      try {
        const session = await fetchAuthSession()
        return session.tokens?.accessToken?.toString() || null
      } catch (error) {
        console.error('Error getting auth token:', error)
        return null
      }
    },

    async checkAdmin(): Promise<boolean> {
      try {
        const token = await this.getAuthToken()
        if (!token) return false

        const decoded = jwtDecode<DecodedToken>(token)
        return decoded['cognito:groups']?.includes('admin') || false
      } catch (error) {
        console.error('Error checking admin status:', error)
        return false
      }
    },

    async checkLead(): Promise<boolean> {
      try {
        const token = await this.getAuthToken()
        if (!token) return false

        const decoded = jwtDecode<DecodedToken>(token)
        // Verificar si está en el grupo 'lead' o tiene el atributo personalizado 'lead'
        return (
          decoded['cognito:groups']?.includes('lead') || decoded['custom:role'] === 'lead' || false
        )
      } catch (error) {
        console.error('Error checking lead status:', error)
        return false
      }
    },

    async confirmSignUp(email: string, code: string) {
      this.loading = true
      this.error = null
      try {
        const { isSignUpComplete } = await confirmSignUp({
          username: email,
          confirmationCode: code,
        })
        return isSignUpComplete
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    async resendConfirmationCode(email: string) {
      this.loading = true
      this.error = null
      try {
        return true
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await signOut()
        this.resetUserState()
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    async checkAuth() {
      try {
        const user = await getCurrentUser()
        this.user = user
        const attributes = await fetchUserAttributes()
        this.userAttributes = attributes
        await this.updateUserRoles()
      } catch {
        this.user = null
        this.userAttributes = null
        this.isAdminUser = false
        this.isLeadUser = false
      }
    },
  },

  getters: {
    isAuthenticated: (state): boolean => !!state.user,

    userName: (state): string => {
      const email = state.userAttributes?.email || state.user?.signInDetails?.loginId
      return email ? email.split('@')[0] : 'Usuario'
    },

    userEmail: (state): string | undefined =>
      state.userAttributes?.email || state.user?.signInDetails?.loginId,

    isAdmin: (state): boolean => state.isAdminUser,

    isLead: (state): boolean => state.isLeadUser,

    userRole: (state): string => {
      if (state.isAdminUser) return 'admin'
      if (state.isLeadUser) return 'lead'
      return 'member'
    },
  },
})
