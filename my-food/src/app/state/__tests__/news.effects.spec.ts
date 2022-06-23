import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { NewsService } from '../../services';
import { NewsEffects } from '../news.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { marbles } from 'rxjs-marbles';
import { NewsResponseMock } from '../../__mocks__';
import { NewsActions } from '../news.actions';
class NewsServiceMock {
  public getLatestNews: jest.Mock<unknown> = jest.fn();
}

describe('NewsEffects', () => {
  let effects: NewsEffects;
  let actions$: Observable<Action>;

  const newsService = new NewsServiceMock();
  const error = new HttpErrorResponse({
    url: 'some URL',
    status: 400,
    statusText: 'something went wront',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewsEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: NewsService, useValue: newsService },
      ],
    });

    effects = TestBed.inject(NewsEffects);
    actions$ = TestBed.inject(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('fetch news', () => {
    it(
      'should handle successfully fetching news',
      marbles((m) => {
        newsService.getLatestNews.mockReturnValue(of(NewsResponseMock.results));
        const action = NewsActions.fetchNewsAction({
          payload: {
            country: 'us',
            lang: 'en',
          },
        });
        const completion = NewsActions.fetchNewsSuccessAction({
          news: NewsResponseMock.results,
        });
        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', { b: completion });

        m.expect(effects.fetchNews$).toBeObservable(expected);
      })
    );

    it(
      'should handle failed request and save the error data',
      marbles((m) => {
        newsService.getLatestNews.mockReturnValueOnce(throwError(() => error));
        const action = NewsActions.fetchNewsAction({
          payload: {
            country: 'us',
            lang: 'en',
          },
        });
        const completion = NewsActions.fetchNewsFailedAction({
          error: error,
        });

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', { b: completion });

        m.expect(effects.fetchNews$).toBeObservable(expected);
      })
    );
  });
});
