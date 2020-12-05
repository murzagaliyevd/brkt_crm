import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'brkt-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  text: string;
  yesText: string;
  noText: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {text: string,yesText: string,noText: string},
    private _matDialogRef: MatDialogRef<ConfirmModalComponent>
  ) {
    this.text = this.data.text;
    this.yesText = this.data.yesText;
    this.noText = this.data.noText;
  }

  ngOnInit(): void {
  }

  handleClick(confirmed: boolean) {
    this._matDialogRef.close(confirmed);
  }
}
