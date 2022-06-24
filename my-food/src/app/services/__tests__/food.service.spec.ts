import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { Hotel } from '../../models';

import { FoodResponseMock } from '../../__mocks__';
import { FoodService } from '../food.service';

const httpClientMock = {
  get: jest.fn(),
};

describe('FoodService', () => {
  let service: FoodService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        FoodService,
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(FoodService);
    expect(service).toBeTruthy();
  });

  describe('getLatestFood', () => {
    it('should  make an HTTP call to add voucher', () => {
      service = TestBed.inject(FoodService);
      httpClientMock.get.mockReturnValue(of({ FoodResponseMock }));

      service
        .getLatestFood()
        .subscribe((data: Hotel[]) => expect(data).toEqual(FoodResponseMock));
    });
  });
});
