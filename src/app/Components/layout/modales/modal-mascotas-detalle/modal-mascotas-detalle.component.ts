import { Component, Inject } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mascota } from 'src/app/models/mascota';

@Component({
  selector: 'app-modal-mascotas-detalle',
  templateUrl: './modal-mascotas-detalle.component.html',
  styleUrls: ['./modal-mascotas-detalle.component.css']
})
export class ModalMascotasDetalleComponent {

 constructor(private dialogoActual:MatDialogRef<ModalMascotasDetalleComponent>,@Inject(MAT_DIALOG_DATA)public dataMascota:Mascota,
 ){

  this.mascota = dataMascota;

 }

  mascota:Mascota = new Mascota();
}
