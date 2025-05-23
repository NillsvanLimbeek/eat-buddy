import type { Day } from '@/lib/types/Day';
import type { Meal } from '@/lib/types/Meal';
import { getDay } from 'date-fns';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useDateStore } from './date';

const defaultMeals: Meal[] = [
  {
    id: '1',
    name: 'Breakfast',
    time: '08:00',
    description: 'Start your day with a nutritious breakfast to boost your energy levels.',
    weekday: [1],
    completed: false,
  },
  {
    id: '2',
    name: 'Lunch',
    time: '12:30',
    description: 'A balanced lunch helps maintain steady energy throughout the afternoon.',
    weekday: [1],
    completed: false,
  },
  {
    id: '3',
    name: 'Snack',
    time: '16:00',
    description: 'A healthy snack prevents evening overeating and maintains blood sugar levels.',
    weekday: [3],
    completed: false,
  },
  {
    id: '4',
    name: 'Dinner',
    time: '19:00',
    description: 'A light but satisfying dinner promotes better sleep and digestion.',
    weekday: [1, 2, 3, 4, 5, 6],
    completed: false,
  },
];

export const useMealsStore = defineStore('meals', () => {
  const date = useDateStore();

  // state
  const meals = ref<Meal[]>(defaultMeals);

  // getters
  const mealsByWeekday = computed(() => {
    const weekday = getDay(date.currentDate) as Day;
    return meals.value.filter((meal) => meal.weekday.includes(weekday));
  });

  return {
    meals,

    mealsByWeekday,
  };
});
