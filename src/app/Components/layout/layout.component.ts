import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    this.router.navigate(['pages/dashboard']);
    
  }
  

  cerrarSesion():void{

    this.usuarioService.cerrarSesion();

  }



}
