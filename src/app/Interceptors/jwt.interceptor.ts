import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private usuarioService:UsuariosService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const credencialesUsuario = this.usuarioService.credencialesUsuario;
   if(credencialesUsuario) {
    request = request.clone({

      setHeaders:{
        Authorization : `Bearer ${credencialesUsuario.token}`
      }

    });
   }
   
   
    return next.handle(request);
  }
}
