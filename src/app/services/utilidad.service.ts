import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor() { }

  alertaExito(mensaje:string, titulo:string){
    Swal.fire(titulo,mensaje,'success');
  }

  alertaError(mensaje:string, titulo:string){
    Swal.fire(titulo,mensaje,'error');
  }

  


}
