import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService
{
  private error = new Subject<string>();

  constructor() { }

  public addError (error: string) {
    this.error.next(error);
  }

  public getError() {
    return this.error.asObservable();
  }

}
