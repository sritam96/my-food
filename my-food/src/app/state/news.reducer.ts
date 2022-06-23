import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { NewsActions, NewsActionsType } from './news.actions';
import { newsInitialState, NewsState } from './news.state';

const reducer = createReducer(
  newsInitialState,
  on(
    NewsActions.fetchNewsFailedAction,
    (state: NewsState, { error }): NewsState => ({
      ...state,
      error,
    })
  ),

  on(
    NewsActions.fetchNewsSuccessAction,
    (state: NewsState, { news = [] }): NewsState => ({
      ...state,
      news,
    })
  )
);

export const newsReducer = (
  state: NewsState = newsInitialState,
  action: NewsActionsType
): NewsState => reducer(state, action);
