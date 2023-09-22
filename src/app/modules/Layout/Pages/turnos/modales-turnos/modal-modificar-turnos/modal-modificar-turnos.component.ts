import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CalendarioService } from 'src/app/services/calendario.service';
import * as moment from 'moment';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { MY_DATA_FORMATS } from 'src/app/spinner/spinner.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-modificar-turnos',
  templateUrl: './modal-modificar-turnos.component.html',
  styleUrls: ['./modal-modificar-turnos.component.css'],
  providers:[{provide:MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}]
})
export class ModalModificarTurnosComponent {

  constructor(@Inject(MAT_DIALOG_DATA)private data:{minDate:Date,maxDate:Date, accion:string}, private calendarioService:CalendarioService, private dialogoActual:MatDialogRef<ModalModificarTurnosComponent>,
  private utilidadService:UtilidadService){
    
   this.controlarAccion(data.minDate,data.maxDate,data.accion);
  }

  nuevaFechaFin:any;
  maxDate:any;
  minDate:any;
  tituloAccion!:string;

  modificarTurnos(){

    if(this.data.accion == "agregar"){

      this.calendarioService.agregarTurnos(this.nuevaFechaFin.format()).subscribe({
        next:(res)=>{
          if(res.resultado===1){
            this.dialogoActual.close(true);
            this.utilidadService.mostrarAlerta("Se agregaron los turnos con éxito","EXITO");
  
          }
          else{
            this.utilidadService.mostrarAlerta("Error al agregar los turnos","ERROR");
          }
        },
        error:()=>{
          this.utilidadService.mostrarAlerta("Error al agregar los turnos","ERROR");
        }
      });
    }

    if(this.data.accion=="eliminar"){
     
      this.calendarioService.eliminarTurnos(this.nuevaFechaFin.format()).subscribe({
        next:(res)=>{
          if(res.resultado===1){
            this.dialogoActual.close(true);
            this.utilidadService.mostrarAlerta("Se eliminaron los turnos con éxito","EXITO");
            
          }
          else if(res.resultado ===2){
            swal.fire({
              title:'Error al eliminar',
              text: `${res.mensaje}`,
              
              width:'300px'
              

            });
            
          }
          else{
            this.utilidadService.mostrarAlerta("Error al eliminar los turnos","ERROR");
          }
        },
        error:(error)=>{
          this.utilidadService.mostrarAlerta("Error al eliminar los turnos","ERROR");
          
        }
      });

    }




  }


  controlarAccion(minDate:Date, maxDate:Date,accion:string){
    if(accion=="agregar"){
      this.nuevaFechaFin = moment(minDate);
      this.minDate = minDate;
      this.maxDate = maxDate;
      this.tituloAccion = "Agregar";
    }

    if(accion == "eliminar" ){
      this.nuevaFechaFin = moment(maxDate);
      this.minDate = minDate;
      this.maxDate = maxDate;
      this.tituloAccion = "Eliminar";
    }


  }

}
