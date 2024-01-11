import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ResponseApi } from '../models/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }


  urlApi:string = environment.API_URL+'/clientes';

  httpOptions = {headers: new HttpHeaders({
    'Content-Type':'application/json'
  })

  };

  getAll():Observable<Cliente[]>{

    return this.http.get<Cliente[]>(this.urlApi,this.httpOptions);

  }

  getById(idCliente:number):Observable<Cliente>{

    return this.http.get<Cliente>(`${this.urlApi}/${idCliente}`,this.httpOptions);
  }
  
  create(cliente:Cliente):Observable<Cliente>{

    return this.http.post<Cliente>(this.urlApi,cliente,this.httpOptions);

  }

 
  update(cliente:Cliente):Observable<Cliente>{

    return this.http.put<Cliente>(this.urlApi+"/"+cliente.id,cliente,this.httpOptions);
  
  }

  
  delete(id:number):Observable<void>{

    return this.http.delete<void>(`${this.urlApi}/${id}`,this.httpOptions);
  
  }
  
}
