import { HttpErrorResponse } from '@angular/common/http';
import { Hotel } from '../models';

export interface FoodState {
  food: Hotel[];
  error: HttpErrorResponse | null;
}

export const foodInitialState: FoodState = {
  food: [],
  error: null,
};

export const FOOD_FEATURE = 'food';
