import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import { Hotel } from '../models';
import { FoodState, FOOD_FEATURE } from './food.state';

export const getFoodDataState = createFeatureSelector<FoodState>(FOOD_FEATURE);

export const getFoodState: MemoizedSelector<FoodState, Hotel[]> =
  createSelector(getFoodDataState, ({ food }: FoodState): Hotel[] => food);
