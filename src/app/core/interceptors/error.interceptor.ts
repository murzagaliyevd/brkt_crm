import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';
import { ErrorService } from '@core/services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authService.clearAuthInfo();
          this.router.navigate(['/login']);
        } else if (error.status === 500) {
          this.errorService.addError('Ошибка при обработке запроса');
        }
        else if (error.status === 502) {
          this.errorService.addError('Сервер недоступен');
        }
        else if (error.status === 0) {
          this.errorService.addError('Неизвестная ошибка');
        }
        return throwError(error.error);
      }));
  }
}
