import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { 

  }


  urlApi:string = environment.API_URL+'/dashboard';

httpOptions={ headers:new HttpHeaders({
    'Content-Type':'application/json'
   
})}


resumenDiario():Observable<ResponseApi>{


  return this.http.get<ResponseApi>(this.urlApi, this.httpOptions);
  
}




}
