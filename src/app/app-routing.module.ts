import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './Components/home/index/index.component';


const routes: Routes = [
  
  {path:'', component: IndexComponent, pathMatch:'full'},
  {path:'home', component:IndexComponent, pathMatch:'full'},

  //Proteger esta ruta
  {path:'pages', loadChildren:() => import('./Components/layout/layout.module').then(m => m.LayoutModule) }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
