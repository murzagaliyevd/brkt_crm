import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '@core/services/authorization.service';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthorizationService,
    protected router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    return this.canActivate(next, state);
  }
}
