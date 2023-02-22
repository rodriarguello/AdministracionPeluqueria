import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ClientesComponent } from './Pages/clientes/clientes.component';

import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TurnosComponent } from './Pages/turnos/turnos.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children:[
    {path:'dashboard', component: DashboardComponent},
    {path:'turnos', component: TurnosComponent},
    {path:'clientes',component:ClientesComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
