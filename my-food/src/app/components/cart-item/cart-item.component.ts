import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CartItem } from '../../models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() public cartItems: CartItem[] = [];

  @Output() removeQuantityEvent = new EventEmitter();
  @Output() addQuantityEvent = new EventEmitter();
  @Output() removeItemEvent = new EventEmitter();

  constructor() {}

  public removeQuantity = (cartItem: CartItem) => {
    this.removeQuantityEvent.emit(cartItem);
  };

  public addQuantity = (cartItem: CartItem) => {
    this.addQuantityEvent.emit(cartItem);
  };

  public removeItem = (cartItem: CartItem) => {
    this.removeItemEvent.emit(cartItem);
  };
}
