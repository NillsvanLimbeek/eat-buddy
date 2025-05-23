<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import { X } from 'lucide-vue-next';
import { useTemplateRef } from 'vue';

interface Props {
  title: string;
  isOpen: boolean;
  showCloseButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  showCloseButton: true,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const target = useTemplateRef<HTMLElement>('target');
onClickOutside(target, () => emit('close'));

onKeyStroke('Escape', () => {
  emit('close');
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center">
      <div class="fixed bg-black opacity-50 w-screen h-screen" />
      <div
        ref="target"
        class="bg-white rounded-xl shadow-xl w-full max-w-md m-4 overflow-hidden z-50"
      >
        <div class="flex items-center justify-between p-4">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ title }}
          </h2>

          <button
            type="button"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            @click="emit('close')"
          >
            <X class="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div class="p-6">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
