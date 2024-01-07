import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alergia } from '../models/alergia';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlergiasService {


  constructor(private http:HttpClient) { }

 



urlApi:string = environment.API_URL+'/alergias';

httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
   
})}



  getAll():Observable<Alergia[]>{

    return this.http.get<Alergia[]>(this.urlApi, this.httpOptions);
  }

  create(nombre:string):Observable<Alergia>{

    const alergia:Alergia = {
      nombre
    } 
    return this.http.post<Alergia>(this.urlApi, alergia,this.httpOptions);
  }

  update(alergia:Alergia): Observable<Alergia>{

    return this.http.put<Alergia>(this.urlApi+"/"+alergia.id,alergia,this.httpOptions);

  }

  delete(id:number):Observable<void>{

    return this.http.delete<void>(`${this.urlApi}/${id}`,this.httpOptions);
  }

}
