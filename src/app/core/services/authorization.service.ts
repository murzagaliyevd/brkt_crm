import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {RoleEnum} from '@shared/models/enums/RoleEnum';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '@core/utils/local-storage';
import AuthInfo from '@shared/models/AuthInfo';
import User from '@shared/models/User';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
export const USER_DATA = 'user_data';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _authInfo: AuthInfo;

  constructor(private httpService: HttpService) {
  }

  login(user: User): Observable<AuthInfo> {
    return this.httpService.post<AuthInfo>('/auth/login', user, 'json')
      .pipe(
        tap( response => {
          this.setAuthInfo(response);
        })
      )
  }

  // logout(): Observable<any> {
  //   return this.httpService.post('/logout', null, 'json')
  //     .pipe(
  //       tap( res => {
  //         this.setAuthInfo(null);
  //         return res;
  //       } )
  //     );
  // }

  logout(): void{
    this.setAuthInfo(null);
  }

  clearAuthInfo() {
    this.setAuthInfo(null);
  }

  initAuthInfo() {
    const authInfo = getFromLocalStorage(USER_DATA);
    if (!authInfo) {
      return null;
    }
    this.setAuthInfo(authInfo);
    return authInfo;
  }

  setAuthInfo(authInfo: AuthInfo) {
    if (!authInfo) {
      this._authInfo = null;
      removeFromLocalStorage([USER_DATA]);
    }
    this._authInfo = authInfo;
    setToLocalStorage(USER_DATA, authInfo)
  }

  get authInfo() {
    return this._authInfo;
  }

  get isAuthenticated(): boolean {
    return (!!this._authInfo);
  }


  get currentMode(): string | null {
    if (!this.isAuthenticated) {
      return null;
    }
    return 'admin';
  }

  private getUrlForRole(roleId: RoleEnum): string | null {
    return RoleEnum.toString(roleId);
  }

  get token() {
    return this._authInfo?.token;
  }
}
