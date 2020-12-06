import { NgModule } from '@angular/core';
import { WaybillsComponent } from './waybills.component';
import { SharedModule } from '@shared/shared.module';
import { WaybillsRoutingModule } from './waybills-routing.module';

@NgModule({
  declarations: [
  WaybillsComponent],
  imports: [
    SharedModule,
    WaybillsRoutingModule,
  ],
  providers: []
})
export class WaybillsModule { }
