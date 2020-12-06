import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import CityEntity from '@shared/models/CityEntity';
import OrderService from '@shared/services/order.service';
import DictionaryService from '@core/services/dictionary.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DictionaryEnum } from '@shared/models/enums/DictionaryEnum';
import WaybillEntity from '@shared/models/WaybillEntity';
import { ModeEnum } from '@shared/models/enums/ModeEnum';
import { phoneMask } from '@shared/utils/utils';
import TariffEntity from '@shared/models/TariffEntity';
import Courier from '@shared/models/Courier';
import Stock from '@shared/models/Stock';
import { WaybillService } from '@shared/services/waybill.service';

@Component({
  selector: 'brkt-edit-waybill',
  templateUrl: './edit-waybill.component.html',
  styleUrls: ['./edit-waybill.component.scss']
})
export class EditWaybillComponent implements OnInit {
  waybill: WaybillEntity;
  title = '';
  form: FormGroup;
  mode: ModeEnum;
  cities: CityEntity[];
  tariffs: TariffEntity[];
  couriers: Courier[];
  stocks: Stock[];
  phoneMask = phoneMask;
  private _unitControls = {
    weight: [null],
    length: [null],
    width: [null],
    height: [null],
    reason: [null]
  };
  constructor(
    private fb: FormBuilder,
    private dictionaryService: DictionaryService,
    private _matDialogRef: MatDialogRef<EditWaybillComponent>,
    private waybillService: WaybillService,
    @Inject(MAT_DIALOG_DATA) private data: {
      waybill: WaybillEntity,
      mode: ModeEnum
    },
  ) {
    this.cities = this.dictionaryService.getDictionary(DictionaryEnum.CITIES);
    this.tariffs = this.dictionaryService.getDictionary(DictionaryEnum.TARIFFS);
    this.couriers = this.dictionaryService.getDictionary(DictionaryEnum.COURIERS);
    this.stocks = this.dictionaryService.getDictionary(DictionaryEnum.STOCKS);
    this.waybill = this.data.waybill;
    this.mode = this.data.mode;
    this.title = `Накладная № ${this.waybill.id}`;
    this._createForm();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  get units() {
    return this.f.units as FormArray;
  }

  addUnit() {
    this.units.push(this.fb.group(this._unitControls))
  }

  deleteUnit(i: number) {
    this.units.removeAt(i);
  }

  private _createForm() {
    let units = [];
    if (this.waybill?.rootUnit?.children && this.waybill?.rootUnit?.children.length > 0) {
      units = this.waybill?.rootUnit?.children?.map(item => {
        return this.fb.group(
          {
            weight: [item.cargo?.weight],
            height: [item.cargo?.height],
            width: [item.cargo?.width],
            length: [item.cargo?.length],
          });
      });
    }

    this.form = this.fb.group({
      tariff: [this.waybill.tariff.id, Validators.required],
      departureAddress: [this.waybill.departure?.address, [Validators.required, Validators.minLength(5)]],
      departureCity: [this.waybill.departure?.city?.id, Validators.required],
      destinationAddress: [this.waybill.destination?.address, [Validators.required, Validators.minLength(5)]],
      destinationCity: [this.waybill.destination?.city?.id, Validators.required],
      recipientFirstName: [this.waybill.recipient.firstName, Validators.required],
      recipientLastName: [this.waybill.recipient.lastName, Validators.required],
      recipientPhone: [this.waybill.recipient.phoneNumber, Validators.required],
      courier: [this.waybill.courier?.id],
      stock: [this.waybill.stock?.id],
      units: new FormArray(units),
    });
  }

  private _generateModel(): WaybillEntity {
    if (!this.waybill.rootUnit) {
      this.waybill.rootUnit = {
        id: 0,
        parentId: 0,
        directionId: this.waybill.id,
        barcode: { id: 0, value: ''},
        cargo: { id: 0, width: 0, weight: 0, height: 0, length: 0 },
        children: []
      }
    }

    const units = [];
    (this.units).controls.forEach((group: FormGroup, i) => {
      let unit;
      if (this.waybill?.rootUnit?.children[i]) {
        unit = this.waybill?.rootUnit?.children[i];
        unit.cargo.weight = group.get('weight').value;
        unit.cargo.length = group.get('length').value;
        unit.cargo.width = group.get('width').value;
        unit.cargo.height = group.get('height').value;
      } else {
        unit = {
          id: 0,
          parentId: 0,
          directionId: this.waybill.id,
          cargo: {
            id: 0,
            weight: group.get('weight').value,
            length: group.get('length').value,
            width: group.get('width').value,
            height: group.get('height').value
          },
          barcode: {
            id: 0,
            value: ''
          },
          children: []
        }
      }
      units.push(unit);
    });

    this.waybill.rootUnit.children = units;

    const waybill = {
      ...this.waybill,
      tariff: this.dictionaryService.getTariffById(this.f.tariff.value),
      departure: {
        city: this.dictionaryService.getCityById(this.f.departureCity.value),
        address: this.f.departureAddress.value
      },
      destination: {
        city: this.dictionaryService.getCityById(this.f.destinationCity.value),
        address: this.f.destinationAddress.value
      },
      recipient: {
        lastName: this.f.recipientLastName.value,
        firstName: this.f.recipientFirstName.value,
        phoneNumber: this.f.recipientPhone.value,
      },
      courier: this.dictionaryService.getCourierById(this.f.courier.value),
      stock: this.dictionaryService.getStockById(this.f.stock.value),
    } as WaybillEntity
    return waybill;
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.waybillService.updateDirection( this._generateModel() )
      .subscribe( resp => {
        this._matDialogRef.close(true);
      })

  }


}
