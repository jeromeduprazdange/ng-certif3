import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonState } from 'src/app/core/enums/button-state.enum';
import { LocationInfo } from 'src/app/core/models/location-info.model';
import { WeatherInfo } from 'src/app/core/models/weather-info.model';
import { ButtonActionsService } from 'src/app/core/services/button-actions.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { capitalize } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  locationForm!: FormGroup;

  currentWeatherList: WeatherInfo[] = [];

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private buttonActionsService: ButtonActionsService
  ) {}

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      country: ['', Validators.required],
    });

    this.getCurrentWeatherListInfo();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private getCurrentWeatherListInfo(): void {
    this.weatherService
      .getCurrentWeatherAllLocations()
      .subscribe((currentWeatherList) => {
        this.currentWeatherList = currentWeatherList;
      });
  }

  public submit(): void {
    const isNewLocation: boolean =
      this.currentWeatherList.findIndex(
        (weatherInfo) =>
          weatherInfo.countryCode === this.locationForm.value.country.code &&
          weatherInfo.zipCode === this.locationForm.value.zipCode
      ) === -1;

    if (isNewLocation) {
      this.buttonActionsService.setState(
        'saveLocationAction',
        ButtonState.WORKING
      );
      this.weatherService
        .saveLocation(
          this.locationForm.value.country.code,
          this.locationForm.value.zipCode
        )
        .subscribe({
          next: (weatherInfo) => {
            this.currentWeatherList.push(weatherInfo);
            this.stopPolling();
            this.getCurrentWeatherListInfo();
            this.buttonActionsService.setState(
              'saveLocationAction',
              ButtonState.DONE
            );
          },
          error: () => {
            this.buttonActionsService.setState(
              'saveLocationAction',
              ButtonState.IDLE
            );
          },
        });
    }

    this.locationForm.get('zipCode')?.setValue('');
    this.locationForm.get('country')?.setValue('');
  }

  public deleteItem({ countryCode, zipCode }: LocationInfo) {
    this.weatherService.deleteZipCode(countryCode, zipCode);
    this.currentWeatherList = this.currentWeatherList.filter(
      (item: WeatherInfo) => item.zipCode !== zipCode
    );
    this.stopPolling();
    this.getCurrentWeatherListInfo();
  }

  private stopPolling(): void {
    this.weatherService.stopPolling.next(null);
  }
}
