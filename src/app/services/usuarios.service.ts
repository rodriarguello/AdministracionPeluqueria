import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credencial } from '../models/credencial.interface';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  urlApi:string = 'https://localhost:7026/api/cuentas';

  iniciarSesion(credenciales:Usuario):Observable<Credencial>{

    return this.http.post<Credencial>(`${this.urlApi}/login`,credenciales);

  }

  crearUsuario(credenciales:Usuario):Observable<Credencial>{

    return this.http.post<Credencial>(`${this.urlApi}/registrar`, credenciales);

  }


}
