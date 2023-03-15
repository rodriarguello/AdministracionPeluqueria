import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Reutilizable/shared/shared.module';
import { IndexComponent } from './Components/home/index/index.component';
import { LoginComponent } from './Components/home/login/login.component';
import { UsuariosService } from './services/usuarios.service';
import { UtilidadService } from './services/utilidad.service';
import { RegistroComponent } from './Components/home/registro/registro.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './Interceptors/jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegistroComponent,
   
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    UsuariosService,
    UtilidadService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
