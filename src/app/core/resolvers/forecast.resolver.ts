import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';
import { capitalize } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ForecastResolver implements Resolve<boolean> {
  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const { countryCode, zipCode } = route.params;
    return this.weatherService.getForecast(countryCode, zipCode).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        this.toastr.error(capitalize(error.error.message), 'Error');
        return of(null);
      })
    );
  }
}
