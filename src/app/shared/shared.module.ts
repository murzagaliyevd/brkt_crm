import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
  ],
  providers: [
  ]
})
export class SharedModule {}
