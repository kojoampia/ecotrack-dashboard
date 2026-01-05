import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { EmissionRecordComponent } from './list/emission-record.component';
import { EmissionRecordDetailComponent } from './detail/emission-record-detail.component';
import { EmissionRecordUpdateComponent } from './update/emission-record-update.component';
import EmissionRecordResolve from './route/emission-record-routing-resolve.service';

const emissionRecordRoute: Routes = [
  {
    path: '',
    component: EmissionRecordComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmissionRecordDetailComponent,
    resolve: {
      emissionRecord: EmissionRecordResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmissionRecordUpdateComponent,
    resolve: {
      emissionRecord: EmissionRecordResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmissionRecordUpdateComponent,
    resolve: {
      emissionRecord: EmissionRecordResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default emissionRecordRoute;
