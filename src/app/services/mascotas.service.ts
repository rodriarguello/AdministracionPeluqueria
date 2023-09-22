import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarMascota } from '../models/mascota/agregarMascota';
import { Mascota } from '../models/mascota/mascota';
import { ResponseApi } from '../models/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private http:HttpClient) { }


  urlApi:string = environment.API_URL+'/mascotas';

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
