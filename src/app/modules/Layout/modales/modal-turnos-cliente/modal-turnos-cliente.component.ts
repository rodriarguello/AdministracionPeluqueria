import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { Turno } from 'src/app/models/turno/turno';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-modal-turnos-cliente',
  templateUrl: './modal-turnos-cliente.component.html',
  styleUrls: ['./modal-turnos-cliente.component.css']
})
export class ModalTurnosClienteComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public dataCliente:Cliente, private clienteService:ClientesService){
    this.mostrarTurnosCliente();
  }
  ngOnInit(): void {
    
    
  }


  columnasTabla:string[] = ['Fecha','Horario','Nombre de Mascota','Precio','Asistió']

  listTurnos:Turno[]= [];

  mostrarTurnosCliente():void{


    this.clienteService.getTurnos(this.dataCliente.id!).subscribe({
      next:(res)=>{
          this.listTurnos = res;
      },
      error:()=>{

      }
    });

  }



}
