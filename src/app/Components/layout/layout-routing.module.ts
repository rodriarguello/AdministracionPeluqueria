import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

import { CajaComponent } from './Pages/caja/caja.component';
import { ClientesComponent } from '../clientes/clientes.component';

import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { EnfermedadesComponent } from './Pages/enfermedades/enfermedades.component';
import { MascotasComponent } from './Pages/mascotas/mascotas.component';
import { RazasComponent } from './Pages/razas/razas.component';
import { TurnosComponent } from './Pages/turnos/turnos.component';
import { AlergiasComponent } from './Pages/alergias/alergias.component';

const routes: Routes = [
  { path: '', component: LayoutComponent,
  children:[
    {path:'dashboard', component: DashboardComponent},
    {path:'turnos', component: TurnosComponent},
    {path:'clientes',loadChildren:()=> import('../clientes/clientes.module').then(m=>m.ClientesModule)},
    {path:'alergias',component:AlergiasComponent},
    {path:'caja', component:CajaComponent},
    {path:'mascotas', component:MascotasComponent},
    {path:'enfermedades',component:EnfermedadesComponent},
    
    {path:'razas', component:RazasComponent}
  ]},
  { path:'**', redirectTo:'dashboard'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
