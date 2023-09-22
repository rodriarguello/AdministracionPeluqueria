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


  mostrarEnfermedades():Observable<ResponseApi>{

  return this.http.get<ResponseApi>(this.urlApi,this.httpOptions);

  }

  cargarEnfermedad(nombre:string):Observable<ResponseApi>{

    const enfermedad = new Enfermedad();
    enfermedad.nombre = nombre;

    return this.http.post<ResponseApi>(this.urlApi,enfermedad, this.httpOptions);
  }

  modificarEnfermedad(enfermedad:Enfermedad):Observable<ResponseApi>{


    return this.http.put<ResponseApi>(this.urlApi, enfermedad,this.httpOptions);

  }

  eliminarEnfermedad(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`, this.httpOptions);

  }

}
