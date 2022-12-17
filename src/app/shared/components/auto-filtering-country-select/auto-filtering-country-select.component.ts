import { Component, forwardRef, HostListener, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CountryInfo } from 'src/app/core/models/country-info.model';
import Countries from '../../../../assets/data/countries-list.json';

@Component({
  selector: 'app-auto-filtering-country-select',
  templateUrl: './auto-filtering-country-select.component.html',
  styleUrls: ['./auto-filtering-country-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoFilteringCountrySelectComponent),
      multi: true,
    },
  ],
})
export class AutoFilteringCountrySelectComponent
  implements ControlValueAccessor, OnInit
{
  public countryControl: FormControl = new FormControl('');

  public search: string = '';

  public countries: CountryInfo[] = Countries;

  public filteredCountries: CountryInfo[] = Countries;

  public selectedCountry: CountryInfo | undefined = undefined;

  public isOptionsContainerOpen: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private isMouseInSelect: boolean = false;

  onChange = (value: CountryInfo) => {};
  onTouched = () => {};

  ngOnInit(): void {
    this.countryControl.valueChanges.subscribe((value: string) => {
      this.search = value;
      this.setFilteredCountries(value);

      if (this.search !== this.selectedCountry?.name) {
        this.removeSelectedCountry();
      }
    });
  }

  public writeValue(value: CountryInfo): void {
    this.countryControl.setValue(value.name);
  }

  public registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  public setSelectedCountry(country: CountryInfo): void {
    this.selectedCountry = country;
    this.countryControl.setValue(country.name);
    this.onChange(this.selectedCountry!);
    this.isOptionsContainerOpen.next(false);
  }

  private removeSelectedCountry(): void {
    this.selectedCountry = undefined;
    this.onChange(this.selectedCountry!);
  }

  private setFilteredCountries(currentValue: string): void {
    this.filteredCountries = this.countryControl.value
      ? this.countries.filter((country: CountryInfo) =>
          country.name.toLowerCase().includes(currentValue?.toLowerCase())
        )
      : this.countries;
  }

  public onFocus(): void {
    this.isOptionsContainerOpen.next(true);
  }

  @HostListener('document:click') onClick() {
    if (!this.isMouseInSelect) {
      this.isOptionsContainerOpen.next(false);
    }
  }

  public onSelectMouseEnter(): void {
    this.isMouseInSelect = true;
  }

  public onSelectMouseLeave(): void {
    this.isMouseInSelect = false;
  }
}
