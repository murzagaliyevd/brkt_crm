import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { Router } from '@angular/router';
import User from '@shared/models/User';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'brkt-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  showLoginForm = false;
  error: string;

  constructor(
    private authService: AuthorizationService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }
    this.showLoginForm = true;
  }

  login($event: User) {
    this.authService.login($event)
      .pipe(untilDestroyed(this))
      .subscribe(next => {
          if (next) {
            this.router.navigate(['/'])
          }
        },
        error => {
          this.error = 'Неправильный логин или пароль';
        }
      )
  }
}
