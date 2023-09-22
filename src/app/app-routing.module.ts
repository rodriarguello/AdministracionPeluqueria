import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './modules/Home/index/index.component';
import { AutenticacionGuard } from './seguridad/autenticacion.guard';


const routes: Routes = [
  
  {path:'', redirectTo: 'index',pathMatch:'full'},
  {path:'index', loadChildren:()=>import('./modules/Home/home.module').then(m=>m.HomeModule)},
  {path:'pages', loadChildren:() => import('./modules/Layout/layout.module').then(m => m.LayoutModule), canActivate:[AutenticacionGuard] },
  {path:'**', redirectTo:'index'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
