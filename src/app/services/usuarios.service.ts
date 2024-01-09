import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Usuario } from '../models/usuario';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Credenciales } from '../models/credenciales';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient, private router:Router) { 

    this.token = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')! || null!));
    

    this.datosUsuario = new BehaviorSubject<Usuario>(null!);


  }

  urlApi:string = environment.API_URL+'/cuentas';

  httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}


  private token:BehaviorSubject<string>;

  private datosUsuario:BehaviorSubject<Usuario>;

  public get getDatosUsuario():Observable<Usuario>{
     return this.datosUsuario.asObservable();
  }

  public set setDatosUsuario(usuario:Usuario){
    this.datosUsuario.next(usuario);
  }

  public get getToken():Observable<string>{
    return this.token.asObservable();
  }

  public set setToken(value:string){
    this.token.next(value);
  }
  

  registro(credenciales:Usuario):Observable<void>{

    return this.http.post<void>(`${this.urlApi}/registrar`, credenciales,this.httpOptions);

  }

  login(email:string, password:string):Observable<Credenciales>{

    const credenciales = {
      email,
      password
    }

    return this.http.post<Credenciales>(`${this.urlApi}/login`,credenciales,this.httpOptions).pipe(
      map(res=>{
          localStorage.setItem('token',JSON.stringify(res.token));

          this.token.next(res.token);
          this.datosUsuario.next(res.usuario);
        return res;
      })
    );

  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.token.next(null!);
    this.router.navigate(['home']);
    
  }


  obtenerDatosUsuario():Observable<Usuario>{
    
    return this.http.get<Usuario>(this.urlApi, this.httpOptions).pipe(
      map(res=>{
        this.setDatosUsuario = res
        return res;
      })
    );
  
  }

}
