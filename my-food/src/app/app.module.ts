import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CartItemComponent,
  DropdownComponent,
  HotelCardComponent,
  HotelComponent,
  HotelsComponent,
  MenuItemComponent,
  SearchBarComponent,
} from './components';
import { FoodService } from './services';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { FoodEffects, FOOD_FEATURE, foodReducer } from './state';
import { StoreModule } from '@ngrx/store';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatTableModule} from '@angular/material/table';
export const effectModuleForFeature = EffectsModule.forRoot([FoodEffects]);
export const storeModuleForFeature = StoreModule.forFeature(
  FOOD_FEATURE,
  foodReducer
);

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    HotelCardComponent,
    HotelComponent,
    DropdownComponent,
    CartItemComponent,
    MenuItemComponent,
    SearchBarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    effectModuleForFeature,
    FormsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatSidenavModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({}),
    storeModuleForFeature,
  ],
  providers: [FoodService],
  bootstrap: [AppComponent],
})
export class AppModule {}
