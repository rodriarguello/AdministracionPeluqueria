import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TurnosComponent } from './Pages/turnos/turnos.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';

import { LayoutComponent } from './layout.component';
import { CajaComponent } from './Pages/caja/caja.component';
import { AlergiasComponent } from './Pages/alergias/alergias.component';
import { AlergiasService } from 'src/app/services/alergias.service';
import { ModalAlergiasComponent } from './modales/modal-alergias/modal-alergias.component';
import { ModalEnfermedadesComponent } from './modales/modal-enfermedades/modal-enfermedades.component';
import { EnfermedadesComponent } from './Pages/enfermedades/enfermedades.component';
import { EnfermedadesService } from 'src/app/services/enfermedades.service';


@NgModule({
  declarations: [
    DashboardComponent,
    TurnosComponent,
    LayoutComponent,
    CajaComponent,
    AlergiasComponent,
    ModalAlergiasComponent,
    ModalEnfermedadesComponent,
    EnfermedadesComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  providers:[
    AlergiasService,
    EnfermedadesService
  ]
})
export class LayoutModule { }
