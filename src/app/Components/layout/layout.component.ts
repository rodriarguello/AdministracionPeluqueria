import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private usuarioService:UsuariosService){

  }
  
  mostrarMascotas:boolean = false;
  mostrarEnfermedades:boolean = false;
  mostrarAlergias:boolean = false;
  mostrarRazas:boolean = false;
  mostrarClientes:boolean=false;

  cerrarSesion():void{

    this.usuarioService.cerrarSesion();

  }



}
