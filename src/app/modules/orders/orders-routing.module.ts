import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  {
    path: '', component: OrdersComponent,
    children: [
      {
        path: 'pending',
        component: PendingOrdersComponent
      },
      {
        path: ':id',
        component: OrderDetailsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
