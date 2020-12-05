import { Component, OnInit } from '@angular/core';
import { ErrorService } from '@core/services/error.service';
import { MatDialog } from '@angular/material/dialog';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';
import { ErrorModalComponent } from '@core/components/error-modal/error-modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'brkt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private errorService: ErrorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getErrors();
  }

  private getErrors(): void {
    this.errorService.getError()
      .pipe(
        untilDestroyed(this),
        debounce( () => timer(500))
      )
      .subscribe((error) => {
        const dialogRef = this.dialog.open(ErrorModalComponent, {
          width: '400px',
          data: {error}
        });
        dialogRef.afterClosed()
          .pipe(untilDestroyed(this))
          .subscribe(result => {
          });
      });
  }
}
