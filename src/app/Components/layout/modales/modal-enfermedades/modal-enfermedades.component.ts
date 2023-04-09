import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enfermedad } from 'src/app/models/enfermedad';
import { EnfermedadesService } from 'src/app/services/enfermedades.service';
import { UtilidadService } from 'src/app/services/utilidad.service';


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
        nombre:[this.dataEnfermedad.nombre]
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
       
      const enfermedad = new Enfermedad();
      enfermedad.id = this.dataEnfermedad.id;
      enfermedad.nombre = this.formEnfermedades.value.nombre;
      
      this.serviceEnfermedades.modificarEnfermedad(enfermedad).subscribe({

        next:(res)=>{
          if(res.resultado === 1){
            this.serviceUtilidades.mostrarAlerta("La Enfermedad se modificó con éxito", "Exito");
            this.modalActual.close("true");
          }
          else{
            this.serviceUtilidades.mostrarAlerta("No se pudo modificar la Enfermedad", "Error");
          }
        },
        error:(error)=>{
          this.serviceUtilidades.mostrarAlerta("No se pudo modificar la Enfermedad", "Error");
        }
    });

    }

    //Metodo Agregar
    else
    {

      this.serviceEnfermedades.cargarEnfermedad(this.formEnfermedades.value.nombre).subscribe({

        next:(res)=>{
          if(res.resultado === 1){
            if(this.dataEnfermedad != null){

              if(this.dataEnfermedad.id === (-1)){
                this.modalActual.close(res.data.id);
              }
            }
            else{

              this.modalActual.close("true");
            }
            this.serviceUtilidades.mostrarAlerta("Se agregó una nueva Enfermedad", "Exito");

          }
          else{
            this.serviceUtilidades.mostrarAlerta("No se pudo agregar la Enfermedad","Error");
          }
        },
        error:(error)=>{
          
          this.serviceUtilidades.mostrarAlerta("No se pudo agregar la Enfermedad","Error");
        }

      });

    }


  }



}
