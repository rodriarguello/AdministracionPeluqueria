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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/Interceptors/jwt.interceptor';



@NgModule({
  declarations: [
    DashboardComponent,
    TurnosComponent,
    LayoutComponent,
    CajaComponent,
    AlergiasComponent,
    ModalAlergiasComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  providers:
  [AlergiasService
  ]
})
export class LayoutModule { }
