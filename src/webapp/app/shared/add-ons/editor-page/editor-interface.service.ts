import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const EDITOR_SERVICE = new InjectionToken<EditorInterfaceService>('EDITOR_SERVICE');

export interface EditorInterfaceService {
  get(id: string): Observable<any>;

  create(page: any): Observable<any>;

  update(page: any): Observable<any>;

  delete(id: string): Observable<any>;
}
