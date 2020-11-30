import Entity from '@shared/models/Entity';
import ClientEntity from '@shared/models/ClientEntity';
import RootUnitEntity from '@shared/models/RootUnitEntity';
import TariffEntity from '@shared/models/TariffEntity';
import DirectionStatus from '@shared/models/DirectionStatus';
import Courier from '@shared/models/Courier';
import Stock from '@shared/models/Stock';
import CityAddress from '@shared/models/CityAddress';

export default interface DirectionEntity extends Entity {

  status: DirectionStatus;

  recipient: ClientEntity;

  tariff: TariffEntity;

  departure: CityAddress;

  destination: CityAddress;

  courier: Courier | null;

  stock: Stock | null;

  fullCargoWeight: number;

  cargoCount: number;

  rootUnit: RootUnitEntity | undefined;

  isArchived: boolean;
}
