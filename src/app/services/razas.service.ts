import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raza } from '../models/raza';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  constructor(private http:HttpClient) { }


  urlApi:string = environment.API_URL+'/razas';

  httpOptions={headers: new HttpHeaders({
    'Content-Type':'application/json'})
  }

  getAll():Observable<Raza[]>{

    return this.http.get<Raza[]>(this.urlApi,this.httpOptions);

  }
    

  create(nombre:string):Observable<Raza>{
    const raza = {
      nombre
    }; 
    return this.http.post<Raza>(this.urlApi,raza,this.httpOptions);

  }

  update(raza:Raza):Observable<Raza>{


    return this.http.put<Raza>(this.urlApi+'/'+raza.id,raza,this.httpOptions);
  }

  delete(id:number):Observable<void>{

    return this.http.delete<void>(`${this.urlApi}/${id}`,this.httpOptions);
  }


}
