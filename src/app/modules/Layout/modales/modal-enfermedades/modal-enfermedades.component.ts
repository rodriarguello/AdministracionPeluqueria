import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enfermedad } from 'src/app/models/enfermedad';
import { EnfermedadesService } from 'src/app/services/enfermedades.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-enfermedades',
  templateUrl: './modal-enfermedades.component.html',
  styleUrls: ['./modal-enfermedades.component.css']
})
export class ModalEnfermedadesComponent implements OnInit {

  constructor(private modalActual:MatDialogRef<ModalEnfermedadesComponent> ,
    @Inject(MAT_DIALOG_DATA)public dataEnfermedad:Enfermedad,private fb:FormBuilder,
    private serviceEnfermedades:EnfermedadesService, private serviceUtilidades:UtilidadService){

  this.formEnfermedades = fb.group({
    nombre:['',[Validators.required,Validators.minLength(3)]]
  });
  this.tituloAccion="Agregar Enfermedad";
  this.botonAccion="Agregar";
  this.nombreEnfermedad = '';
  }

  ngOnInit(): void {
    if(this.dataEnfermedad!=null && this.dataEnfermedad.id != (-1)){
      this.nombreEnfermedad = this.dataEnfermedad.nombre;
      this.tituloAccion = "Actualizar Enfermedad"
      this.botonAccion = "Actualizar"  
      this.formEnfermedades.patchValue({
        nombre:this.dataEnfermedad.nombre
      });
    }
    
  }
  formEnfermedades:FormGroup;
  tituloAccion:string;
  botonAccion:string;
  nombreEnfermedad:string;



  agregarActualizarEnfermedad(){

    //Metodo Modificar
    if(this.dataEnfermedad!=null && this.dataEnfermedad.id != (-1)){
       
      const enfermedad ={
        id : this.dataEnfermedad.id,
        nombre : this.formEnfermedades.value.nombre
      };
      
      this.serviceEnfermedades.update(enfermedad).subscribe({

        next:()=>{
            Swal.fire('Ok','La enfermedad se modificó con éxito.','success');
            this.modalActual.close("true");
        },
        error:()=>{
          Swal.fire('Error','No se pudo modificar la enfermedad','error');
        }
    });

    }

    //Metodo Agregar
    else
    {

      this.serviceEnfermedades.create(this.formEnfermedades.value.nombre).subscribe({

        next:(res)=>{
            if(this.dataEnfermedad != null){

              if(this.dataEnfermedad.id === (-1)){
                this.modalActual.close(res.id);
              }
            }
            else{

              this.modalActual.close("true");
            }
            Swal.fire('Ok','Se agregó una nueva enfermedad.','success');
        },
        error:(err:HttpErrorResponse)=>{
          
          if(err.status === 499){
            Swal.fire('Error',err.error,'error');

          }else{
            Swal.fire('Error','No se pudo agregar la enfermedad.','error');
          }

        }

      });

    }


  }



}
