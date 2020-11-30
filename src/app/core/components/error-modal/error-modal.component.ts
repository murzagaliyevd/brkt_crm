import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  error: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: {error: string}) {
    this.error = this.data.error;
  }

  ngOnInit(): void {
  }

}
