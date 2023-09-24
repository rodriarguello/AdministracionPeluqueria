import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosService } from './services/usuarios.service';
import { UtilidadService } from './services/utilidad.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './Interceptors/jwt.interceptor';
import { SpinnerInterceptor } from './Interceptors/spinner.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
   
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    UsuariosService,
    UtilidadService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi:true}
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
