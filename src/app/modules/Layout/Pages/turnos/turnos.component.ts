import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCalendarioComponent } from './modales-turnos/modal-crear-calendario/modal-crear-calendario.component';
import { Calendario } from 'src/app/models/calendario/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';




@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit{

  constructor(private dialog:MatDialog, private calendarioService:CalendarioService){

    
    this.mostrarCalendario();
    this.calendarioEliminado = false;
    
  }
  
  ngOnInit(): void {
    
    
    
    
  }

  calendarioEliminado:boolean;
  calendario!:Calendario; 
  
  

  nuevoCalendario():void{
    this.dialog.open(ModalCalendarioComponent,{disableClose:true}).afterClosed().subscribe((res)=>{
      if(res===true) {
        this.calendarioEliminado = false;
        this.mostrarCalendario();
      }
    });
  }
  
  mostrarCalendario():void{
    this.calendarioService.get().subscribe({
      next:(res)=>{
          this.calendario = res; 
         
      },
      error:()=>{
      }
    });
  }

 

}
