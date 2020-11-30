import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class OptionsBuilder {
  private appendingHeaders: { [key: string]: string }[] = [];
  private appendingParams: { [key: string]: string }[] = [];
  private responseType?: 'json' | 'text' | null;

  public appendHeader(key: string, value: string | null): void {
    if (value !== undefined) {
      this.appendingHeaders.push({key, value});
    }
  }

  public appendParams(key: string, value: string | null): void {
    if (value !== undefined) {
      this.appendingParams.push({key, value});
    }
  }

  public appendResponseType(responseType?: 'json' | 'text' | null) {
    this.responseType = responseType;
  }

  private get headers(): HttpHeaders {
    let ret: HttpHeaders = new HttpHeaders();
    this.appendingHeaders.forEach(h => {
      ret = ret.append(h[`key`], h[`value`]);
    });
    return ret;
  }

  private get params(): HttpParams {
    let ret: HttpParams = new HttpParams();
    this.appendingParams.forEach(h => {
      ret = ret.append(h[`key`], h[`value`]);
    });
    return ret;
  }

  public getJson(): RequestOptionsJson {
    return {
      observe: 'response',
      headers: this.headers,
      params: this.params,
      reportProgress: false,
      withCredentials: true,
      responseType: 'json'
    };
  }

  public getText(): RequestOptionsText {
    return {
      observe: 'response',
      headers: this.headers,
      params: this.params,
      reportProgress: false,
      withCredentials: true,
      responseType: 'text'
    };
  }

  public getBlob(): RequestOptionsBlob {
    return {
      observe: 'response',
      headers: this.headers,
      params: this.params,
      reportProgress: false,
      withCredentials: true,
      responseType: 'blob'
    };
  }
}

class RequestOptions {
  observe: 'response';
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

class RequestOptionsJson extends RequestOptions {
  responseType: 'json';
}

class RequestOptionsText extends RequestOptions {
  responseType: 'text';
}

class RequestOptionsBlob extends RequestOptions {
  responseType: 'blob';
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  private prefix(): string {
    return environment.apiUrl;
  }

  public url(urlSuffix: string): string {
    return this.prefix() + urlSuffix;
  }

  public setControllerPrefix(controllerPrefix: string): HttpService {
    const prefixHandler = {
      get(target: any, name, receiver) {
        if (name === 'url') {
          return (urlSuffix) => {
            return target.__proto__.prefix() + controllerPrefix + urlSuffix;
          };
        }
        return Reflect.get(target, name, receiver);
      }
    } as ProxyHandler<HttpService>;
    return new Proxy(this, prefixHandler);
  }

  public get<returnType>(urlSuffix: string,
                         keyValue?: { [key: string]: string | number | string[] | number[] | null },
                         responseType?: 'json' | 'text' | null): Observable<returnType> {

    const ob: OptionsBuilder = this.newOptionsBuilder();

    if (keyValue) {
      for (const key of Object.keys(keyValue)) {
        const value = keyValue[key];
        if (value !== undefined && value !== null) {
          ob.appendParams(key, value as string);
        }
      }
    }

    switch (responseType) {
      case 'text': {
        return this.http.get(this.url(urlSuffix), ob.getText())
          .pipe(
            map(event => {
              return event.body;
            }),
            catchError(err => throwError(err))
          ) as Observable<returnType>;
      }
      default: {
        return this.http.get(this.url(urlSuffix), ob.getJson())
          .pipe(
            map(event => {
              return event.body;
            }),
          ) as Observable<returnType>;
      }
    }
  }


  uploadFile(urlSuffix: string,
             file: File): Observable<HttpEvent<any>> {

    const formData = new FormData();
    formData.append('file', file);

    const params = new HttpParams();

    const options = {
      reportProgress: true,
      params,
      responseType: 'text'  as 'json' ,
    };

    const req = new HttpRequest('POST', this.url(urlSuffix), formData, options );
    return this.http.request(req)
      .pipe(
        map(event => {
          return event;
        }),
      );
  }

  downloadFile(urlPrefix: string,
               urlSuffix: string) {
    return this.http.get(`${urlPrefix}/${urlSuffix}`, {responseType: 'arraybuffer'} )
      .pipe(
        map(event => {
          return event;
        }),
      );
  }

  public post<returnType>(
    urlSuffix: string,
    body: any,
    responseType?: 'json' | 'text' | null, isFormData?: boolean | null): Observable<returnType> {
    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/json');

    switch (responseType) {
      case 'text': {
        return this.http.post(this.url(urlSuffix), body, ob.getText())
          .pipe(
            map(event => {
              return event.body;
            }),
            catchError(err => throwError(err))
          ) as Observable<returnType>;
      }
      default: {
        return this.http.post<any>(this.url(urlSuffix), body, ob.getJson())
          .pipe(
            map(event => {
              return event.body;
            }),
            catchError(err => throwError(err))
          ) as Observable<returnType>;
      }
    }
  }

  public delete(urlSuffix: string,
                keyValue?: { [key: string]: string | number | boolean | null },
                responseType?: 'json' | 'text' | null): Observable<HttpResponse<any>> {
    const ob: OptionsBuilder = this.newOptionsBuilder();

    if (keyValue) {
      for (const key of Object.keys(keyValue)) {
        const value = keyValue[key];
        if (value !== undefined) {
          ob.appendParams(key, value as string);
        }
      }
    }

    switch (responseType) {
      case 'text': {
        return this.http.delete(this.url(urlSuffix), ob.getText());
      }
      default: {
        return this.http.delete<any>(this.url(urlSuffix), ob.getJson());
      }
    }
  }

  private newOptionsBuilder(): OptionsBuilder {
    const ob = new OptionsBuilder();
    return ob;
  }
}
