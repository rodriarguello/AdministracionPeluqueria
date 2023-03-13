import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alergia } from 'src/app/models/alergia';
import { AlergiasService } from 'src/app/services/alergias.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-alergias',
  templateUrl: './modal-alergias.component.html',
  styleUrls: ['./modal-alergias.component.css']
})

export class ModalAlergiasComponent implements OnInit {
  
   constructor(private modalActual:MatDialogRef<ModalAlergiasComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAlergia:Alergia, private fb:FormBuilder, 
    private servicioAlergias:AlergiasService, private servicioUtilidad:UtilidadService)
    {
      this.formAlergia = this.fb.group({
        nombre:['', Validators.required]
      });

     

    }
  
  ngOnInit(): void {
    if(this.dataAlergia!=null){
      this.botonAccion="Actualizar";
      this.tituloAccion = "Actualizar Alergia";
      this.formAlergia.patchValue({
        nombre:this.dataAlergia.nombre
      });
    }
  }

formAlergia:FormGroup;
tituloAccion:string = "Agregar Alergia"
botonAccion:string = "Agregar";


crearActualizarAlergia(){

  if(this.dataAlergia != null){
    const alergia = new Alergia();
    alergia.id = this.dataAlergia.id;
    alergia.nombre = this.formAlergia.value.nombre;
    
    this.servicioAlergias.modificarAlergia(alergia).subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.servicioUtilidad.mostrarAlerta("Se actualizó correctamente", "Exito");
          this.modalActual.close("true");
          
        }
        else
        {
       
          this.servicioUtilidad.mostrarAlerta("No se pudo actualizar", "Error");
        }
        
      },
      error:(error)=>{
        this.servicioUtilidad.mostrarAlerta("No se pudo actualizar", "Error");
        
      }

    });
  }
  else{
  this.servicioAlergias.cargarAlergia(this.formAlergia.value.nombre).subscribe({
    next:(res)=>{
      if(res.resultado===1){
        this.servicioUtilidad.mostrarAlerta("La alergia se agregó correctamente","Exito");
        this.modalActual.close("true");
      }
      else
        this.servicioUtilidad.mostrarAlerta("No se pudo agregar la Alergia","Error")
      
    },
    error:(error)=>{
      this.servicioUtilidad.mostrarAlerta("No se pudo agregar la Alergia","Error")
     
    }
  });

}

}


}
