import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { FoodActions, FoodActionsType } from './food.actions';
import { foodInitialState, FoodState } from './food.state';

const reducer = createReducer(
  foodInitialState,
  on(
    FoodActions.fetchFoodFailedAction,
    (state: FoodState, { error }): FoodState => ({
      ...state,
      error,
    })
  ),

  on(
    FoodActions.fetchFoodSuccessAction,
    (state: FoodState, { food = [] }): FoodState => ({
      ...state,
      food,
    })
  )
);

export const foodReducer = (
  state: FoodState = foodInitialState,
  action: FoodActionsType
): FoodState => reducer(state, action);
