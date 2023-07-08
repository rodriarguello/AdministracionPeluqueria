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

constructor(private fb:FormBuilder, private usuarioService:UsuariosService, private utilidadService:UtilidadService){

  this.formularioRegistro = fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  this.ocultarPassword = true;
}
  ngOnInit(): void {


  }

  @Output() mostrarLogin = new EventEmitter<boolean>();

registrarUsuario():void{

const usuario = new Usuario(this.formularioRegistro.value.email,this.formularioRegistro.value.password);

this.usuarioService.crearUsuario(usuario).subscribe({
  next: ()=>{
    
    this.utilidadService.mostrarAlerta("Registro Exitoso", "REGISTRO");
    this.formularioRegistro.patchValue({
      email:'',
      password:''
    });

    this.formularioRegistro.reset();

    this.mostrarLogin.emit(true);
    
  },
  error:()=>{
   this.utilidadService.mostrarAlerta("Error al registrarse","REGISTRO");
  }
});

}


  

  volverLogin():void{
    this.mostrarLogin.emit(true);
  }

}
