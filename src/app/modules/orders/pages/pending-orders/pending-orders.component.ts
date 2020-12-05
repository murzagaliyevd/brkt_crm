import { Component, OnInit, ViewChild, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { merge, of, Subject } from 'rxjs';
import { environment } from '@environments/environment';
import OrderService from '@shared/services/order.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderFilter } from '@shared/models/OrderFilter';
import OrderEntity from '@shared/models/OrderEntity';

@UntilDestroy()
@Component({
  selector: 'brkt-waiting-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  refreshTable: Subject<boolean> = new Subject();
  pageSize = environment.pageSize;
  list: OrderEntity[] = [];
  private _filterEmitter = new EventEmitter();
  private _filter: OrderFilter = {};
  protected dialog: MatDialog;
  constructor(private orderService: OrderService) { }

  ngOnDestroy(): void {
    this.orderService.clearFilter();
  }

  ngOnInit(): void {
    this.refreshTable
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.paginator.page.emit( new PageEvent() );
      });
    this._filterEmitter
      .pipe(untilDestroyed(this))
      .subscribe(val => {
        if (this.orderService.filter) {
          this._filter = this.orderService.filter;
          this.paginator.pageIndex = this._filter.page;
          return;
        }
        this.paginator.pageIndex = 0;
        this._filter = val;
      });
  }

  ngAfterViewInit() {
    this.getTableData();
    this.refreshTable.next(true);
  }

  getTableData() {
    merge(this.paginator.page, this._filterEmitter)
      .pipe(untilDestroyed(this))
      .pipe(
        switchMap(() => {
          if (!this._filter) {
            this._filter = {}
          }
          this._filter.page = this.paginator.pageIndex;
          this._filter.size = this.pageSize;
          return this.orderService.getOrders().pipe(
            catchError(() => {
              return of(undefined);
            })
          );
        }),
        map(data => {
          this.list = data as OrderEntity[];
        }),
      ).subscribe(data => {
    });
  }

  search($event: OrderFilter) {
    this._filterEmitter.emit($event);
  }

  saveFilter() {
    this.orderService.saveFilter(this._filter);
  }
}
