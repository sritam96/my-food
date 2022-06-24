import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { FoodService } from '../../services';
import { FoodEffects } from '../food.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { marbles } from 'rxjs-marbles';
import { FoodResponseMock } from '../../__mocks__';
import { FoodActions } from '../food.actions';
class FoodServiceMock {
  public getLatestFood: jest.Mock<unknown> = jest.fn();
}

describe('FoodEffects', () => {
  let effects: FoodEffects;
  let actions$: Observable<Action>;

  const foodService = new FoodServiceMock();
  const error = new HttpErrorResponse({
    url: 'some URL',
    status: 400,
    statusText: 'something went wront',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FoodEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: FoodService, useValue: foodService },
      ],
    });

    effects = TestBed.inject(FoodEffects);
    actions$ = TestBed.inject(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('fetch food', () => {
    it(
      'should handle successfully fetching food',
      marbles((m) => {
        foodService.getLatestFood.mockReturnValue(of(FoodResponseMock));
        const action = FoodActions.fetchFoodAction();
        const completion = FoodActions.fetchFoodSuccessAction({
          food: FoodResponseMock,
        });
        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', { b: completion });

        m.expect(effects.fetchFood$).toBeObservable(expected);
      })
    );

    it(
      'should handle failed request and save the error data',
      marbles((m) => {
        foodService.getLatestFood.mockReturnValueOnce(throwError(() => error));
        const action = FoodActions.fetchFoodAction();
        const completion = FoodActions.fetchFoodFailedAction({
          error: error,
        });

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', { b: completion });

        m.expect(effects.fetchFood$).toBeObservable(expected);
      })
    );
  });
});
