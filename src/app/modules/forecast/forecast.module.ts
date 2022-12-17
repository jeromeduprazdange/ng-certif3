import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast/forecast.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ForecastComponent],
  imports: [CommonModule, ForecastRoutingModule, SharedModule],
})
export class ForecastModule {}
