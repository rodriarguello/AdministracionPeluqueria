import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enfermedad } from 'src/app/models/enfermedad';


@Component({
  selector: 'app-modal-enfermedades',
  templateUrl: './modal-enfermedades.component.html',
  styleUrls: ['./modal-enfermedades.component.css']
})
export class ModalEnfermedadesComponent implements OnInit {

  constructor(private modalActual:MatDialogRef<ModalEnfermedadesComponent> ,
    @Inject(MAT_DIALOG_DATA)public dataEnfermedad:Enfermedad,private fb:FormBuilder){

  this.formEnfermedades = fb.group({
    nombre:['',Validators.required]
  });
  this.tituloAccion="Agregar Enfermedad";
  this.botonAccion="Agregar";

  }

  ngOnInit(): void {
    
  }




  formEnfermedades:FormGroup;
  tituloAccion:string;
  botonAccion:string;





}
