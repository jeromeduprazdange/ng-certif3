import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Subject, timer } from 'rxjs';
import { map, retry, switchMap, takeUntil, tap } from 'rxjs/operators';
import { WeatherInfo } from '../models/weather-info.model';
import { ForecastInfo } from '../models/forecast-info.model';
import { environment } from 'src/environments/environment';
import { LocationInfo } from '../models/location-info.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  stopPolling = new Subject();

  constructor(private http: HttpClient) {}

  getCurrentWeatherAllLocations(): Observable<WeatherInfo[]> {
    let locationsArray: LocationInfo[] = [];
    let requestArray: Observable<any>[] = [];
    let resultsObs: Observable<WeatherInfo[]>;

    if (localStorage.getItem('locations')) {
      locationsArray = JSON.parse(localStorage.getItem('locations')!);
      locationsArray.forEach((location: LocationInfo) => {
        requestArray.push(
          this.getCurrentWeather(location.countryCode, location.zipCode)
        );
      });
    }

    resultsObs = timer(1, 30000).pipe(
      switchMap(() => forkJoin(requestArray)),
      retry(),
      takeUntil(this.stopPolling)
    );

    return resultsObs;
  }

  getCurrentWeather(
    countryCode: string,
    zipCode: string
  ): Observable<WeatherInfo> {
    return this.http
      .get(
        `${environment.currentWeatherUrl}?zip=${zipCode},${countryCode}&units=metric&appid=${environment.weatherApiKey}`
      )
      .pipe(
        map(
          (item: any) =>
            ({
              cityName: item.name,
              countryCode,
              zipCode,
              currentConditions: item.weather[0].main,
              currentTemp: item.main.temp,
              maxTemp: item.main.temp_max,
              minTemp: item.main.temp_min,
            } as WeatherInfo)
        )
      );
  }

  saveLocation(countryCode: string, zipCode: string): Observable<WeatherInfo> {
    return this.getCurrentWeather(countryCode, zipCode).pipe(
      tap(() => {
        let locationsArray: LocationInfo[] = [];

        if (localStorage.getItem('locations')) {
          locationsArray = JSON.parse(localStorage.getItem('locations')!);
        }

        locationsArray.push({ countryCode, zipCode });
        localStorage.setItem('locations', JSON.stringify(locationsArray));
      })
    );
  }

  deleteZipCode(countryCode: string, zipCode: string): void {
    const locationsArray = JSON.parse(localStorage.getItem('locations')!);

    const indexToDelete = locationsArray.findIndex(
      (location: LocationInfo) =>
        location.countryCode === countryCode && location.zipCode === zipCode
    );
    locationsArray.splice(indexToDelete, 1);

    localStorage.setItem('locations', JSON.stringify(locationsArray));
  }

  getForecast(countryCode: string, zipCode: string): Observable<ForecastInfo> {
    return this.http
      .get(
        `${environment.forecastUrl}?zip=${zipCode},${countryCode}&units=metric&cnt=5&appid=${environment.weatherApiKey}`
      )
      .pipe(
        map((result: any) => {
          return result.list.map(
            (item: any) =>
              ({
                cityName: result.city.name,
                date: new Date(item.dt * 1000),
                conditions: item.weather[0].main,
                maxTemp: item.temp.max,
                minTemp: item.temp.min,
              } as ForecastInfo)
          );
        })
      );
  }
}
