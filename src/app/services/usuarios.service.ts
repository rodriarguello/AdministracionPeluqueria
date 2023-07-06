import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credencial } from '../models/credencial.interface';
import { Usuario } from '../models/usuario';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient, private router:Router) { 

    this.credUsuarioSubject = new BehaviorSubject<Credencial>(JSON.parse(localStorage.getItem('token')!));


  }

  urlApi:string = 'https://localhost:7026/api/cuentas';

  httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}


  private credUsuarioSubject:BehaviorSubject<Credencial>;

  public get credencialesUsuario():Credencial{
    return this.credUsuarioSubject.value;
  }
  

  crearUsuario(credenciales:Usuario):Observable<Credencial>{

    return this.http.post<Credencial>(`${this.urlApi}/registrar`, credenciales,this.httpOptions);

  }

  iniciarSesion(credenciales:Usuario):Observable<Credencial>{

    return this.http.post<Credencial>(`${this.urlApi}/login`,credenciales,this.httpOptions).pipe(
      map(res=>{
        if(res.token != null){
          const credenciales:Credencial = res;

          localStorage.setItem('token',JSON.stringify(credenciales));

          this.credUsuarioSubject.next(credenciales);
        }
        return res;
      })
    );

  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.credUsuarioSubject.next(null!);
    this.router.navigate(['home']);
    
  }


  validarToken():Observable<boolean>{
    
    return this.http.get<boolean>(`${this.urlApi}/validacion`, this.httpOptions);
  
  }

}
