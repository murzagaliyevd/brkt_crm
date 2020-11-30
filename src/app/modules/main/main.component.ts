import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthorizationService } from '@core/services/authorization.service';
import AuthInfo from '@shared/models/AuthInfo';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MENU_ITEMS } from './menu-items';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;
  authInfo: AuthInfo;
  isHandset = false;
  menuItems = MENU_ITEMS;

  constructor(
    private breakpoint: BreakpointObserver,
    private authService: AuthorizationService,
    private router: Router) {
    this.authInfo = this.authService.authInfo;
  }

  ngOnInit(): void {
    this.breakpoint.observe([Breakpoints.Handset, Breakpoints.Small])
      .subscribe((result: BreakpointState) => this.isHandset = result.matches);
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }

  closeDrawer(): void {
    if ((this.isHandset) && this.drawer) {
      this.drawer.close();
    }
  }
}
