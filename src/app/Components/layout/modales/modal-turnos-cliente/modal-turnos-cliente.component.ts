import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { Turno } from 'src/app/models/turno/turno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-modal-turnos-cliente',
  templateUrl: './modal-turnos-cliente.component.html',
  styleUrls: ['./modal-turnos-cliente.component.css']
})
export class ModalTurnosClienteComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public dataCliente:Cliente, private turnoService:TurnosService){

  }
  ngOnInit(): void {
    
    this.mostrarTurnosCliente();
  }


  columnasTabla:string[] = ['Fecha','Horario','Nombre de Mascota','Precio','Asistió']

  listTurnos:Turno[]= [];

  mostrarTurnosCliente():void{


    this.turnoService.mostrarTurnosDeCliente(this.dataCliente.id).subscribe({
      next:(res)=>{
        if(res.resultado ===1){
          this.listTurnos = res.data;
          
        }
      }
    });

  }



}
