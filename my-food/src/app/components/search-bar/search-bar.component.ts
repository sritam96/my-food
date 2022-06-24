import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  public hotelSearch = '';

  @Output() searchQueryEvent = new EventEmitter();

  constructor() {}

  public searchQuery = (query: string) => {
    this.searchQueryEvent.emit(query);
  };

  public clearSearch = () => {
    this.hotelSearch = '';
    this.searchQueryEvent.emit(this.hotelSearch);
  };
}
