<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue: string;
  name: string;
  label: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

// Format the input as 24-hour time (HH:MM)
function formatTime(value: string): string {
  // Remove all non-numeric characters
  let digits = value.replace(/\D/g, '');

  // Limit to 4 digits
  digits = digits.slice(0, 4);

  // Format as HH:MM
  if (digits.length > 2) {
    // Handle hour constraints (00-23)
    let hours = digits.slice(0, 2);
    if (Number.parseInt(hours) > 23) {
      hours = '23';
    }

    // Handle minutes
    let minutes = digits.slice(2);

    // Only apply minute constraints when we have both minute digits
    if (minutes.length === 2 && Number.parseInt(minutes) > 59) {
      minutes = '59';
    }

    return `${hours}:${minutes}`;
  } else if (digits.length > 0) {
    // Handle hour constraints when typing
    if (Number.parseInt(digits) > 23) {
      digits = '23';
    }
    return digits;
  }

  return '';
}

// Clean up the time format when the input loses focus
function onBlur() {
  if (inputValue.value) {
    const digits = inputValue.value.replace(/\D/g, '');

    if (digits.length === 1) {
      // Single digit becomes 0H:00
      inputValue.value = `0${digits}:00`;
    } else if (digits.length === 2) {
      // Two digits becomes HH:00
      inputValue.value = `${digits}:00`;
    } else if (digits.length === 3) {
      // Three digits becomes HH:M0
      inputValue.value = `${digits.slice(0, 2)}:${digits.slice(2)}0`;
    } else if (digits.length === 4) {
      // Four digits becomes HH:MM
      inputValue.value = `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }

    emit('update:modelValue', inputValue.value);
  }
}

function handleInput(event: string | number) {
  let formatted = formatTime(String(event));

  // Add colon after the hours when we have at least 3 digits
  if (formatted.length >= 3 && !formatted.includes(':')) {
    formatted = `${formatted.slice(0, 2)}:${formatted.slice(2)}`;
  }

  inputValue.value = formatted;
  emit('update:modelValue', inputValue.value);
}

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== inputValue.value) {
      inputValue.value = newValue;
    }
  },
);
</script>

<template>
  <UFormField :label="label" :name="name">
    <UInput v-model="inputValue" class="w-full" @update:model-value="handleInput" @blur="onBlur" />
  </UFormField>
</template>
