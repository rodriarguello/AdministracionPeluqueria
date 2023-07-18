import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCalendarioComponent } from './modales-turnos/modal-crear-calendario/modal-crear-calendario.component';
import { Calendario } from 'src/app/models/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit{

  constructor(private dialog:MatDialog, private calendarioService:CalendarioService, private router:Router){

    this.calendario = new Calendario();
  }
  
  ngOnInit(): void {
    
    
    this.mostrarCalendario();
    
    
  }

  calendario:Calendario; 
  
  

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

  eliminarCalendario(calendario:Calendario){

    swal.fire({

      title:"¿Desea eliminar el Calendario?",
      text: calendario.nombre,
      icon:"warning",
      iconColor:'red',
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si, Eliminar",
      showCancelButton:true,
      cancelButtonColor:"#d33",
      cancelButtonText:"No,volver"
      }

    ).then(((res)=>{
      if(res.isConfirmed){

        this.calendarioService.eliminarCalendario(calendario.id).subscribe({
          next:(res)=>{
            if(res.resultado===1){
              this.mostrarCalendario();
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
    }));
    

  }

}
