import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  constructor(private router:Router, private usuarioService:UsuariosService){

    this.mostrarLogin = false;
    this.mostrarRegistro = false;
    this.abrirMenu = false;
  }
  ngOnInit(): void {

    this.obtenerDatosUsuario();
    
  }
  abrirMenu:boolean;
  mostrarLogin:boolean;
  mostrarRegistro:boolean;


  obtenerDatosUsuario(){

    if(localStorage.getItem('token')){
      
      this.usuarioService.obtenerDatosUsuario().subscribe({

        next:()=>{
            
          this.router.navigate(['/pages']);
          
        },
        error:()=>{

        }
        
      }
      );
    }
  }

  irLogin():void{
    this.mostrarLogin = true;
    this.abrirMenu = false;
  }

  irRegistro():void{
    this.mostrarRegistro = true;
    this.abrirMenu = false;
  }

}
