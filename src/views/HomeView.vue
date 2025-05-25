<script setup lang="ts">
import type { AddMeal } from '@/lib/types/AddMeal';
import { useDateStore } from '@/stores/date';
import { useMealsStore } from '@/stores/meals';
import { ref } from 'vue';

const dateStore = useDateStore();
const mealStore = useMealsStore();

const showAddModal = ref(false);

function handleAddMeal(mealData: AddMeal) {
  // TODO: handle adding meals here
  console.warn(mealData);
  showAddModal.value = false;
}
</script>

<template>
  <main class="flex flex-col gap-5 justify-center m-5">
    <UCard>
      <DaySelector
        :selected-date="dateStore.currentDate"
        @update:selected-date="(e) => dateStore.setCurrentDate(e)"
      />
    </UCard>

    <UCard>
      <MealList
        :selected-date="dateStore.currentDate"
        :meals="mealStore.mealsByWeekday"
        @add-meal="() => (showAddModal = true)"
      />
    </UCard>
  </main>

  <AddMeal
    :is-open="showAddModal"
    @close="() => (showAddModal = false)"
    @submit="(e) => handleAddMeal(e)"
  />
</template>
