import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as mockData from '../../../../../../mock/index.json';

@Injectable({
  providedIn: 'root',
})
export class ApiMockInterceptor implements HttpInterceptor {
  private mock = JSON.parse(JSON.stringify(mockData))?.default;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (['content/', 'i18n/', 'websocket/tracker'].some(value => request.url.includes(value))) {
      return next.handle(request);
    }
    return this.handleRoute(request.method, request.url).pipe(delay(1000));
  }

  handleRoute(method: string, path: string): Observable<any> {
    const mockKey = `${method} => ${path}`;
    if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      return this.forbidden();
    }
    if (!Object.keys(this.mock).find(key => key?.match(key))) {
      return this.notFound();
    }

    return of(this.formulateResponse(this.mock[mockKey]));
  }

  private notFound(): Observable<any> {
    return throwError(new HttpErrorResponse({ status: 404, error: { message: 'Not found' } }));
  }

  private forbidden(): Observable<any> {
    return throwError(new HttpErrorResponse({ status: 403, error: { message: 'Forbidden' } }));
  }

  private formulateResponse(response: any): HttpResponse<any> | HttpErrorResponse {
    if (response['status'] >= 400) {
      return new HttpErrorResponse({ status: response['status'], error: response['error'] });
    }
    const headersObj = response['headers'] || {};
    const headers = Object.keys(headersObj).reduce((acc: HttpHeaders, key: string) => {
      acc = acc.set(key, `${headersObj[key]}`);
      return acc;
    }, new HttpHeaders());
    return new HttpResponse({
      status: response['status'],
      body: response['body'],
      headers,
    });
  }
}
