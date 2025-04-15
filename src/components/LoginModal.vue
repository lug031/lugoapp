<template>
  <div v-if="isVisible" @click="closeOnOverlay"
    class="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
    <div @click.stop class="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
      <div class="px-6 py-4 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">
          {{ currentView === 'login' ? 'Iniciar sesión' :
            currentView === 'register' ? 'Crear cuenta' :
              currentView === 'confirm' ? 'Confirmar cuenta' :
                currentView === 'newPassword' ? 'Cambiar contraseña' : 'Iniciar sesión' }}
        </h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700 text-2xl font-semibold focus:outline-none">
          ×
        </button>
      </div>

      <div class="flex border-b" v-if="currentView !== 'confirm' && currentView !== 'newPassword'">
        <button @click="currentView = 'login'" :class="[
          'flex-1 py-3 text-center font-medium transition-colors',
          currentView === 'login'
            ? 'text-green-500 border-b-2 border-green-500'
            : 'text-gray-500 hover:text-gray-700'
        ]">
          Iniciar sesión
        </button>
        <button @click="currentView = 'register'" :class="[
          'flex-1 py-3 text-center font-medium transition-colors',
          currentView === 'register'
            ? 'text-green-500 border-b-2 border-green-500'
            : 'text-gray-500 hover:text-gray-700'
        ]">
          Registrarse
        </button>
      </div>

      <div class="p-6">
        <!-- Login Form -->
        <form v-if="currentView === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input type="email" id="email" v-model="form.email" placeholder="Tu correo electrónico"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" id="password" v-model="form.password" placeholder="Tu contraseña"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" v-model="form.rememberMe"
                class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded" />
              <span class="ml-2 text-sm text-gray-700">Recordarme</span>
            </label>
            <a href="#" class="text-sm text-green-500 hover:text-green-600">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex justify-center items-center"
            :disabled="authStore.loading">
            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ authStore.loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </form>

        <!-- Register Form -->
        <form v-if="currentView === 'register'" @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="regEmail" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input type="email" id="regEmail" v-model="form.email" placeholder="Tu correo electrónico"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <div>
            <label for="regPassword" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" id="regPassword" v-model="form.password" placeholder="Crea una contraseña"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar
              contraseña</label>
            <input type="password" id="confirmPassword" v-model="form.confirmPassword"
              placeholder="Repite tu contraseña"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="radio" name="accountType" value="lead" v-model="form.accountType"
                  class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300" />
                <span class="ml-2 text-sm text-gray-700">Lead (Requiere correo verificado)</span>
              </label>
              <label class="flex items-center">
                <input type="radio" name="accountType" value="member" v-model="form.accountType"
                  class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300" />
                <span class="ml-2 text-sm text-gray-700">Miembro</span>
              </label>
            </div>
          </div>

          <button type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex justify-center items-center"
            :disabled="authStore.loading">
            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ authStore.loading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>
        </form>

        <!-- Confirmation Form -->
        <form v-if="currentView === 'confirm'" @submit.prevent="handleConfirmation" class="space-y-4">
          <div class="text-center mb-4">
            <p class="text-gray-600">Hemos enviado un código de verificación a tu correo electrónico {{ form.email }}.
            </p>
          </div>

          <div>
            <label for="confirmationCode" class="block text-sm font-medium text-gray-700 mb-1">Código de
              verificación</label>
            <input type="text" id="confirmationCode" v-model="form.confirmationCode"
              placeholder="Ingresa el código de 6 dígitos"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <button type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex justify-center items-center"
            :disabled="authStore.loading">
            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ authStore.loading ? 'Verificando...' : 'Verificar cuenta' }}
          </button>

          <div class="text-center">
            <button type="button" @click="resendCode" class="text-sm text-green-500 hover:text-green-600">
              Reenviar código
            </button>
          </div>
        </form>

        <!-- New Password Form -->
        <form v-if="currentView === 'newPassword'" @submit.prevent="handleNewPassword" class="space-y-4">
          <div class="text-center mb-4">
            <p class="text-gray-600">
              Debes establecer una nueva contraseña para continuar.
            </p>
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
            <input type="password" id="newPassword" v-model="form.newPassword" placeholder="Ingresa tu nueva contraseña"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <div>
            <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva
              contraseña</label>
            <input type="password" id="confirmNewPassword" v-model="form.confirmNewPassword"
              placeholder="Confirma tu nueva contraseña"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              required />
          </div>

          <button type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex justify-center items-center"
            :disabled="authStore.loading">
            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            {{ authStore.loading ? 'Guardando...' : 'Guardar nueva contraseña' }}
          </button>
        </form>

        <!-- Error message -->
        <div v-if="authStore.error" class="mt-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {{ authStore.error }}
        </div>

        <!-- Success message -->
        <div v-if="successMessage" class="mt-4 bg-green-50 text-green-600 p-3 rounded-md text-sm">
          {{ successMessage }}
        </div>

        <div v-if="currentView === 'login' || currentView === 'register'" class="mt-6 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">O</span>
          </div>
        </div>

        <div v-if="currentView === 'login' || currentView === 'register'" class="mt-6 space-y-3">
          <button
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Continuar con Google
          </button>
          <button
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Continuar con Discord
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'login', 'register']);

