import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel, SortOption } from '../../models';

import { FoodActions, FoodState, getFoodState } from '../../state';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsComponent implements OnInit {
  public hotels: Hotel[] = [];
  public hotelsConstant: Hotel[] = [];
  public displayHotels: Hotel[] = [];
  public sortOptions: SortOption[] = [
    { value: 'name', viewValue: 'Name' },
    { value: 'rating', viewValue: 'Rating' },
    { value: 'reviews', viewValue: 'Review' },
  ];

  public selectedValue = this.sortOptions[0].value; // default sorting
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  constructor(
    private router: Router,
    private store: Store<FoodState>,
    private cd: ChangeDetectorRef
  ) {}

  public searchQuery = (query: string) => {
    this.hotels = this.hotelsConstant.filter(
      (hotel) =>
        JSON.stringify(hotel).toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    this.displayHotels = this.hotels;
  };

  public sortHotels = (selectedValue: string) => {
    if (selectedValue === 'rating') {
      this.hotels = this.hotels.sort((a, b) => {
        return Number(b.rating) - Number(a.rating);
      });
    } else if (selectedValue === 'reviews') {
      this.hotels = this.hotels.sort((a, b) => {
        return Number(b.reviews) - Number(a.reviews);
      });
    } else if (selectedValue === 'name') {
      const temp = [...this.hotels];
      this.hotels = temp.sort((a, b) => {
        return this.compareName(a.name, b.name);
      });
    }
    this.displayHotels = this.hotels;
  };

  public compareName(a: string, b: string) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }
  public goToHotel = (hotel: Hotel) => {
    this.router.navigate(['/hotels', hotel.id]);
  };
  public onChange(page: PageEvent) {
    this.displayHotels = this.hotels.slice(
      page.pageIndex * 10,
      page.pageIndex * 10 + 10
    );
    this.cd.markForCheck();
  }

  public ngOnInit(): void {
    /**
     * @route /
     * @dispatch [Food] Fetch food
     */
    this.store.dispatch(FoodActions.fetchFoodAction());

    this.store
      .pipe(
        select(getFoodState),
        filter((x) => !!x)
      )
      .subscribe((hotels: Hotel[]) => {
        this.hotelsConstant = this.hotels = this.displayHotels = hotels;
        this.sortHotels(this.selectedValue);
        this.cd.markForCheck();
      });
  }
}
