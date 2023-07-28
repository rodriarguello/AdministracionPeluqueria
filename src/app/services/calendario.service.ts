import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { Calendario } from '../models/calendario';
@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http:HttpClient) { }


  urlApi:string = 'https://localhost:7026/api/calendario';

  httpOptions = {headers: new HttpHeaders({
    "Content-Type":"application/json"
  })}

  mostrarCalendario():Observable<ResponseApi>{


    return this.http.get<ResponseApi>(this.urlApi,this.httpOptions);
  }

  crearCalendario(calendario:Calendario):Observable<ResponseApi>{

    return this.http.post<ResponseApi>(this.urlApi,calendario,this.httpOptions);
  }

  eliminarCalendario(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`,this.httpOptions);
  }

  agregarTurnos(fechaFin:string):Observable<ResponseApi>{

    return this.http.post<ResponseApi>(`${this.urlApi}/agregarturnos/${fechaFin}`,this.httpOptions);
  }

  eliminarTurnos(fechaFin:string):Observable<ResponseApi>{

    return this.http.put<ResponseApi>(`${this.urlApi}/eliminarturnos/${fechaFin}`,this.httpOptions);
  }


}
