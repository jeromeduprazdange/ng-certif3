import Countries from '../../../assets/data/countries-list.json';
import { CountryInfo } from '../models/country-info.model';

export const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
