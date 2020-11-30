import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LoaderComponent } from '@core/components/loader/loader.component';
import { SharedModule } from '@shared/shared.module';
import { LoaderService } from '@core/services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '@core/interceptors/loader.interceptor';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { TokenInterceptor } from '@core/interceptors/token.interceptor';
import { AppLoadService } from '@core/services/app-loader.service';
import { LoginGuard } from '@core/guards/login.guard';

const services = [
  AppLoadService,
  LoaderService,
  LoginGuard
];

export function initApp(appLoadService: AppLoadService) {
  return () => appLoadService.initApp();
}

@NgModule({
  entryComponents: [
    ErrorModalComponent,
    ConfirmModalComponent
  ],
  declarations: [
    LoaderComponent,
    ErrorModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    services,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppLoadService], multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
})
export class CoreModule { }
