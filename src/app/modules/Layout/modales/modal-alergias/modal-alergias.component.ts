import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alergia } from 'src/app/models/alergia';
import { AlergiasService } from 'src/app/services/alergias.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-alergias',
  templateUrl: './modal-alergias.component.html',
  styleUrls: ['./modal-alergias.component.css']
})

export class ModalAlergiasComponent implements OnInit {
  
   constructor(private modalActual:MatDialogRef<ModalAlergiasComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAlergia:Alergia, private fb:FormBuilder, 
    private servicioAlergias:AlergiasService)
    {
      this.formAlergia = this.fb.group({
        nombre:['', [Validators.required,Validators.minLength(3)]]
      });

     this.tituloAccion = "Agregar Alergia";
     this.botonAccion = "Agregar";
      this.nombreAlergia = "";
    }
  
  ngOnInit(): void {
    if(this.dataAlergia!=null && this.dataAlergia.id != (-1)){

      this.nombreAlergia = this.dataAlergia.nombre;
      this.botonAccion="Actualizar";
      this.tituloAccion = "Actualizar Alergia";
      this.formAlergia.patchValue({
        nombre:this.dataAlergia.nombre
      });
    }
  }

formAlergia:FormGroup;
tituloAccion:string;  
botonAccion:string;  
nombreAlergia:string;

crearActualizarAlergia(){

  if(this.dataAlergia != null && this.dataAlergia.id != (-1)){
    const alergia:Alergia = {
      id : this.dataAlergia.id,
      nombre : this.formAlergia.value.nombre

    }
    
    this.servicioAlergias.update(alergia).subscribe({
      next:()=>{
          Swal.fire(
            'Ok',
            'La Alergia se modificó con éxito',
            'success'
          );
          this.modalActual.close("true");
      },
      error:()=>{
        Swal.fire(
          'Error',
          'No se pudo modificar la Alergia',
          'error'
        );
        
      }

    });
  }
  else{
  this.servicioAlergias.create(this.formAlergia.value.nombre).subscribe({
    next:(res)=>{
        if(this.dataAlergia != null){
          
          if(this.dataAlergia.id===(-1)){
            this.modalActual.close(res.id);
          }
        }
        else{

          this.modalActual.close("true");
        }
        Swal.fire(
          'Ok',
          'Se agregó una nueva Alergia',
          'success'
        );
    },
    error:(err:HttpErrorResponse)=>{

      if(err.status===499){

        Swal.fire(
          'Error',
          err.error,
          'error'
        );

      }else{

        Swal.fire(
          'Error',
          'No se pudo crear la alergia',
          'error'
        );
      }
     
    }
  });

}

}


}
