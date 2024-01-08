import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfermedad } from '../models/enfermedad';
import { ResponseApi } from '../models/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadesService {

  constructor(private http:HttpClient) { }


  urlApi:string = environment.API_URL+'/enfermedades';

  httpOptions = {headers: new HttpHeaders({
    'Content-Type':'application/json'
  })};

  getAll():Observable<Enfermedad[]>{

  return this.http.get<Enfermedad[]>(this.urlApi,this.httpOptions);
  }

  create(nombre:string):Observable<Enfermedad>{
    const enfermedad = {
      nombre
    } 
    return this.http.post<Enfermedad>(this.urlApi,enfermedad, this.httpOptions);
  }

  update(enfermedad:Enfermedad):Observable<Enfermedad>{
    return this.http.put<Enfermedad>(this.urlApi+'/'+enfermedad.id, enfermedad,this.httpOptions);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlApi}/${id}`, this.httpOptions);
  }

}
