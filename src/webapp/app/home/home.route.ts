import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { Authority } from '../shared/constants/authority.constants';
import { UserRouteAccessService } from '../core/auth/user-route-access-service';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        data: {
          authorities: [Authority.ADMIN],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'visitors',
        loadChildren: () => import('../pages/visitors/visitors.module').then(m => m.VisitorsModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('../pages/sales/sales.module').then(m => m.SalesModule),
      },
      {
        path: 'tariffs',
        loadChildren: () => import('../pages/tariffs/tariffs.module').then(m => m.TariffsModule),
      },
      {
        path: 'catalog',
        loadChildren: () => import('../pages/catalog/catalog.module').then(m => m.CatalogModule),
      },
      {
        path: 'agents',
        loadChildren: () => import('../pages/agent/eco-agent.module').then(m => m.BedrockAgentModule),
      },
      {
        path: 'brokers',
        loadChildren: () => import('../pages/broker/eco-broker.module').then(m => m.BedrockBrokerModule),
      },
      {
        path: 'claims',
        loadChildren: () => import('../pages/customer-claim/customer-claim.module').then(m => m.CustomerClaimModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('../pages/reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'nicb',
        loadChildren: () => import('../pages/nic/nic.module').then(m=>m.NicModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('../pages/messages/messages.module').then(m => m.MessagesModule),
      },
      {
        path: 'reviews',
        loadChildren: () => import('../pages/reviews/reviews.module').then(m => m.ReviewsModule),
      },
      {
        path: 'configuration',
        loadChildren: () => import('../pages/configuration/configuration.module').then(m => m.ConfigurationModule),
      },
      {
        path: 'account',
        loadChildren: () => import('../admin/settings/account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'change-password',
        loadChildren: () => import('../admin/settings/change-password/change-password.module').then(m => m.ChangePasswordModule),
      },
      {
        path: 'admin',
        data: {
          authorities: [Authority.ADMIN],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('../admin/admin-routing.module').then(m => m.AdminRoutingModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
