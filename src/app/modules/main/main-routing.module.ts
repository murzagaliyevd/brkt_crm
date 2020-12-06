import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('../../modules/orders/orders.module').then( m => m.OrdersModule ),
      },
      {
        path: 'waybills',
        loadChildren: () => import('../../modules/waybills/waybills.module').then( m => m.WaybillsModule ),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
