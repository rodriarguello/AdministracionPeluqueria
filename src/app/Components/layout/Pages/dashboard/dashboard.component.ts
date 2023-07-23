import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCaja } from 'src/app/models/respuesta-caja';
import { Turno } from 'src/app/models/turno/turno';
import { Usuario } from 'src/app/models/usuario';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalReservarTurnoComponent } from '../turnos/modales-turnos/modal-reservar-turno/modal-reservar-turno.component';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { ModalDetalleTurnoComponent } from '../turnos/modales-turnos/modal-detalle-turno/modal-detalle-turno.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(usuarioService:UsuariosService, private dashboardService:DashboardService, private utilidadService:UtilidadService, private turnosService:TurnosService
    ,private dialog:MatDialog){

    this.dataUsuario$ = usuarioService.getDatosUsuario;
    this.dataIngresos = {
      cantidadIngresos:0,
      total:0
    }

    this.turnoMenu = new Turno();
    
  }
  ngOnInit(): void {
    
    this.mostrarResumenDiario();
   
    
  }
 
  listTurnosOcupados:Turno[]=[];
  listTurnosDisponibles:Turno[]=[];
  dataIngresos:RespuestaCaja;
  turnoMenu:Turno;

  dataUsuario$:Observable<Usuario>;

  mostrarResumenDiario():void{
   
    this.dashboardService.resumenDiario().subscribe({
      next:(res)=>{
        if(res.resultado===1){

          this.listTurnosDisponibles =  res.data.turnos;
          this.listTurnosOcupados = res.data.turnos;
          
          this.listTurnosDisponibles = this.listTurnosDisponibles.filter(turno=>turno.disponible === true);
          this.listTurnosOcupados = this.listTurnosOcupados.filter(turno=>turno.disponible ===false);

          this.dataIngresos = res.data.ingresos;

          
          
        }
      }
    });

  }

  reservarTurno(turno:Turno):void{
    this.dialog.open(ModalReservarTurnoComponent,{disableClose:true,data:turno}).afterClosed().subscribe(
      (res)=>{
        if(res===true){

          this.mostrarResumenDiario();
        }
      }
    );
  }

  cancelarReserva(turno:Turno):void{

    swal.fire({
      title:"¿Desea Cancelar el Turno?",
      text: `Mascota: ${turno.mascota.nombre}\nDia: ${turno.fecha.dia}\nHora:${turno.horario.hora}`,
      icon:"warning",
      iconColor:'red',
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si, Cancelar",
      showCancelButton:true,
      cancelButtonColor:"#d33",
      cancelButtonText:"No,volver"
    }
    ).then((res)=>{
      if(res.isConfirmed){
        this.turnosService.cancelarTurno(turno.id).subscribe({
          next:(res)=>{
            if(res.resultado ===1){
              this.utilidadService.mostrarAlerta("Se cancelo la reserva del turno","OK");
              this.mostrarResumenDiario();
            }
            else{
              this.utilidadService.mostrarAlerta("No se pudo cancelar la reserva del turno","ERROR");
              console.log(res.mensaje);
            }

          },
          error:(err)=>{
            this.utilidadService.mostrarAlerta("No se pudo cancelar la reserva del turno","ERROR");
            console.log(err);
          }
        });
      }
    });

  }

  verDetalles(turno:Turno):void{
    
    this.dialog.open(ModalDetalleTurnoComponent,{disableClose:true,data:turno}).afterClosed().subscribe(
      (res)=>{
        if(res===true){
          this.mostrarResumenDiario();
        }
      }
    );
  }

  modificarAsistencia(turno:Turno,value:boolean){
   
    if(turno.asistio!=value){
     
    
      this.turnosService.modificarAsistencia(turno.id,value).subscribe({
        next:(res)=>{
          if(res.resultado===1){
            this.utilidadService.mostrarAlerta("Se modificó la asistencia","OK")
            this.mostrarResumenDiario();
          }
          else{
            this.utilidadService.mostrarAlerta("No se pudo modificar la asistencia","ERROR");
            console.log(res.mensaje);
          } 
        },
        error:(err)=>{
          console.log(err);
          this.utilidadService.mostrarAlerta("No se pudo modificar la asistencia","ERROR");
        }
      
      });
    }
    
    
    }

  

}
