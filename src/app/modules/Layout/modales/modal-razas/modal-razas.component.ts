import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Raza } from 'src/app/models/raza';
import { RazasService } from 'src/app/services/razas.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-razas',
  templateUrl: './modal-razas.component.html',
  styleUrls: ['./modal-razas.component.css']
})
export class ModalRazasComponent implements OnInit {

  constructor(private fb:FormBuilder,private modalActual:MatDialogRef<ModalRazasComponent>,
    @Inject(MAT_DIALOG_DATA)public dataRaza:Raza, private razaService:RazasService, 
    private utilidadService:UtilidadService){

    this.formRazas = fb.group({
      nombre:['',[Validators.required,Validators.minLength(3)]]
    });
    this.tituloAccion="Agregar Raza";
    this.botonAccion="Agregar";
    this.nombreRaza="";
  }
  
  ngOnInit(): void {
    //Se controla si es distinto de -1 porque ese parametro se pasa cuando se va a agregar desde el formulario de Mascota
    //Es para agregar una nueva raza, pero se le pasa data especifica por parametro DATA para despues diferenciar el tipo de respuesta
    if(this.dataRaza!=null && this.dataRaza.id !=(-1)){
      this.nombreRaza = this.dataRaza.nombre;
      this.tituloAccion = "Actualizar Raza";
      this.botonAccion = "Actualizar";
      this.formRazas.patchValue({
        nombre:[this.dataRaza.nombre]
      });
    }
  }

  formRazas:FormGroup;
  tituloAccion:string;
  botonAccion:string;
  nombreRaza:string;

  agregarActualizarRaza():void{
     //Se controla si es distinto de -1 porque ese parametro se pasa cuando se va a agregar desde el formulario de Mascota
    //Es para agregar una nueva raza, pero se le pasa data especifica por parametro DATA para despues diferenciar el tipo de respuesta
    if(this.dataRaza!=null && this.dataRaza.id !=(-1)){
      //Metodo modificar
      const raza :Raza = {
        id:this.dataRaza.id,
        nombre : this.formRazas.value.nombre

      } ;

      this.razaService.update(raza).subscribe({

        next:()=>{
            this.modalActual.close("true");
            Swal.fire('Ok','La raza se modificó con éxito.','success');
        },
        error:()=>{

          Swal.fire('Error','La raza no se pudo modificar.','error');

        }

      });
   
    }
    else{
      //Metodo agregar

      this.razaService.create(this.formRazas.value.nombre).subscribe({
        next:(res)=>{
            //Aca se da una respuesta diferenciada segun el parametro pasado
            if(this.dataRaza != null){

              if(this.dataRaza.id===(-1)){
                //Se le pasa el id del nuevo usuario para que se seleccione en el comboBox
                this.modalActual.close(res.id)
              }
            }
            else{
              this.modalActual.close("true");
            }
            Swal.fire('Ok','Se agregó una nueva raza.','success');
        },
        error:(err:HttpErrorResponse)=>{
          if(err.status===499){
            Swal.fire('Error',err.error,'error');
          }else{

            Swal.fire('Error','La raza no se pudo crear.','error');
          }
        }
      });


    }

  }



}
