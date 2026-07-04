export type RecipeUnit = "g" | "ml" | "piece" | "slice" | "tbsp" | "tsp";

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: RecipeUnit | string;
  trackInventory: boolean;
  note?: string;
}

export interface RecipeStep {
  order: number;
  title: string;
  instruction: string;
  durationMinutes: number;
}

export interface Recipe {
  id: string;
  name: string;
  englishName: string;
  summary: string;
  tags: string[];
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  steamerFriendly: boolean;
  image: { src: string; alt: string };
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  substitutions: string[];
  tips: string[];
}
