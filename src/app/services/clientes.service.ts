import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ResponseApi } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }


  urlApi:string = "https://localhost:7026/api/clientes";

  httpOptions = {headers: new HttpHeaders({
    'Content-Type':'application/json'
  })

  };

  mostrarClientes():Observable<ResponseApi>{

    return this.http.get<ResponseApi>(this.urlApi,this.httpOptions);

  }
  
  agregarCliente(cliente:Cliente):Observable<ResponseApi>{

    return this.http.post<ResponseApi>(this.urlApi,cliente,this.httpOptions);

  }

 
  actualizarCliente(cliente:Cliente):Observable<ResponseApi>{

    return this.http.put<ResponseApi>(this.urlApi,cliente,this.httpOptions);
  
  }

  
  eliminarCliente(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.urlApi}/${id}`,this.httpOptions);
  
  }
  
}
