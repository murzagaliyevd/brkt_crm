import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { PendingOrdersComponent } from './pages/pending-orders/pending-orders.component';
import { OrdersComponent } from './orders.component';
import { PendingOrdersTableComponent } from './pages/pending-orders/pending-orders-table/pending-orders-table.component';
import { PendingOrdersFilterComponent } from './pages/pending-orders/pending-orders-filter/pending-orders-filter.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

@NgModule({
  declarations: [
    PendingOrdersComponent,
    OrdersComponent,
    PendingOrdersTableComponent,
    PendingOrdersFilterComponent,
    OrderDetailsComponent,
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
  ],
  providers: []
})
export class OrdersModule { }
