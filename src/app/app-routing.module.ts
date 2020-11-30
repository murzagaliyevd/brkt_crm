import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@core/guards/login.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginModule ),
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then( m => m.MainModule ),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
