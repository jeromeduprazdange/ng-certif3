import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherListItemComponent } from './components/current-weather-list-item/current-weather-list-item.component';
import { ForecastWeatherListItemComponent } from './components/forecast-weather-list-item/forecast-weather-list-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StateButtonComponent } from './components/state-button/state-button.component';
import { AutoFilteringCountrySelectComponent } from './components/auto-filtering-country-select/auto-filtering-country-select.component';
import { SelectOptionComponent } from './components/select-option/select-option.component';

@NgModule({
  declarations: [
    CurrentWeatherListItemComponent,
    ForecastWeatherListItemComponent,
    LoaderComponent,
    StateButtonComponent,
    AutoFilteringCountrySelectComponent,
    SelectOptionComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CurrentWeatherListItemComponent,
    ForecastWeatherListItemComponent,
    LoaderComponent,
    StateButtonComponent,
    AutoFilteringCountrySelectComponent,
  ],
})
export class SharedModule {}
