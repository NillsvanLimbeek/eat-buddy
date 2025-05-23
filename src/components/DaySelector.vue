<script setup lang="ts">
import { eachDayOfInterval, format, isSameDay, startOfWeek } from 'date-fns';
import { endOfWeek } from 'date-fns/fp';
import { computed } from 'vue';

const props = defineProps<{
  selectedDate: Date;
}>();

const emit = defineEmits<{
  (e: 'update:selectedDate', date: Date): void;
}>();

const dates = computed(() => {
  const start = startOfWeek(props.selectedDate);
  const end = endOfWeek(props.selectedDate);

  return eachDayOfInterval({ start, end });
});
</script>

<template>
  <div class="flex overflow-x-auto py-2 px-2 -mx-2">
    <UButton
      v-for="date in dates"
      :key="String(date)"
      class="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 mx-1 rounded-lg"
      :class="{
        'bg-primary text-white shadow-md transform scale-105': isSameDay(date, selectedDate),
      }"
      @click="emit('update:selectedDate', date)"
    >
      <span class="text-xs font-medium">
        {{ format(date, 'EEE') }}
      </span>
      <span
        class="text-xl font-bold"
        :class="[isSameDay(date, selectedDate) ? 'text-white' : 'text-gray-800']"
      >
        {{ format(date, 'd') }}
      </span>
    </UButton>
  </div>
</template>
