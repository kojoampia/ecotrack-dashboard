import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmissionRecord } from '../emission-record.model';
import { EmissionRecordService } from '../service/emission-record.service';

export const emissionRecordResolve = (route: ActivatedRouteSnapshot): Observable<null | IEmissionRecord> => {
  const id = route.params['id'];
  if (id) {
    return inject(EmissionRecordService)
      .find(id)
      .pipe(
        mergeMap((emissionRecord: HttpResponse<IEmissionRecord>) => {
          if (emissionRecord.body) {
            return of(emissionRecord.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default emissionRecordResolve;
