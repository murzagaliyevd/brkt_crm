import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import WaybillEntity from '@shared/models/WaybillEntity';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { ModeEnum } from '@shared/models/enums/ModeEnum';
import { EditWaybillComponent } from '@shared/components/edit-waybill/edit-waybill.component';

@UntilDestroy()
@Component({
  selector: 'brkt-order-waybills',
  templateUrl: './order-waybills.component.html',
  styleUrls: ['./order-waybills.component.scss']
})
export class OrderWaybillsComponent implements OnInit {
  @Input() list: WaybillEntity[];
  @Output() refresh = new EventEmitter();
  columns: string[] = ['from', 'to', 'tariff', 'count', 'status'];
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onClick(waybill: WaybillEntity) {
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
}
