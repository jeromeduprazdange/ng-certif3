import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CurrentWeatherComponent],
  imports: [CommonModule, CurrentWeatherRoutingModule, SharedModule],
})
export class CurrentWeatherModule {}
