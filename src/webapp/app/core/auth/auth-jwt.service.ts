import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { SERVER_API_URL, ECO_DASHBOARD_URL } from 'app/app.constants';
import { Login } from 'app/core/login/login.model';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(SERVER_API_URL + '/api/authenticate', credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      this.$localStorage.clear('generalWebAuthenticationToken');
      this.$sessionStorage.clear('generalWebAuthenticationToken');
      this.$localStorage.clear('credentials');
      this.$sessionStorage.clear('credentials');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

  /** AUTHENTICATING ON GENERAL WEB FOR WEBSOCKET CONNECTION **/

  generalWebLogin(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(ECO_DASHBOARD_URL + '/api/authenticate', credentials)
      .pipe(map(response => this.generalWebAuthenticateSuccess(response, credentials.rememberMe)));
  }

  getGeneralWebToken(): string {
    return (
      this.$localStorage.retrieve('generalWebAuthenticationToken') || this.$sessionStorage.retrieve('generalWebAuthenticationToken') || ''
    );
  }

  private generalWebAuthenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      this.$localStorage.store('generalWebAuthenticationToken', jwt);
    } else {
      this.$sessionStorage.store('generalWebAuthenticationToken', jwt);
    }
  }
}
