<script setup lang="ts">
import type { Meal } from '@/lib/types/Meal';
import { Clock, Plus } from 'lucide-vue-next';

interface Props {
  selectedDate: Date;
  meals: Meal[];
}

defineProps<Props>();
defineEmits<{
  (e: 'addMeal'): void;
}>();
</script>

<template>
  <div class="space-y-4">
    <div
      v-if="meals.length === 0"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <Clock class="h-12 w-12 text-primary mb-4" />
      <h3 class="text-lg font-medium text-gray-700 mb-2">No meals scheduled</h3>
      <p class="text-gray-500 mb-6 max-w-md">
        Start tracking your eating habits by adding meals you plan to eat today.
      </p>

      <UButton @click="$emit('addMeal')">
        <Plus class="h-4 w-4 mr-2" />
        Add First Meal
      </UButton>
    </div>

    <template v-else>
      <MealItem v-for="meal in meals" :key="meal.id" :meal="meal" :date="selectedDate" />

      <div class="pt-4">
        <UButton
          variant="outline"
          class="w-full px-4 py-3 flex justify-center"
          @click="$emit('addMeal')"
        >
          <Plus class="h-4 w-4 mr-2" />
          Add Another Meal
        </UButton>
      </div>
    </template>
  </div>
</template>
