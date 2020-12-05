import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import WaybillEntity from '@shared/models/WaybillEntity';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { ModeEnum } from '@shared/models/enums/ModeEnum';
import { EditWaybillComponent } from '@shared/components/edit-waybill/edit-waybill.component';
import { WaybillService } from '@shared/services/waybill.service';
import WaybillStatus from '@shared/models/WaybillStatus';
import { ErrorModalComponent } from '@core/components/error-modal/error-modal.component';

@UntilDestroy()
@Component({
  selector: 'brkt-order-waybills',
  templateUrl: './order-waybills.component.html',
  styleUrls: ['./order-waybills.component.scss']
})
export class OrderWaybillsComponent implements OnInit {
  @Input() list: WaybillEntity[];
  @Output() refresh = new EventEmitter();
  columns: string[] = ['from', 'to', 'tariff', 'count', 'status', 'actions'];
  constructor(
    private dialog: MatDialog,
    private waybillService: WaybillService
  ) { }

  ngOnInit(): void {
  }

  open(waybill: WaybillEntity) {
    if (true) {
      const dialogRef = this.dialog.open(EditWaybillComponent, {
        width: '1000px',
        data: {waybill, mode: ModeEnum.EDIT}
      });
      dialogRef.afterClosed()
        .pipe(untilDestroyed(this))
        .subscribe(refresh => {
          if (refresh) {
            this.refresh.emit( true);
          }
        });
    }
  }

  asWaybill(waybill: any): WaybillEntity{
    return waybill as WaybillEntity;
  }

  archive(id: number) {
    this.waybillService.archive(id)
      .subscribe( () => {
        this.refresh.emit( true);
      })
  }

  unarchive(id: number) {
    this.waybillService.unarchive(id)
      .subscribe( () => {
        this.refresh.emit( true);
      })
  }

  canSendToCourier(waybill: WaybillEntity) {
    return waybill.status === WaybillStatus.Pending;
  }

  canSendToStock(waybill: WaybillEntity) {
    return waybill.status === WaybillStatus.Accepted
      || waybill.status === WaybillStatus.PickedUp
  }

  sendToCourier(waybill: WaybillEntity) {
    if ( this._isValidWaybill(waybill) ) {
      this.waybillService.sendToCourier(waybill)
        .subscribe( () => {
          this.refresh.emit( true);
        })
    }
  }

  sendToStock(waybill: WaybillEntity) {
    if ( this._isValidWaybill(waybill) ) {
      this.waybillService.updateStatuses([waybill.id], WaybillStatus.WaitingStock)
        .subscribe( () => {
          this.refresh.emit( true);
        })
    }
  }

  private _isValidWaybill(waybill: WaybillEntity) {
    const errors = [];
    if (!waybill?.courier?.id) {
      errors.push(' Выберите курьера ')
    }
    if (!waybill?.stock?.id) {
      errors.push(' Выберите склад ')
    }
    if (errors && errors.length > 0) {
      const dialogRef = this.dialog.open(ErrorModalComponent, {
        width: '400px',
        data: {error: errors}
      });
      dialogRef.afterClosed()
        .pipe(untilDestroyed(this))
        .subscribe(result => {
        });
      return false;
    }
    return true;
  }
}
