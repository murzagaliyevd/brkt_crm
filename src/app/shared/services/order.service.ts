import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import OrderEntity from '@shared/models/OrderEntity';
import TariffEntity from '@shared/models/TariffEntity';
import WaybillEntity from '@shared/models/WaybillEntity';
import WaybillCreateDto from '@shared/models/WaybillCreateDto';
import { OrderFilter } from '@shared/models/OrderFilter';

@Injectable()
export default class OrderService {
  private _orderFilter: OrderFilter;
  constructor(
    private httpService: HttpService
  ) {
  }

  getOrders(): Observable<OrderEntity[]> {
    return this.httpService.get<OrderEntity[]>('/orders');
  }

  getOrderById(id: number): Observable<OrderEntity> {
    return this.httpService.get<OrderEntity>(`/order/${id}`);
  }

  updateOrder(order: OrderEntity): Observable<boolean> {
    const dto = {
      sender: order.sender,
      tariffId: order.tariff.id
    };
    return this.httpService.put(`/order/${order.id}`, dto )
  }

  updateTariff(orderId: number, tariff: TariffEntity): Observable<boolean> {
    return this.httpService.put(`/order/${orderId}/tariff`, tariff)
  }

  addDirectionToOrder(orderId: number, direction: WaybillCreateDto): Observable<WaybillEntity> {
    return this.httpService.post<WaybillEntity>(`/order/${orderId}/direction`, direction);
  }

  saveFilter(filter: OrderFilter) {
    this._orderFilter = filter;
  }

  clearFilter() {
    this._orderFilter = null;
  }

  get filter(): OrderFilter {
    return this._orderFilter;
  }
}
