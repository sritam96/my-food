import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HeaderComponent,
  NewsComponent,
  NewsItemComponent,
} from './components';
import { NewsService } from './services';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { NewsEffects, NEWS_FEATURE, newsReducer } from './state';
import { StoreModule } from '@ngrx/store';

export const effectModuleForFeature = EffectsModule.forRoot([NewsEffects]);
export const storeModuleForFeature = StoreModule.forFeature(
  NEWS_FEATURE,
  newsReducer
);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsComponent,
    NewsItemComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    effectModuleForFeature,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
    MatExpansionModule,
    StoreModule.forRoot({}),
    storeModuleForFeature,
  ],
  providers: [NewsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
