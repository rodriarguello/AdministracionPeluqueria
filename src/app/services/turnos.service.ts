import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { TurnoModificar } from '../models/turno/turnoModificar';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private http:HttpClient) { }

  urlApi:string = 'https://localhost:7026/api/turnos';

  httpOptions={headers:new HttpHeaders({
    "Content-Type":"application/json"
  })};


  filtrarTurnos(idCalendario:number,fechaInicio:string,fechaFin:string):Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}/filtrar/${idCalendario},${fechaInicio},${fechaFin}`,this.httpOptions);
  }


  mostrarTurnos(idCalendario:number):Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}/${idCalendario}`, this.httpOptions);
  }

  reservarTurno(idTurno:number,turno:TurnoModificar):Observable<ResponseApi>{
    
    return this.http.put<ResponseApi>(`${this.urlApi}/reservar/${idTurno}`,turno,this.httpOptions);
  }

  cancelarTurno(idTurno:number):Observable<ResponseApi>{
    
    return this.http.put<ResponseApi>(`${this.urlApi}/cancelar/${idTurno}`,this.httpOptions);
  }

  modificarPrecio(idTurno:number, nuevoPrecio:number):Observable<ResponseApi>{
     
    return this.http.put<ResponseApi>(`${this.urlApi}/precio/${idTurno}`,nuevoPrecio,this.httpOptions);
  }

  modificarAsistencia(idTurno:number, asistencia:boolean):Observable<ResponseApi>{

    return this.http.put<ResponseApi>(`${this.urlApi}/asistencia/${idTurno}`,asistencia,this.httpOptions);
  }


}
