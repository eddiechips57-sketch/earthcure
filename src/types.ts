export type Category = 'wellness' | 'nutrition' | 'skincare';

export interface NutritionFacts {
  servingSize: string;
  calories: string;
  protein: string;
  fat: string;
  omega3?: string;
  omega6?: string;
  fiber?: string;
  iron?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  description: string;
  extendedDescription: string;
  benefits: string[];
  dosage: string;
  ingredients: string[];
  size: string;
  priceZAR: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  inStock: boolean;
  nutritionFacts?: NutritionFacts;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  category: string;
  options: {
    text: string;
    value: string;
    description: string;
  }[];
}

export interface ImpactEstimation {
  carbonSavedKg: number;
  waterSavedLiters: number;
  farmersSupported: number;
}
