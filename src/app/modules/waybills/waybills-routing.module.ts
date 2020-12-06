import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { WaybillsComponent } from './waybills.component';
import { OrderDetailsComponent } from '../orders/pages/order-details/order-details.component';

const routes: Routes = [
  {
    path: '', component: WaybillsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaybillsRoutingModule {
}
