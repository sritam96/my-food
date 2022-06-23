import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props, union } from '@ngrx/store';

import { NewsPayload, News } from '../models';

export const FETCH_NEWS = '[News] Fetch news';
export const FETCH_NEWS_SUCCESS = '[News] Fetch news success';
export const FETCH_NEWS_FAILURE = '[News] Fetch news failed';

const fetchNewsAction = createAction(
  FETCH_NEWS,
  props<{
    payload: NewsPayload;
  }>()
);
const fetchNewsFailedAction = createAction(
  FETCH_NEWS_FAILURE,
  props<{ error: HttpErrorResponse }>()
);

const fetchNewsSuccessAction = createAction(
  FETCH_NEWS_SUCCESS,
  props<{
    news: News[];
  }>()
);

export const NewsActions = {
  fetchNewsAction,
  fetchNewsFailedAction,
  fetchNewsSuccessAction,
};

const newsActionsUnion = union(NewsActions);

export type NewsActionsType = typeof newsActionsUnion;
