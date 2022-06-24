import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelCardComponent implements OnInit {
  @Input() public hotelName!: string;
  @Input() public hotelThumbnail!: string;
  @Input() public cuisines!: string;
  @Input() public rating!: string;
  @Input() public review!: string;

  public math = Math;
  public rate : number = 0;
  constructor() {}
  ngOnInit(): void {
    this.rate = Number(this.rating)
  }
}
