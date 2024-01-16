import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { TurnoModificar } from '../models/turno/turnoModificar';
import { environment } from 'src/environments/environment';
import { Turno } from '../models/turno/turno';
import { ResTurnosFiltrados } from '../models/turno/resTurnosFiltrados';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private http:HttpClient) { }

  urlApi:string = environment.API_URL+'/turnos';

  httpOptions={headers:new HttpHeaders({
    "Content-Type":"application/json"
  })};


  filtrarTurnos(idCalendario:number,fechaInicio:string,fechaFin:string):Observable<ResTurnosFiltrados>{

    return this.http.get<ResTurnosFiltrados>(`${this.urlApi}/filtrar/${idCalendario},${fechaInicio},${fechaFin}`,this.httpOptions);
  }


  mostrarTurnos(idCalendario:number):Observable<Turno[]>{

    return this.http.get<Turno[]>(`${this.urlApi}/${idCalendario}`, this.httpOptions);
  }

  reservarTurno(idTurno:number,turno:TurnoModificar):Observable<void>{
    
    return this.http.put<void>(`${this.urlApi}/reservar/${idTurno}`,turno,this.httpOptions);
  }

  cancelarTurno(idTurno:number):Observable<void>{
    
    return this.http.put<void>(`${this.urlApi}/cancelar/${idTurno}`,this.httpOptions);
  }

  modificarPrecio(idTurno:number, nuevoPrecio:number):Observable<void>{
     
    return this.http.put<void>(`${this.urlApi}/precio/${idTurno}`,nuevoPrecio,this.httpOptions);
  }

  modificarAsistencia(idTurno:number, asistencia:boolean):Observable<void>{

    return this.http.put<void>(`${this.urlApi}/asistencia/${idTurno}`,asistencia,this.httpOptions);
  }

}
