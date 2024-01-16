import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgregarMascota } from '../models/mascota/agregarMascota';
import { Mascota } from '../models/mascota/mascota';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private http:HttpClient) { }


  urlApi:string = environment.API_URL+'/mascotas';

  htttpOptions = {headers: new HttpHeaders({
    'Content-Type':'application/json'
  })}


  getAll():Observable<Mascota[]>{

    return this.http.get<Mascota[]>(this.urlApi,this.htttpOptions);
  }

  getById(id:number):Observable<Mascota>{
    
    return this.http.get<Mascota>(`${this.urlApi}/${id}`,this.htttpOptions);
  }

  create(mascota:AgregarMascota):Observable<Mascota>{

    return this.http.post<Mascota>(this.urlApi,mascota,this.htttpOptions);
  }

  update(id:number, mascota:AgregarMascota):Observable<Mascota>{

    return this.http.put<Mascota>(this.urlApi+'/'+id,mascota,this.htttpOptions);
  }

  delete(id:number):Observable<void>{

    return this.http.delete<void>(`${this.urlApi}/${id}`,this.htttpOptions);
  }
}
