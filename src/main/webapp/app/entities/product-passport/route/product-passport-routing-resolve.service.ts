import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProductPassport } from '../product-passport.model';
import { ProductPassportService } from '../service/product-passport.service';

export const productPassportResolve = (route: ActivatedRouteSnapshot): Observable<null | IProductPassport> => {
  const id = route.params['id'];
  if (id) {
    return inject(ProductPassportService)
      .find(id)
      .pipe(
        mergeMap((productPassport: HttpResponse<IProductPassport>) => {
          if (productPassport.body) {
            return of(productPassport.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default productPassportResolve;
