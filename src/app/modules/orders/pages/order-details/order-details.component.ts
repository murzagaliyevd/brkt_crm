import { Component, OnInit } from '@angular/core';
import OrderService from '@shared/services/order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import OrderEntity from '@shared/models/OrderEntity';
import TariffEntity from '@shared/models/TariffEntity';
import CityEntity from '@shared/models/CityEntity';
import Courier from '@shared/models/Courier';
import Stock from '@shared/models/Stock';
import DictionaryService from '@core/services/dictionary.service';
import { DictionaryEnum } from '@shared/models/enums/DictionaryEnum';
import WaybillEntity from '@shared/models/WaybillEntity';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { CreateWaybillComponent } from '@shared/components/create-waybill/create-waybill.component';
import { ModeEnum } from '@shared/models/enums/ModeEnum';

@UntilDestroy()
@Component({
  selector: 'brkt-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: OrderEntity;
  activeDirections: WaybillEntity[] = [];
  archivedDirections: WaybillEntity[] = [];
  tariffs: TariffEntity[] = [];
  cities: CityEntity[] = [];
  couriers: Courier[] = [];
  stocks: Stock[] = [];
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private dictionaryService: DictionaryService,
    private dialog: MatDialog
  ) {
    this.tariffs = this.dictionaryService.getDictionary(DictionaryEnum.TARIFFS);
    this.cities = this.dictionaryService.getDictionary(DictionaryEnum.CITIES);
    this.couriers = this.dictionaryService.getDictionary(DictionaryEnum.COURIERS);
    this.stocks = this.dictionaryService.getDictionary(DictionaryEnum.STOCKS);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( (params: Params) => {
          return this._getOrder(params.id);
        })
      )
      .subscribe( () => {})
  }

  private _getOrder(id: number) {
    return this.orderService.getOrderById(id)
      .pipe(
        map(
          (order: OrderEntity) => {
            this.order = order;
            this.activeDirections =
              this.order.directions.filter(x => !x.isArchived);
            this.archivedDirections =
              this.order.directions.filter(x => x.isArchived);
          }
        )
      )
  }

  createWaybill() {
    const dialogRef = this.dialog.open(CreateWaybillComponent, {
      width: '1000px',
      data: {order: this.order}
    });
    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(refresh => {
        if (refresh) {
          this._getOrder(this.order.id)
            .subscribe( () => {})
        }
      });
  }

  refresh() {
    this._getOrder(this.order.id)
      .subscribe( () => {})
  }
}
