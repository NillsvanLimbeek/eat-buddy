<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive } from 'vue';
import * as z from 'zod';

interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const schema = z.object({
  mealName: z.string({ message: 'Name is required' }),
  time: z.string(),
  description: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  mealName: '',
  time: '',
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
  console.log(event.data);
}
</script>

<template>
  <Modal title="Add New Meal" :is-open="isOpen">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Meal Name" name="mealName">
        <UInput v-model="state.mealName" class="w-full" />
      </UFormField>

      <TimeInput v-model="state.time" label="Time" name="time" />

      <UFormField label="Description" name="description">
        <UTextarea v-model="state.description" class="w-full" />
      </UFormField>

      <UButton type="button">Cancel</UButton>
      <UButton type="submit">Submit</UButton>
    </UForm>
  </Modal>
</template>
