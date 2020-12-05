import {Injectable} from '@angular/core';
import {AuthorizationService} from './authorization.service';
import DictionaryService from '@core/services/dictionary.service';

@Injectable()
export class AppLoadService {

  constructor(
    private authService: AuthorizationService,
    private dictionaryService: DictionaryService) {
  }

  initApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(true)
      const authInfo = this.authService.initAuthInfo();
      if (authInfo) {
        this.dictionaryService.loadDictionaries()
          .subscribe( (results) => {
              this.dictionaryService.setDictionaries(results);
              resolve(true)
            },
            error =>  resolve(true)
          );
      } else {
        resolve(true);
      }
    })
  }

}
