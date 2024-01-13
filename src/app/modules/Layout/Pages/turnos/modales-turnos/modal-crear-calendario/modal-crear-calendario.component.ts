import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MY_DATA_FORMATS } from 'src/app/spinner/spinner.component';
import { Calendario } from 'src/app/models/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-calendario',
  templateUrl: './modal-crear-calendario.component.html',
  styleUrls: ['./modal-crear-calendario.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})
export class ModalCalendarioComponent {

  constructor(private dialogoActual:MatDialogRef<ModalCalendarioComponent>, private fb:FormBuilder, private calendarioService:CalendarioService,
    private utilidadService:UtilidadService){

    this.formCalendario = fb.group({
      nombre:['',Validators.required],
      fechaInicio:['',Validators.required],
      fechaFin:['',Validators.required],
      horaInicio:[8,Validators.required],
      horaFin:[18,Validators.required],
      intervaloTurnos:[30,Validators.required]
    });

  }

  formCalendario:FormGroup;

  listHorarios:number[]= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

  listInvervaloTurnos:number[]=[10,15,20,25,30,45,60,90,120,180];


  crearCalendario():void{
    const calendario :Calendario = {

      nombre: this.formCalendario.value.nombre,
      fechaInicio: this.formCalendario.value.fechaInicio,
      fechaFin: this.formCalendario.value.fechaFin,
      horaInicioTurnos: this.formCalendario.value.horaInicio,
      horaFinTurnos: this.formCalendario.value.horaFin,
      intervaloTurnos: this.formCalendario.value.intervaloTurnos
    };
    
    this.calendarioService.create(calendario).subscribe({
      next:()=>{
          this.utilidadService.alertaExito("El calendario se creo con éxito", "OK");
          this.dialogoActual.close(true);
       
      },
      error:()=>{
        this.utilidadService.alertaError("No se pudo crear el calendario", "ERROR");
        
      }
    });
    

  }

 

}
