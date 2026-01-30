import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../../shared/services/loading.service';
import { ToastService } from '../../shared/services/toast.service';
import { ToastData } from '../../shared/services/toast/toast.component';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService, private toastService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (error: HttpErrorResponse) => {
        this.loadingService.hide();
        if (!(error.status === 401 && (error.message === '' || (error.url && error.url.includes('api/account'))))) {
          this.toastService.open({ type: 'error', message: error.message } as ToastData, 5000);
        }
      })
    );
  }
}
