import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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

  datosUsuario$:Observable<Usuario>;
  @ViewChild('sideNav')private sideNav!:MatSidenav;


  constructor(private usuarioService:UsuariosService,private router:Router){

    this.datosUsuario$ = this.usuarioService.getDatosUsuario;
  }
  ngOnInit(): void {

    this.obtenerDatosUsuario();

    
    this.router.navigate(['pages/dashboard']);
    
  }
  

  cerrarSesion():void{

    this.usuarioService.cerrarSesion();

  }

  obtenerDatosUsuario():void{
      
      this.usuarioService.obtenerDatosUsuario().subscribe();
  }

  redireccionarA(ruta:string):void{

    this.router.navigate([ruta]);
    this.sideNav.toggle();

  }


}
