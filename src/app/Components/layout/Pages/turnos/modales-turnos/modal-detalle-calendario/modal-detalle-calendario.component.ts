import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Calendario } from 'src/app/models/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import swal from 'sweetalert2';
import { ModalModificarTurnosComponent } from '../modal-modificar-turnos/modal-modificar-turnos.component';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-detalle-calendario',
  templateUrl: './modal-detalle-calendario.component.html',
  styleUrls: ['./modal-detalle-calendario.component.css']
})
export class ModalDetalleCalendarioComponent {

  constructor(@Inject(MAT_DIALOG_DATA)dataCalendario:Calendario, private calendarioService:CalendarioService,private utilidadService:UtilidadService,
  private dialogoActual:MatDialogRef<ModalDetalleCalendarioComponent>,private dialog:MatDialog){
    this.calendario = dataCalendario;
    this.calendarioModificado = false;
  }

  calendario:Calendario;
  calendarioModificado:boolean;

  eliminarCalendario(calendario:Calendario){

    swal.fire({

      title:"¿Desea eliminar el Calendario?",
      text: calendario.nombre,
      icon:"warning",
      iconColor:'red',
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si, Eliminar",
      showCancelButton:true,
      cancelButtonColor:"#d33",
      cancelButtonText:"No,volver"
      }

    ).then(((res)=>{
      if(res.isConfirmed){

        this.calendarioService.eliminarCalendario(calendario.id).subscribe({
          next:(res)=>{
            if(res.resultado===1){
              this.utilidadService.mostrarAlerta("El calendario se eliminó con éxito","EXITO");
              this.dialogoActual.close({eliminado:true});
            }
            else{
              this.utilidadService.mostrarAlerta("El calendario no se pudo eliminar","ERROR");
            }
          },
          error:()=>{
            this.utilidadService.mostrarAlerta("El calendario no se pudo eliminar","ERROR");
          }
        });

      }
    }));
    

  }

  mostrarCalendario(){
    this.calendarioService.mostrarCalendario().subscribe({
      next:(res)=>{
        if(res.resultado === 1){
          this.calendario = res.data;
        }
      }
    });
  }

  agregarTurnos(){
    this.dialog.open(ModalModificarTurnosComponent,{data:{minDate:moment(this.calendario.fechaFin).add('1','days'),maxDate:moment("2030-12-31"),accion:"agregar"}}).afterClosed().subscribe(
      {next:(res)=>{
          if(res === true){
            this.calendarioModificado = true;
            this.mostrarCalendario();
          }
    }});
  }

  eliminarTurnos(){
    this.dialog.open(ModalModificarTurnosComponent,{data:{minDate:moment(this.calendario.fechaInicio).add('1',"days"),maxDate:moment(this.calendario.fechaFin).subtract('1','days'),accion:"eliminar"}}).afterClosed().subscribe(
      {next:(res)=>{
          if(res === true){
            this.calendarioModificado = true;
            this.mostrarCalendario();
          }
    }});
  }
  cerrarModal(){
    this.dialogoActual.close({modificado:this.calendarioModificado});
  }

}

