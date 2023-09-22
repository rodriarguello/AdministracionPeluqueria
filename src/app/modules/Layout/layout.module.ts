import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from '../../modules/Layout/Pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';

import { LayoutComponent } from './layout.component';
import { CajaComponent } from './Pages/caja/caja.component';
import { AlergiasComponent } from '../../modules/Layout/Pages/alergias/alergias.component';
import { AlergiasService } from 'src/app/services/alergias.service';
import { ModalAlergiasComponent } from '../../modules/Layout/modales/modal-alergias/modal-alergias.component';
import { ModalEnfermedadesComponent } from '../../modules/Layout/modales/modal-enfermedades/modal-enfermedades.component';
import { EnfermedadesComponent } from '../../modules/Layout/Pages/enfermedades/enfermedades.component';
import { EnfermedadesService } from 'src/app/services/enfermedades.service';
import { ModalRazasComponent } from '../../modules/Layout/modales/modal-razas/modal-razas.component';
import { RazasComponent } from '../../modules/Layout/Pages/razas/razas.component';
import { ModalClientesComponent } from '../../modules/Layout/modales/modal-clientes/modal-clientes.component';
import { ClientesComponent } from '../../modules/Layout/Pages/clientes/clientes.component';
import { MascotasComponent } from '../../modules/Layout/Pages/mascotas/mascotas.component';
import { ModalMascotasComponent } from '../../modules/Layout/modales/modal-mascotas/modal-mascotas.component';
import { ModalMascotasDetalleComponent } from '../../modules/Layout/modales/modal-mascotas-detalle/modal-mascotas-detalle.component';
import { ModalClienteDetalleComponent } from '../../modules/Layout/modales/modal-cliente-detalle/modal-cliente-detalle.component';
import { ModalTurnosClienteComponent } from '../../modules/Layout/modales/modal-turnos-cliente/modal-turnos-cliente.component';
import { ResumenCajaAnualComponent } from '../../modules/Layout/Pages/caja/resumen-caja-anual/resumen-caja-anual.component';
import { ResumenCajaMensualComponent } from './Pages/caja/resumen-caja-mensual/resumen-caja-mensual.component';
import { ResumenCajaDiarioComponent } from './Pages/caja/resumen-caja-diario/resumen-caja-diario.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    CajaComponent,
    AlergiasComponent,
    ModalAlergiasComponent,
    ModalEnfermedadesComponent,
    EnfermedadesComponent,
    ModalRazasComponent,
    RazasComponent,
    ModalClientesComponent,
    ClientesComponent,
    MascotasComponent,
    ModalMascotasComponent,
    ModalMascotasDetalleComponent,
    ModalClienteDetalleComponent,
    ModalTurnosClienteComponent,
    ResumenCajaAnualComponent,
    ResumenCajaMensualComponent,
    ResumenCajaDiarioComponent
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
