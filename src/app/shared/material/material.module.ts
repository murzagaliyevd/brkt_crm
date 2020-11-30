import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ],
  declarations: [],
  entryComponents: [
  ],
})

export class MaterialModule {}
