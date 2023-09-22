import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosComponent } from './turnos.component';
import { CalendarioComponent } from './calendario/calendario.component';


const routes: Routes = [
  { path:'', component:TurnosComponent},
  {path:'calendario', component:CalendarioComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
