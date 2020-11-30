import {Injectable} from '@angular/core';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class AppLoadService {

  constructor(private authService: AuthorizationService) {
  }

  initApp(): Promise<any> {
    const authInfo = this.authService.initAuthInfo();
    return Promise.all([authInfo]);
  }

}
