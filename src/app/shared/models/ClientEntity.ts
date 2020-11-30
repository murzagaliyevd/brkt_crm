import Entity from '@shared/models/Entity';

export default interface ClientEntity extends Entity {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
