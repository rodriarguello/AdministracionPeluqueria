
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credencial } from '../models/credencial.interface';
import { Usuario } from '../models/usuario';


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

  guardarSesionUsuario(token:Credencial):void{

    localStorage.setItem("tokenUsuario",JSON.stringify(token));
  }

  obtenerSesionUsuario():Credencial{

    const dataUsuario = localStorage.getItem("tokenUsuario");

    const tokenUsuario= JSON.parse(dataUsuario!);

    return tokenUsuario;
  }

  eliminarSesionUsuario():void{
    
    localStorage.removeItem("tokenUsuario");
  }


}
