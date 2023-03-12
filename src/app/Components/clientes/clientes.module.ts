import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';
import { EliminarClienteComponent } from './eliminar-cliente/eliminar-cliente.component';
import {ClientesComponent} from './clientes.component';
import { IndexClienteComponent } from './index-cliente/index-cliente.component';


@NgModule({
  declarations: [
    AgregarClienteComponent,
    ActualizarClienteComponent,
    EliminarClienteComponent,
    ClientesComponent,
    IndexClienteComponent
    
    
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    
  ]
})
export class ClientesModule { }
