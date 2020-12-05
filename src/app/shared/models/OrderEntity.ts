import Entity from '@shared/models/Entity';
import ClientEntity from '@shared/models/ClientEntity';
import WaybillEntity from '@shared/models/WaybillEntity';
import TariffEntity from '@shared/models/TariffEntity';

export default interface OrderEntity extends Entity {
  sender: ClientEntity;
  directions: Array<WaybillEntity>;
  tariff: TariffEntity;
}
