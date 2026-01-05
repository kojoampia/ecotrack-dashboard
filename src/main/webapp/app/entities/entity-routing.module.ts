import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        data: { pageTitle: 'ecoTrackProApp.product.home.title' },
        loadChildren: () => import('./product/product.routes'),
      },
      {
        path: 'supplier',
        data: { pageTitle: 'ecoTrackProApp.supplier.home.title' },
        loadChildren: () => import('./supplier/supplier.routes'),
      },
      {
        path: 'emission-record',
        data: { pageTitle: 'ecoTrackProApp.emissionRecord.home.title' },
        loadChildren: () => import('./emission-record/emission-record.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
