import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import TariffEntity from '@shared/models/TariffEntity';
import CityEntity from '@shared/models/CityEntity';
import Courier from '@shared/models/Courier';
import Stock from '@shared/models/Stock';
import { DictionaryEnum } from '@shared/models/enums/DictionaryEnum';

@Injectable({
  providedIn: 'root'
})
export default class DictionaryService {
  private _dictionary = {};
  constructor(
    private httpService: HttpService
  ) {
  }
  loadDictionaries() {
    const tariffs = this.httpService.get<TariffEntity[]>('/tariffs');
    const cities = this.httpService.get<CityEntity[]>('/cities');
    const couriers = this.httpService.get<Courier[]>('/couriers');
    const stocks = this.httpService.get<Stock[]>('/stocks');

    return forkJoin([tariffs, cities, couriers, stocks]);
  }

  setDictionaries(results: [TariffEntity[], CityEntity[], Courier[], Stock[]]) {
    this._dictionary[DictionaryEnum.TARIFFS] = results[0];
    this._dictionary[DictionaryEnum.CITIES] = results[1];
    this._dictionary[DictionaryEnum.COURIERS] = results[2];
    this._dictionary[DictionaryEnum.STOCKS] = results[3];
  }

  getDictionary(type: DictionaryEnum) {
    return this._dictionary[type];
  }

  getCityById(id: number) {
    const cities: CityEntity[] = this._dictionary[DictionaryEnum.CITIES];
    if (cities) {
      return cities.find( item => item.id === id);
    }
    return null;
  }

  getTariffById(id: number) {
    const tariffs: TariffEntity[] = this._dictionary[DictionaryEnum.TARIFFS];
    if (tariffs) {
      return tariffs.find( item => item.id === id);
    }
    return null;
  }

  getCourierById(id: number) {
    const couriers: Courier[] = this._dictionary[DictionaryEnum.COURIERS];
    if (couriers) {
      return couriers.find( item => item.id === id);
    }
    return null;
  }

  getStockById(id: number) {
    const stocks: Stock[] = this._dictionary[DictionaryEnum.STOCKS];
    if (stocks) {
      return stocks.find( item => item.id === id);
    }
    return null;
  }
}
