import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarClienteComponent } from './actualizar-cliente/actualizar-cliente.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ClientesComponent } from './clientes.component';
import { EliminarClienteComponent } from './eliminar-cliente/eliminar-cliente.component';
import { IndexClienteComponent } from './index-cliente/index-cliente.component';

const routes: Routes = [
  {path:'', component:ClientesComponent, children:[
    {path:'index',component:IndexClienteComponent},
    {path:'agregar',component:AgregarClienteComponent},
    {path:'actualizar',component:ActualizarClienteComponent},
    {path:'eliminar',component:EliminarClienteComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
