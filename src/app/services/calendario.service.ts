import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Calendario } from '../models/calendario';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http:HttpClient) { }


  urlApi:string = environment.API_URL+'/calendario';

  httpOptions = {headers: new HttpHeaders({
    "Content-Type":"application/json"
  })}

  get():Observable<Calendario>{


    return this.http.get<Calendario>(this.urlApi,this.httpOptions);
  }

  create(calendario:Calendario):Observable<Calendario>{

    return this.http.post<Calendario>(this.urlApi,calendario,this.httpOptions);
  }

  delete(id:number):Observable<void>{

    return this.http.delete<void>(`${this.urlApi}/${id}`,this.httpOptions);
  }

  extend(fechaFin:string):Observable<Calendario>{

    return this.http.post<Calendario>(`${this.urlApi}/agregarturnos/${fechaFin}`,this.httpOptions);
  }

  reduce(fechaFin:string):Observable<Calendario>{

    return this.http.put<Calendario>(`${this.urlApi}/eliminarturnos/${fechaFin}`,this.httpOptions);
  }


}
