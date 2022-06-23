import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NewsResponseMock } from '../../../__mocks__';
import {
  getNewsState,
  NewsActions,
  newsInitialState,
  NewsState,
} from '../../../state';
import { NewsComponent } from '../news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let mockStore: MockStore<NewsState>;
  let spyDispatch: jest.SpyInstance;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(getNewsState, NewsResponseMock.results);
    mockStore.setState({ ...newsInitialState, news: NewsResponseMock.results });
    component = fixture.componentInstance;
    spyDispatch = jest.spyOn(mockStore, 'dispatch');
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetch news onFilterChange', () => {
    component.onFilterChange({ selectedLanguage: 'us', selectedCountry: 'en' });
    expect(spyDispatch).toHaveBeenCalledWith(
      NewsActions.fetchNewsAction({ payload: { country: 'us', lang: 'en' } })
    );
  });

  it('should dispatch fetch news on ngOnInit', () => {
    component.ngOnInit();
    expect(spyDispatch).toHaveBeenCalledWith(
      NewsActions.fetchNewsAction({ payload: { country: 'us', lang: 'en' } })
    );
  });

  it('should return index for trackByMethod', () => {
    expect(component.trackByMethod(2)).toBe(2);
  });
});
