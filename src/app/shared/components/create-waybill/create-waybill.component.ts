import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CityEntity from '@shared/models/CityEntity';
import DictionaryService from '@core/services/dictionary.service';
import { DictionaryEnum } from '@shared/models/enums/DictionaryEnum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import OrderEntity from '@shared/models/OrderEntity';
import WaybillCreateDto from '@shared/models/WaybillCreateDto';
import OrderService from '@shared/services/order.service';
import { phoneMask } from '@shared/utils/utils';

@Component({
  selector: 'brkt-create-waybill',
  templateUrl: './create-waybill.component.html',
  styleUrls: ['./create-waybill.component.scss']
})
export class CreateWaybillComponent implements OnInit {
  order: OrderEntity;
  title = '';
  form: FormGroup;
  cities: CityEntity[];
  phoneMask = phoneMask;
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private dictionaryService: DictionaryService,
    private _matDialogRef: MatDialogRef<CreateWaybillComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      order: OrderEntity
    },
  ) {
    this.cities = this.dictionaryService.getDictionary(DictionaryEnum.CITIES);
    this.order = this.data.order;
    this.title = 'Создание накладной';
    this._createForm();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  private _createForm() {
    this.form = this.fb.group({
      departureAddress: [null, [Validators.required, Validators.minLength(5)]],
      departureCity: [null, Validators.required],
      destinationAddress: [null, [Validators.required, Validators.minLength(5)]],
      destinationCity: [null, Validators.required],
      recipientFirstName: [null, Validators.required],
      recipientLastName: [null, Validators.required],
      recipientPhone: [null, Validators.required],
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    const waybill = {
      departure: {
        cityId: this.f.departureCity.value,
        address: this.f.departureAddress.value
      },
      destination: {
        cityId: this.f.destinationCity.value,
        address: this.f.destinationAddress.value
      },
      recipient: {
        firstName: this.f.recipientFirstName.value,
        lastName: this.f.recipientLastName.value,
        phoneNumber: this.f.recipientPhone.value,
      }
    } as WaybillCreateDto

    this.orderService.addDirectionToOrder(this.order.id, waybill)
      .subscribe( resp => {
        this._matDialogRef.close(true);
      })
  }

}
