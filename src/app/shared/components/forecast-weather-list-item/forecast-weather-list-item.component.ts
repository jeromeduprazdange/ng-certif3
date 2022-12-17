import { Component, Input, OnInit } from '@angular/core';
import { ForecastInfo } from 'src/app/core/models/forecast-info.model';

@Component({
  selector: 'app-forecast-weather-list-item',
  templateUrl: './forecast-weather-list-item.component.html',
  styleUrls: ['./forecast-weather-list-item.component.scss'],
})
export class ForecastWeatherListItemComponent implements OnInit {
  @Input() forecastInfo: ForecastInfo = <ForecastInfo>{};

  constructor() {}

  ngOnInit(): void {}
}
