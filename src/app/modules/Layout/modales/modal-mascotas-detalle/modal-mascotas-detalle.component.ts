import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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

 constructor(private dialogoActual:MatDialogRef<ModalMascotasDetalleComponent>,@Inject(MAT_DIALOG_DATA)private dataMascota:Mascota,
 private dialogoDetalleTurno:MatDialog
 ){

  this.mascota = dataMascota;

 }

  mascota:Mascota = new Mascota();


  verDetalleTurno(turno:Turno){

    const mascota = new MascotaSinDetalles();
    mascota.nombre = this.dataMascota.nombre;
    turno.mascota = mascota;

    

    this.dialogoDetalleTurno.open(ModalDetalleTurnoComponent, {data:turno});
    
  }
}
