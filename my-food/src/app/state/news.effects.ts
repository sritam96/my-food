import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { NewsService } from '../services';
import { NewsActions } from './news.actions';

@Injectable()
export class NewsEffects {
  /**
   * @listen [News] Fetch news
   * @dispatch [News] Fetch news success
   * @dispatch [News] Fetch news failed
   */
  public fetchNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.fetchNewsAction),
      switchMap(({ payload }) =>
        this.newsService.getLatestNews(payload).pipe(
          map((news) => NewsActions.fetchNewsSuccessAction({ news })),
          catchError((error: HttpErrorResponse) =>
            of(NewsActions.fetchNewsFailedAction({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private newsService: NewsService) {}
}
