import Entity from '@shared/models/Entity';
import ClientEntity from '@shared/models/ClientEntity';
import DirectionEntity from '@shared/models/DirectionEntity';
import TariffEntity from '@shared/models/TariffEntity';

export default interface OrderEntity extends Entity {
  sender: ClientEntity;
  directions: Array<DirectionEntity>;
  tariff: TariffEntity;
}
