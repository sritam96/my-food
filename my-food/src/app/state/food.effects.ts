import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FoodService } from '../services';
import { FoodActions } from './food.actions';

@Injectable()
export class FoodEffects {
  /**
   * @listen [Food] Fetch food
   * @dispatch [Food] Fetch food success
   * @dispatch [Food] Fetch food failed
   */
  public fetchFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.fetchFoodAction),
      switchMap(() =>
        this.foodService.getLatestFood().pipe(
          map((food) => FoodActions.fetchFoodSuccessAction({ food })),
          catchError((error: HttpErrorResponse) =>
            of(FoodActions.fetchFoodFailedAction({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private foodService: FoodService) {}
}
