import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';
import OrderService from '@shared/services/order.service';
import { WaybillService } from '@shared/services/waybill.service';
import { CreateWaybillComponent } from './components/create-waybill/create-waybill.component';
import { WabillStatusPipe } from '@shared/pipes/wabill-status.pipe';
import { EditWaybillComponent } from './components/edit-waybill/edit-waybill.component';
import { TextMaskModule } from 'angular2-text-mask';
import { UnitListComponent } from './components/unit-list/unit-list.component';

@NgModule({
  declarations: [
    CreateWaybillComponent,
    WabillStatusPipe,
    EditWaybillComponent,
    UnitListComponent
  ],
  entryComponents: [
    CreateWaybillComponent,
    EditWaybillComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TextMaskModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    WabillStatusPipe,
    TextMaskModule
  ],
  providers: [
    OrderService,
    WaybillService,
  ]
})
export class SharedModule {}
