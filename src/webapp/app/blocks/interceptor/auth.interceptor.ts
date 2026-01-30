import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { ECO_DASHBOARD_URL } from '../../app.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (ECO_DASHBOARD_URL && request.url.startsWith(ECO_DASHBOARD_URL)) {
      const token =
        this.localStorage.retrieve('generalWebAuthenticationToken') || this.sessionStorage.retrieve('generalWebAuthenticationToken');
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
          },
        });
      }
      return next.handle(request);
    }

    if (!request || !request.url || (request.url.startsWith('http') && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
      return next.handle(request);
    }

    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }
    return next.handle(request);
  }
}
