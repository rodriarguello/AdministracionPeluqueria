import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { ModalCalendarioComponent } from './modales-turnos/modal-crear-calendario/modal-crear-calendario.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { enteroAHoraPipe } from 'src/app/Reutilizable/enteroAHora.pipe';
import { FormatearMinutosPipe } from 'src/app/Reutilizable/formatear-minutos.pipe';
import { CalendarioService } from 'src/app/services/calendario.service';
import { CalendarioComponent } from './calendario/calendario.component';
import { TurnosService } from 'src/app/services/turnos.service';
import { ModalReservarTurnoComponent } from './modales-turnos/modal-reservar-turno/modal-reservar-turno.component';
import { ModalDetalleTurnoComponent } from './modales-turnos/modal-detalle-turno/modal-detalle-turno.component';
import { ModalDetalleCalendarioComponent } from './modales-turnos/modal-detalle-calendario/modal-detalle-calendario.component';
import { ModalModificarTurnosComponent } from './modales-turnos/modal-modificar-turnos/modal-modificar-turnos.component';
import { FormatearTituloFechasPipe } from 'src/app/Reutilizable/formatear-titulo-fechas.pipe';



@NgModule({
  declarations: [
    TurnosComponent,
    ModalCalendarioComponent,
    enteroAHoraPipe,
    FormatearMinutosPipe,
    CalendarioComponent,
    ModalReservarTurnoComponent,
    ModalDetalleTurnoComponent,
    ModalDetalleCalendarioComponent,
    ModalModificarTurnosComponent,
    FormatearTituloFechasPipe
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    SharedModule
    
  ],
  providers:[
    CalendarioService,
    TurnosService
  ]
})
export class TurnosModule { }
