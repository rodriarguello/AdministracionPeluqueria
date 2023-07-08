import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './Components/home/index/index.component';
import { AutenticacionGuard } from './seguridad/autenticacion.guard';


const routes: Routes = [
  
  {path:'', redirectTo: 'index',pathMatch:'full'},
  {path:'index', component:IndexComponent, pathMatch:'full'},
  {path:'pages', loadChildren:() => import('./Components/layout/layout.module').then(m => m.LayoutModule), canActivate:[AutenticacionGuard] },
  {path:'**', redirectTo:'index'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
