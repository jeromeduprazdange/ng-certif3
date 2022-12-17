import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationInfo } from 'src/app/core/models/location-info.model';
import { WeatherInfo } from 'src/app/core/models/weather-info.model';

@Component({
  selector: 'app-current-weather-list-item',
  templateUrl: './current-weather-list-item.component.html',
  styleUrls: ['./current-weather-list-item.component.scss'],
})
export class CurrentWeatherListItemComponent implements OnInit {
  @Input() weatherInfo!: WeatherInfo;
  @Output() deleteEvent = new EventEmitter<LocationInfo>();

  constructor() {}

  ngOnInit(): void {}

  onClickDelete(location: LocationInfo): void {
    this.deleteEvent.emit(location);
  }
}
