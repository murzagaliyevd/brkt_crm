import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dateToDDMMYYYY } from '@shared/utils/date';
import { OrderFilter } from '@shared/models/OrderFilter';

@Component({
  selector: 'brkt-pending-orders-filter',
  templateUrl: './pending-orders-filter.component.html',
  styleUrls: ['./pending-orders-filter.component.scss']
})
export class PendingOrdersFilterComponent implements OnInit {
  today: Date = new Date();
  @Output() search = new EventEmitter();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      dateFrom: [null],
      dateTo: [null],
    });
  }

  get f() { return this.form.controls; }

  initSearch() {
    if (!this.form.valid) {
      return;
    }
    const dateFrom = dateToDDMMYYYY(this.f.dateFrom.value);
    const dateTo = dateToDDMMYYYY(this.f.dateTo.value);
    const filter: OrderFilter = {
      dateFrom,
      dateTo,
    };
    this.search.emit(filter);
  }

  clear() {
    this.form.reset();
  }

}
