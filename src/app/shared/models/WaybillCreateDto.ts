import CityIdAddressDto from '@shared/models/CityIdAddressDto';
import RecipientDto from '@shared/models/RecipientDto';

export default interface WaybillCreateDto {
  departure: CityIdAddressDto;
  destination: CityIdAddressDto;
  recipient: RecipientDto;
}
