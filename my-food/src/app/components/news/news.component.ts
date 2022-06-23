import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, Subject, takeUntil } from 'rxjs';
import {
  News,
  NewsActions,
  NewsState,
  getNewsState,
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
} from '../../index';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit, OnDestroy {
  public news: News[] = [];
  public panelOpenState: boolean = false;
  private country: string = DEFAULT_COUNTRY;
  private language: string = DEFAULT_LANGUAGE;

  private destroyed$ = new Subject<void>();
  constructor(private store: Store<NewsState>, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.loadData();
    this.store.pipe(select(getNewsState)).subscribe((news: News[]) => {
      this.news = news;
      this.cd.markForCheck();
    });
    interval(3000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.loadData());
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private loadData(): void {
    /**
     * @route /
     * @dispatch [News] Fetch news
     */
    this.store.dispatch(
      NewsActions.fetchNewsAction({
        payload: { lang: this.language, country: this.country },
      })
    );
  }

  public onFilterChange(event: {
    selectedLanguage: string;
    selectedCountry: string;
  }): void {
    this.language = event.selectedLanguage;
    this.country = event.selectedCountry;
    this.loadData();
  }
  public trackByMethod(index: number): number {
    return index;
  }
}
