import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alergia } from '../models/alergia';
import { ResponseApi } from '../models/response-api';


@Injectable({
  providedIn: 'root'
})
export class AlergiasService {


  //#region Constructor
  constructor(private http:HttpClient) { }

//#endregion
 



urlApi:string = 'https://localhost:7026/api/alergias';

  httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}



  mostrarAlergias():Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}`, this.httpOptions);
  }

  cargarAlergia(nombre:string):Observable<ResponseApi>{

    return this.http.post<ResponseApi>(this.urlApi, nombre,this.httpOptions);
  }

  modificarAlergia(alergia:Alergia): Observable<ResponseApi>{

    return this.http.put<ResponseApi>(this.urlApi,this.httpOptions);

  }

  eliminarAlergia(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`,this.httpOptions);
  }

}
