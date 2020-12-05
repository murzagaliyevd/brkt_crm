import WaybillEntity from '@shared/models/WaybillEntity';
import Grouped from '@shared/models/Grouped';
import CityEntity from '@shared/models/CityEntity';

export function orderByDesc<T>(items: Array<T>, expr: (item: T) => number) {
  return items.sort((x1, x2) => expr(x1) > expr(x2) ? -1 : 1)
}

export function groupByCityName(directions: WaybillEntity[]): Grouped<CityEntity, WaybillEntity>[] {
  return groupBy(directions,
    d => d.destination.city,
    v => v.destination.city.id,
    k => k.id
  )
}

export function groupBy<TKey, TValue, TCompareBy>(
  values: Array<TValue>,
  getKey: (value: TValue) => TKey,
  getValueComparer: (value: TValue) => TCompareBy,
  getKeyComparer: (key: TKey) => TCompareBy
): Array<Grouped<TKey, TValue>>  {

  const keys = new Array<TKey>();

  for (const value of values) {
    if (!keys.find(k => getKeyComparer(k) === getValueComparer(value))) {
      keys.push(getKey(value));
    }
  }

  const groups = new Array<Grouped<TKey, TValue>>();
  for (const k of keys) {
    const valuesWithKey = values.filter(v => getKeyComparer(k) === getValueComparer(v));
    groups.push({ key: k, values: valuesWithKey })
  }

  return groups;
}

export const phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
