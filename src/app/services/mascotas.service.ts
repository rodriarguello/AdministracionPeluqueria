import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarMascota } from '../models/agregarMascota';
import { Mascota } from '../models/mascota';
import { ResponseApi } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private http:HttpClient) { }


  urlApi:string='https://localhost:7026/api/mascotas';

  htttpOptions = {headers: new HttpHeaders({
    'Content-Type':'application/json'
  })}


  mostrarMascotas():Observable<ResponseApi>{

    return this.http.get<ResponseApi>(this.urlApi,this.htttpOptions);
  }

  mostrarUnaMascota(id:number):Observable<ResponseApi>{
    
    return this.http.get<ResponseApi>(`${this.urlApi}/${id}`,this.htttpOptions);
  }

  agregarMascota(mascota:AgregarMascota):Observable<ResponseApi>{

    return this.http.post<ResponseApi>(this.urlApi,mascota,this.htttpOptions);
  }

  actualizarMascota(mascota:Mascota):Observable<ResponseApi>{

    return this.http.put<ResponseApi>(this.urlApi,mascota,this.htttpOptions);
  }

  eliminarMascota(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`,this.htttpOptions);
  }
}
