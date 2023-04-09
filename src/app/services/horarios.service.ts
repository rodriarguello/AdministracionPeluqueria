import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http:HttpClient) { }

  urlApi:string = 'https://localhost:7026/api/horarios';

  httpOptions= {headers:new HttpHeaders({
    'Content-Type':'aplicattion/json'
  })}

  mostrarHorarios(idCalendario:number):Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}/${idCalendario}`,this.httpOptions);

  }


}
