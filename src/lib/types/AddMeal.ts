import { z } from 'zod';

export const AddMealSchema = z.object({
  mealName: z.string().nonempty({ message: 'Name is required' }),
  time: z.string().nonempty({ message: 'Time is required' }),
  description: z.string().optional(),
});

export type AddMeal = z.output<typeof AddMealSchema>;
