import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    SharedModule,
    MainRoutingModule,
  ],
  providers: []
})
export class MainModule { }
