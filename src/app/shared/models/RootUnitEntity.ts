import UnitEntity from '@shared/models/UnitEntity';

export default interface RootUnitEntity extends UnitEntity {
  children: Array<UnitEntity>;
}
