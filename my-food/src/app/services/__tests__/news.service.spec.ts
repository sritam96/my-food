import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { News } from '../../models';

import { NewsResponseMock } from '../../__mocks__';
import { NewsService } from '../news.service';

const httpClientMock = {
  get: jest.fn(),
};

describe('NewsService', () => {
  let service: NewsService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        NewsService,
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(NewsService);
    expect(service).toBeTruthy();
  });

  describe('getLatestNews', () => {
    it('should  make an HTTP call to add voucher', () => {
      service = TestBed.inject(NewsService);
      httpClientMock.get.mockReturnValue(of({ NewsResponseMock }));

      service
        .getLatestNews({ country: 'us', lang: 'en' })
        .subscribe((data: News[]) => expect(data).toEqual(NewsResponseMock.results));
    });
  });
});
