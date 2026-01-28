import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ProductPassportComponent } from './list/product-passport.component';
import { ProductPassportDetailComponent } from './detail/product-passport-detail.component';
import { ProductPassportUpdateComponent } from './update/product-passport-update.component';
import ProductPassportResolve from './route/product-passport-routing-resolve.service';

const productPassportRoute: Routes = [
  {
    path: '',
    component: ProductPassportComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductPassportDetailComponent,
    resolve: {
      productPassport: ProductPassportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductPassportUpdateComponent,
    resolve: {
      productPassport: ProductPassportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductPassportUpdateComponent,
    resolve: {
      productPassport: ProductPassportResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default productPassportRoute;
