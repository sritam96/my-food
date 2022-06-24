import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props, union } from '@ngrx/store';

import { Hotel } from '../models';

export const FETCH_FOOD = '[Food] Fetch food';
export const FETCH_FOOD_SUCCESS = '[Food] Fetch food success';
export const FETCH_FOOD_FAILURE = '[Food] Fetch food failed';

const fetchFoodAction = createAction(
  FETCH_FOOD
);
const fetchFoodFailedAction = createAction(
  FETCH_FOOD_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

const fetchFoodSuccessAction = createAction(
  FETCH_FOOD_SUCCESS,
  props<{
    food: Hotel[];
  }>()
);

export const FoodActions = {
  fetchFoodAction,
  fetchFoodFailedAction,
  fetchFoodSuccessAction,
};

const foodActionsUnion = union(FoodActions);

export type FoodActionsType = typeof foodActionsUnion;
