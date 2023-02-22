import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TurnosComponent } from './Pages/turnos/turnos.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { LayoutComponent } from './layout.component';
import { ClientesComponent } from './Pages/clientes/clientes.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TurnosComponent,
    ClientesComponent
    
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
