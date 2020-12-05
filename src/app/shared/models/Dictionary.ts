import TariffEntity from '@shared/models/TariffEntity';
import CityEntity from '@shared/models/CityEntity';
import Courier from '@shared/models/Courier';
import Stock from '@shared/models/Stock';

export interface Dictionary {
  tariffs?: TariffEntity[],
  cities?: CityEntity[],
  couriers?: Courier[],
  stocks?: Stock[]
}
