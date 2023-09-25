import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Turno } from 'src/app/models/turno/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-detalle-turno',
  templateUrl: './modal-detalle-turno.component.html',
  styleUrls: ['./modal-detalle-turno.component.css']
})
export class ModalDetalleTurnoComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA)public dataTurno:Turno, private nuevoDialog:MatDialog, private fb:FormBuilder, private turnoService:TurnosService,
  private dialogoActual:MatDialogRef<ModalDetalleTurnoComponent>, private utilidadService:UtilidadService){

   this.habilitarBoton = false;
    
  }

  precio!:number;
  habilitarBoton:boolean;
 

  ngOnInit(): void {

   this.precio = this.dataTurno.precio;

  }

  modificarPrecio():void{

    this.turnoService.modificarPrecio(this.dataTurno.id,this.precio).subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.utilidadService.mostrarAlerta("Se modificó el precio","OK")
          this.dialogoActual.close(true);
        }
        else{
          this.utilidadService.mostrarAlerta("El precio no se pudo modificar","ERROR")
          console.log(res.mensaje);

        }
      },
      error:(err)=>{
        this.utilidadService.mostrarAlerta("El precio no se pudo modificar","ERROR")

        console.log(err);
      }
    });
    
  }



}
