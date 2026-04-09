import { AgeGroup } from './types';

export const NUTRITION_STANDARDS: Record<AgeGroup, { 
  label: string;
  calories: [number, number]; 
  protein: [number, number]; 
  lipid: [number, number]; 
  glucid: [number, number];
  weights: {
    meat_fish: number;
    veg: number;
    rice: number;
    spice: number;
  }
}> = {
  preschool: {
    label: 'Mầm non',
    calories: [450, 550],
    protein: [13, 20],
    lipid: [20, 30],
    glucid: [55, 65],
    weights: { meat_fish: 50, veg: 100, rice: 60, spice: 5 }
  },
  primary: {
    label: 'Tiểu học (6-11 tuổi)',
    calories: [600, 700],
    protein: [13, 20],
    lipid: [20, 30],
    glucid: [55, 65],
    weights: { meat_fish: 70, veg: 150, rice: 100, spice: 8 }
  },
  secondary: {
    label: 'THCS (12-15 tuổi)',
    calories: [750, 850],
    protein: [13, 20],
    lipid: [20, 30],
    glucid: [55, 65],
    weights: { meat_fish: 100, veg: 200, rice: 150, spice: 10 }
  },
  highschool: {
    label: 'THPT (16-18 tuổi)',
    calories: [850, 950],
    protein: [13, 20],
    lipid: [20, 30],
    glucid: [55, 65],
    weights: { meat_fish: 120, veg: 250, rice: 200, spice: 12 }
  },
};

export const PROTEIN_SOURCES = ['Thịt heo', 'Thịt bò', 'Gia cầm', 'Thủy hải sản', 'Trứng/Đậu'];

export const DAYS_OF_WEEK = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
