import { NewsResponseMock } from '../../__mocks__';
import { getNewsState } from '../news.selectors';
import { newsInitialState, NewsState } from '../news.state';

const newsStateMock: NewsState = {
  ...newsInitialState,
  news: NewsResponseMock.results,
};

describe('getNews', () => {
  it('should get news', () => {
    expect(getNewsState.projector(newsStateMock)).toEqual(newsStateMock.news);
  });
});
