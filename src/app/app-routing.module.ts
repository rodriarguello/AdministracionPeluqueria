import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  
  {path:'', component: AppComponent, pathMatch:'full'},
  {path:'home', component:AppComponent, pathMatch:'full'},
  {path:'pages', loadChildren:() => import('./Components/layout/layout.module').then(m => m.LayoutModule) },
  {path:'**', redirectTo:'home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
