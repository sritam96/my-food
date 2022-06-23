import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  COUNTRY,
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
  LANGUAGE,
} from '../../constants';
import { SelectModel } from '../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly countryOptions: SelectModel[] = COUNTRY;
  public readonly languageOptions: SelectModel[] = LANGUAGE;
  public selectedCountry: string;
  public selectedLanguage: string;

  /**
   * Emit events when filter is changes
   */
  @Output() public filter: EventEmitter<{
    selectedCountry: string;
    selectedLanguage: string;
  }> = new EventEmitter();

  constructor() {
    this.selectedCountry = DEFAULT_COUNTRY;
    this.selectedLanguage = DEFAULT_LANGUAGE;
  }
}
