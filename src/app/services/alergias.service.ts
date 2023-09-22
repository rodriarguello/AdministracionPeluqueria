import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alergia } from '../models/alergia';
import { ResponseApi } from '../models/response-api';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlergiasService {


  constructor(private http:HttpClient) { }

 



urlApi:string = environment.API_URL+'/alergias';

httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
   
})}



  mostrarAlergias():Observable<ResponseApi>{

    return this.http.get<ResponseApi>(this.urlApi, this.httpOptions);
  }

  cargarAlergia(nombre:string):Observable<ResponseApi>{

    const alergia = new Alergia();
    alergia.nombre = nombre;

    return this.http.post<ResponseApi>(this.urlApi, alergia,this.httpOptions);
  }

  modificarAlergia(alergia:Alergia): Observable<ResponseApi>{

    return this.http.put<ResponseApi>(this.urlApi,alergia,this.httpOptions);

  }

  eliminarAlergia(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`,this.httpOptions);
  }

}
