import { HttpErrorResponse } from '@angular/common/http';
import { NewsResponseMock } from '../../__mocks__';
import { NewsActions, NewsActionsType } from '../news.actions';
import { newsReducer } from '../news.reducer';
import { newsInitialState } from '../news.state';

describe('newsReducer', () => {
  it('should set newsReducer with initial state', () => {
    const action = {
      type: 'Non existing type',
    } as unknown as NewsActionsType;

    expect(newsReducer(undefined, action)).toEqual(newsInitialState);
  });
  describe('fetchNewsSuccessAction', () => {
    it('should set news data in news state', () => {
      const action = NewsActions.fetchNewsSuccessAction({
        news: NewsResponseMock.results,
      });
      const result = newsReducer(newsInitialState, action);

      expect(result).toEqual({
        ...newsInitialState,
        news: NewsResponseMock.results,
      });
    });
  });

  describe('fetchNewsFailedAction', () => {
    it('should set news error on failed request', () => {
      const error = new HttpErrorResponse({
        url: 'some URL',
        status: 400,
        statusText: 'something went wront',
      });

      const action = NewsActions.fetchNewsFailedAction({
        error,
      });
      const result = newsReducer(newsInitialState, action);

      expect(result).toEqual({
        ...newsInitialState,
        error,
      });
    });
  });
});
