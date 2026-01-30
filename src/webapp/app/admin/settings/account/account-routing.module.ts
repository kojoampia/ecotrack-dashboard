import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAccountComponent } from './view/view-account.component';
import { EditAccountComponent } from './edit/edit-account.component';

export const routes: Routes = [
  { path: '', component: ViewAccountComponent },
  { path: 'edit', component: EditAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
