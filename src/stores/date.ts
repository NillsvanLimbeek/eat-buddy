import { parseISO } from 'date-fns';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useDateStore = defineStore('date', () => {
  // state
  const currentDate = ref(new Date());

  // getters
  const year = computed(() => currentDate.value.getFullYear());
  const month = computed(() => currentDate.value.getMonth());
  const day = computed(() => currentDate.value.getDate());

  // actions
  function setCurrentDate(date: Date | string) {
    currentDate.value = typeof date === 'string' ? parseISO(date) : date;
  }

  function setToToday() {
    currentDate.value = new Date();
  }

  return {
    currentDate,

    year,
    month,
    day,

    setCurrentDate,
    setToToday,
  };
});
