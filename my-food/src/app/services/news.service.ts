import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { News, NewsInfo, NewsPayload } from '../models';

@Injectable()
export class NewsService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly apiKey: string = environment.apiKey;
  constructor(private http: HttpClient) {}

  /**
   * Getting latest news via http call
   */
  public getLatestNews(payload: NewsPayload): Observable<News[]> {
    const apiURL = `${this.baseUrl}/1/news?apikey=${this.apiKey}&language=${payload.lang}&country=${payload.country}`;

    return this.http
      .get<NewsInfo>(apiURL)
      .pipe(map((data: NewsInfo) => data && data.results));
  }
}
