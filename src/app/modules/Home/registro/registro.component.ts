import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    password:['', this.customPasswordValidator]

  })
  this.ocultarPassword = true;
}

//Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d]|[^ ]){6,15}$')
customPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value;
  if(!value) {
    return {required:true} //Error si el campo esta vacio
  }

  if(!/^\S*$/.test(value)){
    return {espacioBlanco:true} //Error si tiene espacios en blanco
  }

  if (!/[a-z]/.test(value)) {
    return { lowercase: true }; // Error si no hay minúsculas
  }

  if (!/[A-Z]/.test(value)) {
    return { uppercase: true }; // Error si no hay mayúsculas
  }

  if (!/\d/.test(value)) {
    return { digit: true }; // Error si no hay números
  }

  if (value.length < 6) {
    return { minlength: true }; // Error si la longitud es menor a 8 caracteres
  }

  if (value.length > 15) {
    return { maxlength: true }; // Error si la longitud es menor a 8 caracteres
  }

  return null; // La contraseña cumple con todas las validaciones
}

  ngOnInit(): void {


  }

  @Output() mostrarRegistro = new EventEmitter<boolean>();
  @Output() mostrarLogin = new EventEmitter<boolean>();

registrarUsuario():void{

const usuario:Usuario = {

  email:this.formularioRegistro.value.email,
  password: this.formularioRegistro.value.password,
  nombres: this.formularioRegistro.value.nombres,
  apellido: this.formularioRegistro.value.apellido,
  nombrePeluqueria: this.formularioRegistro.value.nombrePeluqueria
};



this.usuarioService.registro(usuario).subscribe({
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
