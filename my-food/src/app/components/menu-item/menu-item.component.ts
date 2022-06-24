import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Hotel, Menu } from '../../models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @Input() public hotel!: Hotel;

  @Output() addToMyCartEvent = new EventEmitter();

  constructor() {}

  public addToMyCart = (menu: Menu) => {
    this.addToMyCartEvent.emit(menu);
  };
}
