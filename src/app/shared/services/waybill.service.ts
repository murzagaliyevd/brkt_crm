import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import WaybillEntity from '@shared/models/WaybillEntity';
import WaybillStatus from '@shared/models/WaybillStatus';

@Injectable()
export class WaybillService {

  constructor(private httpService: HttpService) {
  }

  updateDirection(waybill: WaybillEntity): Observable<boolean> {
    const dto = {
      recipient: {
        firstName: waybill.recipient.firstName,
        lastName: waybill.recipient.lastName,
        phoneNumber: waybill.recipient.phoneNumber
      },
      departure: {
        cityId: waybill.departure.city.id,
        address: waybill.departure.address
      },
      destination: {
        cityId: waybill.destination.city.id,
        address: waybill.destination.address
      },
      courierId: waybill.courier?.id,
      stockId: waybill.stock?.id,
      units: waybill.rootUnit?.children,
      tariffId: waybill.tariff.id
    };

    return this.httpService.put(`/direction/${waybill.id}`, dto)
  }

  updateStatuses(list: Array<number>, status: WaybillStatus): Observable<boolean> {
    const indexes = {
      list
    }
    return this.httpService.post(`/directions/status/${status}`,indexes)
  }

  sendToCourier(waybill: WaybillEntity): Observable<boolean> {
    return this.httpService.post(`/send-to-courier/${waybill.id}`, null );
  }


  archive(directionId: number): Observable<boolean> {
    return this.httpService.post(`/direction/${directionId}/archive`,null);
  };

  unarchive(directionId: number): Observable<boolean> {
    return this.httpService.post(`/direction/${directionId}/unarchive`,null);
  }

  getDirections(status: WaybillStatus | null, userId: number | null): Observable<WaybillEntity[]> {
    const requestBody = {
      status,
      userId
    };
    return this.httpService.post<WaybillEntity[]>(`/directions`,requestBody);
  }

  getDirection(id: number): Observable<WaybillEntity> {
    return this.httpService.get<WaybillEntity>(`/direction/${id}`);
  }

  sendToStock(id: number): Observable<boolean> {
    return this.httpService.post<boolean>(`/direction/${id}/to-stock`,null);
  }

}
