import Entity from '@shared/models/Entity';
import CargoEntity from '@shared/models/CargoEntity';
import BarcodeEntity from '@shared/models/BarcodeEntity';

export default interface UnitEntity extends Entity {

  parentId: number | null;

  directionId: number;

  cargo: CargoEntity;

  barcode: BarcodeEntity

  children: Array<UnitEntity>
}
