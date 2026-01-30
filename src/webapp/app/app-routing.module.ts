import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from './shared/constants/authority.constants';
import { UserRouteAccessService } from './core/auth/user-route-access-service';

const LAYOUT_ROUTES = [...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
          data: {
            authorities: [Authority.USER],
          },
          canActivate: [UserRouteAccessService],
        },
        {
          path: 'activate',
          loadChildren: () => import('./account/activate/activate.module').then(m => m.ActivateModule),
        },
        {
          path: 'account/reset/finish',
          loadChildren: () => import('./account/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
        },
        {
          path: 'auth',
          loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AdminDashboardAppRoutingModule {}
