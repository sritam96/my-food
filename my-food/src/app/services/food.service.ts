import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Observable, of } from 'rxjs';
import { Hotel } from '../models';
import { FoodResponseMock } from '../__mocks__';

@Injectable()
export class FoodService {
  private sidenav!: MatSidenav;
  constructor() {}

  /**
   * Getting latest food via http call
   */
  public getLatestFood(): Observable<Hotel[]> {
    return of(FoodResponseMock);
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
