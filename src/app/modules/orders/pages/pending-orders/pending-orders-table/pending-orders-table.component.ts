import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import OrderEntity from '@shared/models/OrderEntity';
import { Router } from '@angular/router';

@Component({
  selector: 'brkt-pending-orders-table',
  templateUrl: './pending-orders-table.component.html',
  styleUrls: ['./pending-orders-table.component.scss']
})
export class PendingOrdersTableComponent implements OnInit {
  @Input() list: OrderEntity[];
  @Output() viewDetails = new EventEmitter();
  columns: string[] = ['id', 'senderFullName', 'senderPhoneNumber', 'directionsCount'];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(orderId: number) {
    this.router.navigate([`/orders`, orderId])
      .then( () => {
        this.viewDetails.emit(true);
      });
  }
}
