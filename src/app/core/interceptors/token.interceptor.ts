import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '@core/services/authorization.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly TOKEN_NAME = 'access_token';
  constructor(private authService: AuthorizationService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.token;
    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
