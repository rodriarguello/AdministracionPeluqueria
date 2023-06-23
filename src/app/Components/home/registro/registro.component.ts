import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

formularioRegistro:FormGroup;
ocultarPassword:boolean;

constructor(private router:Router,private fb:FormBuilder, private usuarioService:UsuariosService, private utilidadService:UtilidadService){

  this.formularioRegistro = fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  this.ocultarPassword = true;
}
  ngOnInit(): void {

    this.validarToken();
  }


nuevoUsuario(){

const usuario = new Usuario(this.formularioRegistro.value.email,this.formularioRegistro.value.password);

this.usuarioService.crearUsuario(usuario).subscribe({
  next: (res)=>{
    
    this.utilidadService.mostrarAlerta("Registro Exitoso", "REGISTRO");
    this.formularioRegistro.patchValue({
      email:'',
      password:''
    });

    this.formularioRegistro.reset();
    
    setTimeout(() => {
      
      this.router.navigate(['index']);
    }, 2000);
    
  },
  error:()=>{
   this.utilidadService.mostrarAlerta("Error al registrarse","REGISTRO");
  }
});

}

validarToken(){
  this.usuarioService.validarToken().subscribe({
    next:()=>{
      this.router.navigate(['pages']);
    },
    error:()=>{

    }
  });
}


}
