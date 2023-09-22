import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raza } from '../models/raza';
import { ResponseApi } from '../models/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  constructor(private http:HttpClient) { }


  urlApi:string = environment.API_URL+'/razas';

  httpOptions={headers: new HttpHeaders({
    'Content-Type':'application/json'})
  }

  mostrarRazas():Observable<ResponseApi>{

    return this.http.get<ResponseApi>(this.urlApi,this.httpOptions);

  }
    

  cargarRaza(nombre:string):Observable<ResponseApi>{
    const raza = new Raza();
    raza.nombre = nombre;
    return this.http.post<ResponseApi>(this.urlApi,raza,this.httpOptions);

  }

  modificarRaza(raza:Raza):Observable<ResponseApi>{


    return this.http.put<ResponseApi>(this.urlApi,raza,this.httpOptions);
  }

  eliminarRaza(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`,this.httpOptions);
  }


}
