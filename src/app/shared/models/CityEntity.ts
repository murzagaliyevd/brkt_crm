import Entity from '@shared/models/Entity';

export default interface CityEntity extends Entity {
  name: string;
  allowedAsDeparture: boolean;
  allowedAsDestination: boolean;
}
