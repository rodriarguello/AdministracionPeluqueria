import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Credencial } from '../models/credencial.interface';
import { Usuario } from '../models/usuario';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResponseApi } from '../models/response-api';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient, private router:Router) { 

    this.credUsuarioSubject = new BehaviorSubject<Credencial>(JSON.parse(localStorage.getItem('token')!));
    const usuario = new Usuario();

    this.datosUsuario = new BehaviorSubject<Usuario>(usuario);


  }

  urlApi:string = 'https://localhost:7026/api/cuentas';

  httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}


  private credUsuarioSubject:BehaviorSubject<Credencial>;

  private datosUsuario:BehaviorSubject<Usuario>;

  public get getDatosUsuario():Observable<Usuario>{
     return this.datosUsuario.asObservable();
  }

  public set setDatosUsuario(usuario:Usuario){
    this.datosUsuario.next(usuario);
  }

  public get getCredencialesUsuario():Credencial{
    return this.credUsuarioSubject.value;
  }

  public set setCredencialesUsuario(value:any){
    this.credUsuarioSubject.next(value);
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
        else{
          console.log(res);
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


  obtenerDatosUsuario():Observable<ResponseApi>{
    
    return this.http.get<ResponseApi>(this.urlApi, this.httpOptions).pipe(
      map(res=>{

        this.setDatosUsuario = res.data

        
        
        return res;
      })
    );
  
  }

}
