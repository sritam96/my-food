import { HttpErrorResponse } from '@angular/common/http';
import { FoodResponseMock } from '../../__mocks__';
import { FoodActions, FoodActionsType } from '../food.actions';
import { foodReducer } from '../food.reducer';
import { foodInitialState } from '../food.state';

describe('foodReducer', () => {
  it('should set foodReducer with initial state', () => {
    const action = {
      type: 'Non existing type',
    } as unknown as FoodActionsType;

    expect(foodReducer(undefined, action)).toEqual(foodInitialState);
  });
  describe('fetchFoodSuccessAction', () => {
    it('should set food data in food state', () => {
      const action = FoodActions.fetchFoodSuccessAction({
        food: FoodResponseMock,
      });
      const result = foodReducer(foodInitialState, action);

      expect(result).toEqual({
        ...foodInitialState,
        food: FoodResponseMock,
      });
    });
  });

  describe('fetchFoodFailedAction', () => {
    it('should set food error on failed request', () => {
      const error = new HttpErrorResponse({
        url: 'some URL',
        status: 400,
        statusText: 'something went wront',
      });

      const action = FoodActions.fetchFoodFailedAction({
        error,
      });
      const result = foodReducer(foodInitialState, action);

      expect(result).toEqual({
        ...foodInitialState,
        error,
      });
    });
  });
});
