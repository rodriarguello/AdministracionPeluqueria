import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

constructor(fb:FormBuilder, private usuarioService:UsuariosService, private utilidadService:UtilidadService){

  this.formularioRegistro = fb.group({
    nombres:['',Validators.required],
    apellido:['',Validators.required],
    nombrePeluqueria:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    password:['',Validators.required]

  })
  this.ocultarPassword = true;
}
  ngOnInit(): void {


  }

  @Output() mostrarRegistro = new EventEmitter<boolean>();
  @Output() mostrarLogin = new EventEmitter<boolean>();

registrarUsuario():void{

const usuario = new Usuario();

usuario.email = this.formularioRegistro.value.email;

usuario.password = this.formularioRegistro.value.password;

usuario.nombres = this.formularioRegistro.value.nombres;

usuario.apellido = this.formularioRegistro.value.apellido;

usuario.nombrePeluqueria = this.formularioRegistro.value.nombrePeluqueria;

this.usuarioService.crearUsuario(usuario).subscribe({
  next: ()=>{
    
    this.utilidadService.mostrarAlerta("Registro Exitoso", "REGISTRO");
    this.formularioRegistro.patchValue({
      email:'',
      password:''
    });

    this.formularioRegistro.reset();

    this.mostrarRegistro.emit(false);
    this.mostrarLogin.emit(true);
    setTimeout(() => {
      this.utilidadService.mostrarAlerta("Ahora tenés que iniciar sesión", "REGISTRO");
    }, 3000);
  },
  error:()=>{
   this.utilidadService.mostrarAlerta("Error al registrarse","REGISTRO");
  }
});

}


  

  volverIndex():void{
    this.mostrarRegistro.emit(false);
  }

  irLogin():void{
    this.mostrarRegistro.emit(false);
    this.mostrarLogin.emit(true);
  }

}
