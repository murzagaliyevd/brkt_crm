import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '@core/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService
{
  constructor(private dialog: MatDialog) { }

  public showConfirm (text: string, yesText: string = 'yes', noText: string = 'no'): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {text, yesText, noText}
    });
    return dialogRef.afterClosed()
  }
}
