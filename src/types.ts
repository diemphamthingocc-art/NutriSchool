export type AgeGroup = 'preschool' | 'primary' | 'secondary' | 'highschool';
export type IngredientCategory = 'meat' | 'fish' | 'veg' | 'rice' | 'spice' | 'other';

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  lipid: number;   // grams
  glucid: number;  // grams
}

export interface Ingredient {
  name: string;
  amount: number; // grams per person
  unit: string;
  category: IngredientCategory;
}

export interface Dish {
  name: string;
  type: 'main' | 'side' | 'soup' | 'dessert';
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
  allergens?: string[];
}

export interface DailyMenu {
  day: string;
  mainDish: Dish;
  sideDish: Dish;
  soup: Dish;
  dessert: Dish;
  totalNutrition: NutritionInfo;
}

export interface WeeklyMenu {
  ageGroup: AgeGroup;
  studentCount: number;
  days: DailyMenu[];
}
