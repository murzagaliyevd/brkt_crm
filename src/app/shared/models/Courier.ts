import Entity from '@shared/models/Entity';

export default interface Courier extends Entity {
  firstName: string;
  lastName: string;
  telegramPhoneNumber: string;
}
