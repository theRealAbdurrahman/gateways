import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/gateways', pathMatch: 'full' },
  {
    path: 'gateways',
    loadChildren: () =>
      import('./gateways/gateaways.module').then((m) => m.GateawaysModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
