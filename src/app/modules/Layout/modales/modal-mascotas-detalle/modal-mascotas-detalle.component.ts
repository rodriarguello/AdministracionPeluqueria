import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Mascota } from 'src/app/models/mascota/mascota';
import { Turno } from 'src/app/models/turno/turno';
import { MascotaSinDetalles } from 'src/app/models/mascota/mascotaSinDetalles';
import { ModalDetalleTurnoComponent } from '../../Pages/turnos/modales-turnos/modal-detalle-turno/modal-detalle-turno.component';

@Component({
  selector: 'app-modal-mascotas-detalle',
  templateUrl: './modal-mascotas-detalle.component.html',
  styleUrls: ['./modal-mascotas-detalle.component.css']
})
export class ModalMascotasDetalleComponent {

 constructor(@Inject(MAT_DIALOG_DATA)public dataMascota:Mascota,
 private dialogoDetalleTurno:MatDialog
 ){

 }



  verDetalleTurno(turno:Turno){

    const mascota :MascotaSinDetalles = {
      nombre:this.dataMascota.nombre,
      id:null!,
      fechaNacimiento:null!
    }
    turno.mascota = mascota;

    

    this.dialogoDetalleTurno.open(ModalDetalleTurnoComponent, {data:turno});
    
  }
}
