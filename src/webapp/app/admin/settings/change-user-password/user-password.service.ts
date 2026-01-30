import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class UserPasswordService {
  constructor(private http: HttpClient) {}

  save(newPassword: string, email: string): Observable<{}> {
    return this.http.post(SERVER_API_URL + '/api/account/reset-password', { email, newPassword });
  }
}
