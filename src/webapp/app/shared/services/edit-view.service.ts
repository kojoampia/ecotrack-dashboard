import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class EditViewService {

  private status = new BehaviorSubject(false);
  sharedStatus = this.status.asObservable();

  constructor() { }

  nextStatus(status: boolean): void {
    this.status.next(status)
  }
  
}