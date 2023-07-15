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

    this.mostrarLogin = true;
  }
  ngOnInit(): void {

    this.obtenerDatosUsuario();
    
  }

  mostrarLogin!:boolean;


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

}
