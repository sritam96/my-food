import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { CartItem, Hotel, Menu } from '../../models';
import { FoodService } from '../../services';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { FoodState, getFoodState } from '../../state';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: true })
  public sidenav!: MatSidenav;

  public hotels: Hotel[] = [];
  public hotel!: Hotel;
  public cartItems: CartItem[] = [];
  public totalAmount = 0;

  constructor(
    private service: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FoodState>,
    private cd: ChangeDetectorRef
  ) {}

  public addToMyCart = (menu: Menu) => {
    const newItem = {
      id: menu.id,
      name: menu.name,
      price: menu.price,
      quantity: 1,
    };

    this.addItemToMyCart(newItem);
    this.calculateAmount();
  };

  public addItemToMyCart = (newItem: CartItem) => {
    this.cartItems.push(newItem);
  };

  public toggleSideNav = () => {
    this.service.toggle();
  };

  public removeItem = (cartItem: CartItem) => {
    this.calculateAmount();
  };

  public addQuantity = (cartItem: CartItem) => {
    this.cartItems.forEach((item, index) => {
      if (item.id == cartItem.id)
        this.cartItems[index].quantity =
          Number(this.cartItems[index].quantity) + 1;
    });
    this.calculateAmount();
  };

  public removeQuantity = (cartItem: CartItem) => {
    this.cartItems.forEach((item, index) => {
      if (item.id == cartItem.id) {
        if (this.cartItems[index].quantity > 0)
          this.cartItems[index].quantity -= 1;
      }
    });
    this.calculateAmount();
  };

  public calculateAmount = () => {
    this.totalAmount = 0;
    this.cartItems.map((item) => {
      this.totalAmount = this.totalAmount + item.quantity * item.price;
    });
  };

  public ngAfterViewInit(): void {
    this.service.setSidenav(this.sidenav);
  }

  public ngOnInit(): void {
    this.store
      .pipe(
        select(getFoodState),
        filter((x) => !!x)
      )
      .subscribe((hotels: Hotel[]) => {
        this.hotels = hotels;
        this.route.paramMap.subscribe((params: ParamMap) => {
          [this.hotel] = this.hotels.filter(
            (hotel) => hotel.id == (params.get('id') as string)
          );
        });
        this.cd.markForCheck();
      });
    if (!this.hotels.length) {
      this.router.navigateByUrl('/hotels');
    }
    this.calculateAmount();
  }
}
