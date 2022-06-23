import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import { News } from '../models';
import { NewsState, NEWS_FEATURE } from './news.state';

export const getNewsDataState = createFeatureSelector<NewsState>(NEWS_FEATURE);

export const getNewsState: MemoizedSelector<NewsState, News[]> = createSelector(
  getNewsDataState,
  ({ news }: NewsState): News[] => news
);
