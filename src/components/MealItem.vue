<script setup lang="ts">
import type { Meal } from '@/lib/types/Meal';
import { isSameDay } from 'date-fns';
import { CheckCircle, Clock, Edit2, Info, Save, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
// import MealModal from './MealModal.vue';

interface Props {
  meal: Meal;
  date: Date;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'updateMeal', date: Date, meal: Meal): void;
  (e: 'deleteMeal', date: Date, mealId: string): void;
}>();

const isEditing = ref(false);
const editedName = ref(props.meal.name);
const editedTime = ref(props.meal.time);
const showModal = ref(false);

function handleToggleComplete() {
  emit('updateMeal', props.date, {
    ...props.meal,
    completed: !props.meal.completed,
  });
}

function handleStartEdit() {
  isEditing.value = true;
}

function handleSaveEdit() {
  emit('updateMeal', props.date, {
    ...props.meal,
    name: editedName.value,
    time: editedTime.value,
  });
  isEditing.value = false;
}

function handleDelete() {
  emit('deleteMeal', props.date, props.meal.id);
}

const status = computed(() => {
  if (props.meal.completed) {
    return 'completed';
  }

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  if (isSameDay(today, props.date)) {
    const [hours, minutes] = props.meal.time.split(':').map(Number);
    const mealTime = new Date();
    mealTime.setHours(hours, minutes, 0);

    if (now > mealTime) {
      return 'missed';
    }
  }

  return 'upcoming';
});
</script>

<template>
  <div
    class="p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer"
    :class="[
      {
        'border-green-200 bg-green-50': meal.completed,
        'border-red-200 bg-red-50': !meal.completed && status === 'missed',
        'border-gray-200 bg-white': !meal.completed && status === 'upcoming',
      },
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <button
          class="h-6 w-6 rounded-full flex items-center justify-center transition-colors"
          :class="[
            meal.completed
              ? 'bg-green-500 text-white'
              : 'border-2 border-gray-300 text-transparent hover:border-blue-400',
          ]"
          @click="handleToggleComplete"
        >
          <CheckCircle v-if="meal.completed" size="18" />
        </button>

        <input
          v-if="isEditing"
          v-model="editedName"
          type="text"
          class="border-b-2 border-blue-300 bg-transparent py-1 px-1 font-medium text-gray-800 focus:outline-none focus:border-blue-500"
          placeholder="Meal name"
          @keyup.enter="handleSaveEdit"
        />
        <div v-else class="flex items-center space-x-2 cursor-pointer" @click="showModal = true">
          <h3
            class="font-medium"
            :class="[meal.completed ? 'text-gray-600 line-through' : 'text-gray-800']"
          >
            {{ meal.name }}
          </h3>
          <Info size="16" class="text-gray-400" />
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <input
          v-if="isEditing"
          v-model="editedTime"
          type="time"
          class="border-b-2 border-blue-300 bg-transparent py-1 px-1 text-sm focus:outline-none focus:border-blue-500"
        />
        <div
          v-else
          class="flex items-center text-sm"
          :class="[
            meal.completed
              ? 'text-green-600'
              : status === 'missed'
                ? 'text-red-600'
                : 'text-blue-600',
          ]"
        >
          <Clock size="14" class="mr-1" />
          {{ meal.time }}
        </div>

        <button
          v-if="isEditing"
          class="p-1 text-blue-500 hover:text-blue-700 transition-colors"
          @click="handleSaveEdit"
        >
          <Save size="18" />
        </button>
        <button
          v-else
          class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          @click="handleStartEdit"
        >
          <Edit2 size="18" />
        </button>

        <button
          class="p-1 text-gray-400 hover:text-red-600 transition-colors"
          @click="handleDelete"
        >
          <Trash2 size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
