<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
import LoginModal from './components/LoginModal.vue'

// Definir interfaces para los datos de login y registro
interface LoginData {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

interface RegisterData {
  email: string;
  accountType: 'lead' | 'member';
  username?: string;
  fullName?: string;
}

// Estado para controlar la visualización del modal de login
const showLoginModal = ref(false)

// Funciones para abrir y cerrar el modal
const openLoginModal = () => {
  showLoginModal.value = true
}

const closeLoginModal = () => {
  showLoginModal.value = false
}

// Funciones para manejar eventos de login y registro (con tipos definidos)
const handleLogin = (loginData: LoginData) => {
  console.log('Login con datos:', loginData)
  // Aquí iría la lógica de autenticación
}

const handleRegister = (registerData: RegisterData) => {
  console.log('Registro con datos:', registerData)
  // Aquí iría la lógica de registro
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- Barra de navegación con la prop para abrir el modal -->
    <NavBar @open-login-modal="openLoginModal" />

    <!-- Vista principal de la ruta actual -->
    <main class="flex-grow w-full">
      <RouterView />
    </main>

    <!-- Pie de página -->
    <AppFooter />

    <!-- Modal de login/registro -->
    <LoginModal :is-visible="showLoginModal" @close="closeLoginModal" @login="handleLogin" @register="handleRegister" />
  </div>
</template>
