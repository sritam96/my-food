import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Hotel } from '../../models';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent{
  @Input()
  public selectedValue!: string;
  @Input() public sortOptions!: any;

  @Output() sortEvent = new EventEmitter();

  constructor() {}

  public sortHotels = (selectedValue: string) => {
    this.sortEvent.emit(selectedValue);
  };

}
