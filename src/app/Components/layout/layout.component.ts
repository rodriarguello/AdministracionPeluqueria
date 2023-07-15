import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  constructor(private usuarioService:UsuariosService,private router:Router){

  }
  ngOnInit(): void {
    
    this.obtenerDatosUsuario();
    this.router.navigate(['pages/dashboard']);
    this.datosUsuario$ = this.usuarioService.getDatosUsuario;
    
  }
  
  datosUsuario$!:Observable<Usuario>;

  cerrarSesion():void{

    this.usuarioService.cerrarSesion();

  }

  obtenerDatosUsuario(){

    if(localStorage.getItem('token')){
      
      this.usuarioService.obtenerDatosUsuario().subscribe();
      

    }
  }


}
