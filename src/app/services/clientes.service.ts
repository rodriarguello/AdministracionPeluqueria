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

  mostrarClientes():Observable<ResponseApi>{

    return this.http.get<ResponseApi>(this.urlApi,this.httpOptions);

  }

  mostrarUnCliente(idCliente:number):Observable<ResponseApi>{

    return this.http.get<ResponseApi>(`${this.urlApi}/${idCliente}`,this.httpOptions);
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
