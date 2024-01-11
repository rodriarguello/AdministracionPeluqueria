import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaCaja } from '../models/respuesta-caja';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http:HttpClient) {

   }

   urlApi:string =  environment.API_URL+'/caja';

  httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}


  getIngresoAnual(anio:number):Observable<RespuestaCaja>{

    return this.http.get<RespuestaCaja>(`${this.urlApi}/${anio}`, this.httpOptions);

  }

  getIngresoMensual(anio:number,mes:number):Observable<RespuestaCaja>{

    return this.http.get<RespuestaCaja>(`${this.urlApi}/${anio}/${mes}`, this.httpOptions);
  }

  getIngresoDiario(anio:number,mes:number,dia:number):Observable<RespuestaCaja>{

    return this.http.get<RespuestaCaja>(`${this.urlApi}/${anio}/${mes}/${dia}`, this.httpOptions);
  }

  
}
