import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCalendarioComponent } from './modales-turnos/modal-calendario/modal-calendario.component';
import { Calendario } from 'src/app/models/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit{

  constructor(private dialog:MatDialog, private calendarioService:CalendarioService, private router:Router){

    
  }

  ngOnInit(): void {

    this.mostrarCalendarios();
    
  }

  listCalendario:Calendario[] = [];
  
  

  nuevoCalendario():void{
    this.dialog.open(ModalCalendarioComponent,{disableClose:true}).afterClosed().subscribe((res)=>{
      if(res===true) this.mostrarCalendarios();
    });
  }
  
  mostrarCalendarios():void{
    this.calendarioService.mostrarCalendario().subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.listCalendario = res.data; 
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
              this.mostrarCalendarios();
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

  irCalendario(idCalendario:number):void{
    this.router.navigate(['pages/turnos/calendario'],{queryParams:{id:idCalendario}});
  }

  
}