// Stores y composables
const authStore = useAuthStore();
const toast = useToast();

// Estado local
const currentView = ref('login'); // 'login', 'register', 'confirm', 'newPassword'
const successMessage = ref('');
const temporaryPassword = ref('');

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  accountType: 'member',
  rememberMe: false,
  confirmationCode: '',
  newPassword: '',
  confirmNewPassword: '',
});

// Reset form and state when modal closes
watch(() => props.isVisible, (newVal) => {
  if (!newVal) {
    resetForm();
    currentView.value = 'login';
    successMessage.value = '';
    authStore.resetUIState();
  }
});

const resetForm = () => {
  form.email = '';
  form.password = '';
  form.confirmPassword = '';
  form.accountType = 'member';
  form.rememberMe = false;
  form.confirmationCode = '';
  form.newPassword = '';
  form.confirmNewPassword = '';
};

const close = () => {
  emit('close');
};

const closeOnOverlay = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('fixed')) {
    close();
  }
};

// Login
const handleLogin = async () => {
  try {
    successMessage.value = '';
    const result = await authStore.login(form.email, form.password);

    if (result.requiresNewPassword) {
      // Almacena temporalmente la contraseña actual
      temporaryPassword.value = form.password;
      currentView.value = 'newPassword';
      return;
    }

    if (result.isSignedIn) {
      toast.success('Inicio de sesión exitoso');
      emit('login', { email: form.email });
      close();
    }
  } catch (error) {
    // Error ya se maneja en el store y se muestra en el template
    console.error('Login error:', error);
  }
};

// Register
const handleRegister = async () => {
  try {
    // Validación de contraseñas
    if (form.password !== form.confirmPassword) {
      authStore.error = "Las contraseñas no coinciden";
      return;
    }

    successMessage.value = '';
    const result = await authStore.register(form.email, form.password);

    if (result.isSignUpComplete) {
      toast.success('Registro exitoso');
      emit('register', { email: form.email, accountType: form.accountType });
      close();
    } else if (result.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
      currentView.value = 'confirm';
      successMessage.value = 'Cuenta creada. Por favor verifica tu correo electrónico.';
    }
  } catch (error) {
    // Error ya se maneja en el store y se muestra en el template
    console.error('Register error:', error);
  }
};

// Confirmation
const handleConfirmation = async () => {
  try {
    successMessage.value = '';
    const confirmed = await authStore.confirmSignUp(form.email, form.confirmationCode);

    if (confirmed) {
      toast.success('Cuenta verificada correctamente');
      // Iniciar sesión automáticamente después de confirmar
      await authStore.login(form.email, form.password);
      emit('login', { email: form.email });
      close();
    }
  } catch (error) {
    console.error('Confirmation error:', error);
  }
};

// New Password
const handleNewPassword = async () => {
  try {
    // Validación de contraseñas
    if (form.newPassword !== form.confirmNewPassword) {
      authStore.error = "Las nuevas contraseñas no coinciden";
      return;
    }

    successMessage.value = '';
    const result = await authStore.completeNewPasswordChallenge(
      form.email,
      temporaryPassword.value,
      form.newPassword
    );

    if (result) {
      toast.success('Contraseña actualizada correctamente');
      emit('login', { email: form.email });
      close();
    }
  } catch (error) {
    console.error('New password error:', error);
  }
};

// Reenviar código
const resendCode = async () => {
  // Esta funcionalidad necesitaría ser implementada en el auth store
  toast.info('Función de reenvío de código no implementada');
};
</script>

<style>
/* Para asegurar que las transiciones funcionen correctamente */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
