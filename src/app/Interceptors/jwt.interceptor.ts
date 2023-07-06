import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private usuarioService:UsuariosService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const credencialesUsuario = this.usuarioService.credencialesUsuario;
   if(credencialesUsuario) {
    request = request.clone({

      setHeaders:{
        Authorization : `Bearer ${JSON.parse(localStorage.getItem('token')!).token}`
      }

    });
   }
   
   
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        
        
        return event;
      }, 
      (error)=>{
        if(error.status ==401){
          
          this.router.navigate(['index']);

        }
      })
    );
  }
}
