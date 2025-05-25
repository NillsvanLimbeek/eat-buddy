<script setup lang="ts">
import type { AddMeal } from '@/lib/types/AddMeal';
import type { FormSubmitEvent } from '@nuxt/ui';
import { AddMealSchema } from '@/lib/types/AddMeal';
import { reactive } from 'vue';

interface Props {
  isOpen: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', meal: AddMeal): void;
}>();

const state = reactive<AddMeal>({
  mealName: '',
  time: '',
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<AddMeal>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  emit('submit', event.data);
}
</script>

<template>
  <Modal title="Add New Meal" :is-open="isOpen" @close="() => $emit('close')">
    <UForm :schema="AddMealSchema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Meal Name" name="mealName">
        <UInput v-model="state.mealName" class="w-full" />
      </UFormField>

      <TimeInput v-model="state.time" label="Time" name="time" />

      <UFormField label="Description" name="description">
        <UTextarea v-model="state.description" class="w-full" />
      </UFormField>

      <div class="flex justify-end gap-3">
        <UButton type="button" variant="outline">Cancel</UButton>
        <UButton type="submit">Submit</UButton>
      </div>
    </UForm>
  </Modal>
</template>
