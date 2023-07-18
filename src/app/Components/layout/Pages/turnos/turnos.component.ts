import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCalendarioComponent } from './modales-turnos/modal-crear-calendario/modal-crear-calendario.component';
import { Calendario } from 'src/app/models/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalDetalleCalendarioComponent } from './modales-turnos/modal-detalle-calendario/modal-detalle-calendario.component';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit{

  constructor(private dialog:MatDialog, private calendarioService:CalendarioService, private router:Router){

    //this.calendario = new Calendario();
  }
  
  ngOnInit(): void {
    
    
    this.mostrarCalendario();
    
    
  }

  calendario!:Calendario; 
  
  

  nuevoCalendario():void{
    this.dialog.open(ModalCalendarioComponent,{disableClose:true}).afterClosed().subscribe((res)=>{
      if(res===true) this.mostrarCalendario();
    });
  }
  
  mostrarCalendario():void{
    this.calendarioService.mostrarCalendario().subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.calendario = res.data; 
          
        }
        else{
          console.log(res);
        }
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

 

  mostrarDetallesCalendario(){
    this.dialog.open(ModalDetalleCalendarioComponent, {data:this.calendario}).afterClosed().subscribe((res)=>{

      if(res.eliminado){
        this.calendario = null!;
      }
    });
  }

}
