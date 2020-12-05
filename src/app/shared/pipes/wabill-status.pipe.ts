import { Pipe, PipeTransform } from '@angular/core';
import WaybillStatus from '@shared/models/WaybillStatus';

@Pipe({name: 'waybillStatus'})
export class WabillStatusPipe implements PipeTransform {
  transform(value: number): string {
    if(!value) {
      return null;
    }
    switch (value) {
      case WaybillStatus.Pending:
        return 'В ожидании';
      case WaybillStatus.Accepted:
        return 'Подтвержденные';
      case WaybillStatus.PickedUp:
        return 'Едет на склад';
      case WaybillStatus.WaitingStock:
        return 'Ожидают принятия на склад';
      case WaybillStatus.InStock:
        return 'На складе';
    }
  }
}
