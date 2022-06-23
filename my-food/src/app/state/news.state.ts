import { HttpErrorResponse } from '@angular/common/http';
import { News } from '../models';

export interface NewsState {
  news: News[];
  error: HttpErrorResponse | null;
}

export const newsInitialState: NewsState = {
  news: [],
  error: null,
};

export const NEWS_FEATURE = 'news';
