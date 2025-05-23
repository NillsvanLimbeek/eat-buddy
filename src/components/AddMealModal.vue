<script setup lang="ts">
import type { Meal } from '@/lib/types/Meal';
import { X } from 'lucide-vue-next';
import { ref } from 'vue';

interface Props {
  initialMeal?: Meal;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', meal: Omit<Meal, 'id' | 'completed'>): void;
}>();

const name = ref(props.initialMeal?.name || '');
const time = ref(props.initialMeal?.time || '12:00');
const description = ref(props.initialMeal?.description || '');
const foods = ref<string[]>(props.initialMeal?.suggestions?.foods || []);
const drinks = ref<string[]>(props.initialMeal?.suggestions?.drinks || []);
const newFood = ref('');
const newDrink = ref('');

function handleSubmit(e: Event) {
  e.preventDefault();
  emit('save', {
    name: name.value,
    time: time.value,
    description: description.value,
    suggestions: {
      foods: foods.value,
      drinks: drinks.value,
    },
  });
  emit('close');
}

function addFood() {
  if (newFood.value.trim()) {
    foods.value.push(newFood.value.trim());
    newFood.value = '';
  }
}

function addDrink() {
  if (newDrink.value.trim()) {
    drinks.value.push(newDrink.value.trim());
    newDrink.value = '';
  }
}

function removeFood(index: number) {
  foods.value.splice(index, 1);
}

function removeDrink(index: number) {
  drinks.value.splice(index, 1);
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md m-4 overflow-hidden">
      <form @submit="handleSubmit">
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-xl font-semibold text-gray-800">
            {{ initialMeal ? 'Edit Meal' : 'Add New Meal' }}
          </h2>
          <button
            type="button"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            @click="emit('close')"
          >
            <X class="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Meal Name
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label for="time" class="block text-sm font-medium text-gray-700 mb-1"> Time </label>
              <input
                id="time"
                v-model="time"
                type="time"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                v-model="description"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Suggested Foods </label>
              <div class="flex gap-2 mb-2">
                <input
                  v-model="newFood"
                  type="text"
                  class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add food item"
                  @keyup.enter.prevent="addFood"
                />
                <button
                  type="button"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  @click="addFood"
                >
                  Add
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(food, index) in foods"
                  :key="index"
                  class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {{ food }}
                  <button
                    type="button"
                    class="ml-2 text-blue-400 hover:text-blue-600"
                    @click="removeFood(index)"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Suggested Drinks </label>
              <div class="flex gap-2 mb-2">
                <input
                  v-model="newDrink"
                  type="text"
                  class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add drink item"
                  @keyup.enter.prevent="addDrink"
                />
                <button
                  type="button"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  @click="addDrink"
                >
                  Add
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(drink, index) in drinks"
                  :key="index"
                  class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {{ drink }}
                  <button
                    type="button"
                    class="ml-2 text-green-400 hover:text-green-600"
                    @click="removeDrink(index)"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t p-4 flex justify-end space-x-3">
          <button
            type="button"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            @click="emit('close')"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Meal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
