import { NgModule } from '@angular/core';
import {LoginRoutingModule} from './login-routing.module';
import { LoginFormComponent } from './login-page/login-form/login-form.component';
import {SharedModule} from '../../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
  ],
  providers: []
})
export class LoginModule { }
