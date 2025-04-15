<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="fixed z-50 p-4 flex flex-col gap-2 pointer-events-none" :class="[
    position === 'top-right' ? 'top-0 right-0' : '',
    position === 'top-left' ? 'top-0 left-0' : '',
    position === 'bottom-right' ? 'bottom-0 right-0' : '',
    position === 'bottom-left' ? 'bottom-0 left-0' : '',
    position === 'top-center' ? 'top-0 left-1/2 -translate-x-1/2' : '',
    position === 'bottom-center' ? 'bottom-0 left-1/2 -translate-x-1/2' : ''
  ]">
    <TransitionGroup name="toast" enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full" leave-active-class="transition-all duration-300 ease-in"
      leave-to-class="opacity-0 translate-x-full">
      <div v-for="toast in toasts" :key="toast.id"
        class="min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-md pointer-events-auto cursor-pointer flex items-center justify-between gap-2"
        :class="[
          toast.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : '',
          toast.type === 'error' ? 'bg-red-50 text-red-800 border-l-4 border-red-500' : '',
          toast.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500' : '',
          toast.type === 'info' ? 'bg-blue-50 text-blue-800 border-l-4 border-blue-500' : ''
        ]" @click="removeToast(toast.id)">
        <div class="flex items-center gap-2 flex-1">
          <span v-if="icons[toast.type]" class="text-xl">
            {{ icons[toast.type] }}
          </span>
          <span class="text-sm leading-relaxed">{{ toast.message }}</span>
        </div>
        <button
          class="text-2xl opacity-60 hover:opacity-100 transition-opacity p-0 px-2 bg-transparent border-none cursor-pointer"
          @click.stop="removeToast(toast.id)">
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useToast } from '@/composables/useToast';

const { toasts, removeToast } = useToast();

const position = computed(() =>
  toasts.value[0]?.position || 'top-right'
);

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
};
</script>

<style>
/* Para asegurar que las transiciones funcionen correctamente */
.toast-move {
  transition: transform 0.3s ease;
}
</style>
