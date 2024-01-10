import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private snackBar:MatSnackBar) { }

  
  mostrarAlerta(mensaje:string,tipo:string){
    this.snackBar.open(mensaje,tipo,{
      horizontalPosition:"center",
      verticalPosition:"top",
      duration: 4000
    })
  }

  alertaExito(mensaje:string, titulo:string){
    Swal.fire(titulo,mensaje,'success');
  }

  alertaError(mensaje:string, titulo:string){
    Swal.fire(titulo,mensaje,'error');
  }

  


}
