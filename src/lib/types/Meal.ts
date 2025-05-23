import type { Day } from './Day';

export interface Meal {
  id: string;
  name: string;
  description: string;
  time: string;
  weekday: Day[];
  completed: boolean;
}
