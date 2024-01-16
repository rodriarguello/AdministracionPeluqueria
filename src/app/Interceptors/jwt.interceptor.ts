import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable,tap, take } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private usuarioService:UsuariosService, private router:Router) {

  }
  token:string|null = null;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    this.usuarioService.getToken.pipe(take(1)).subscribe({
      next:(res)=> this.token = res
    });

   if(this.token !== null) {
    request = request.clone({

      setHeaders:{
        Authorization : `Bearer ${this.token}`
      }

    });
   }
   
   
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        
        
        return event;
      }, 
      (error)=>{
        if(error.status ==401){

          localStorage.removeItem('token');
          this.usuarioService.setToken = null!;
          this.router.navigate(['index']);

        }
      })
    );
  }
}
