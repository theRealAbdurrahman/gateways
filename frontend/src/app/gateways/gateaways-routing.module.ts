import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GateawaysListComponent } from './components/containers/gateaways-list/gateaways-list.component';
import { GatewayDetailsComponent } from './components/containers/gateway-details/gateway-details.component';

const routes: Routes = [
  { path: '', component: GateawaysListComponent },
  {
    path: ':serial',
    component: GatewayDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GateawaysRoutingModule {}
