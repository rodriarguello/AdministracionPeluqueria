import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCaja } from 'src/app/models/respuesta-caja';
import { Turno } from 'src/app/models/turno/turno';
import { Usuario } from 'src/app/models/usuario';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { ModalReservarTurnoComponent } from '../turnos/modales-turnos/modal-reservar-turno/modal-reservar-turno.component';
import { ModalDetalleTurnoComponent } from '../turnos/modales-turnos/modal-detalle-turno/modal-detalle-turno.component';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(usuarioService:UsuariosService, private dashboardService:DashboardService, private utilidadService:UtilidadService, private turnosService:TurnosService
    ,private dialog:MatDialog){

    this.dataUsuario$ = usuarioService.getDatosUsuario;
    this.ingresoDiario = {
      cantidadIngresos:0,
      total:0
    }

    this.ingresoMensual = {
      cantidadIngresos:0,
      total:0
    }

    this.cantidadClientes = 0;
    this.cantidadClientesNuevos = 0;
    this.cantidadMascotas = 0;
    this.cantidadMascotasNuevas = 0;
    this.turnoMenu = {
      id:null!,
      fecha:null!,
      horario:null!,
      disponible:null!,
      mascota:null!,
      asistio:null!,
      precio:null!
    };

    moment.locale('es');
    
  }
  ngOnInit() {
    
    this.mostrarResumenDiario();

    
   
    
  }

  
  listTurnosOcupados:Turno[]=[];
  listTurnosDisponibles:Turno[]=[];
  ingresoDiario:RespuestaCaja;
  ingresoMensual:RespuestaCaja;
  turnoMenu:Turno;
  cantidadClientes:number;
  cantidadClientesNuevos:number;
  
  cantidadMascotas:number;
  cantidadMascotasNuevas:number;
  
  dataUsuario$:Observable<Usuario>;
  
  mostrarResumenDiario():void{
    
    this.dashboardService.getResumen().subscribe({
      next:(res)=>{
        if(res.resultado===1){
          
          this.listTurnosDisponibles =  res.data.turnos;
          this.listTurnosOcupados = res.data.turnos;
          
          this.listTurnosDisponibles = this.listTurnosDisponibles.filter(turno=>turno.disponible === true);
          this.listTurnosOcupados = this.listTurnosOcupados.filter(turno=>turno.disponible ===false);
          
          
          
          this.cantidadClientes = res.data.cantidadClientes;
          
          this.cantidadMascotas = res.data.cantidadMascotas;
          
          this.ingresoDiario = res.data.ingresoDiario;
          
          this.ingresoMensual = res.data.ingresoMensual;
        
          this.animarContador(res.data.nuevasMascotas,res.data.nuevosClientes);
          
          
         
          
        }
        else{

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
    const fecha = moment(turno.fecha.toString().slice(0,10));
    swal.fire({
      title:"¿Desea Cancelar el Turno?",
      text: `De la mascota ${turno.mascota!.nombre}, el día ${fecha.format('LL')} a las ${turno.horario.toString().slice(0,5)} horas.`,
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
          next:()=>{
              this.utilidadService.alertaExito("Se cancelo la reserva del turno","OK");
              this.mostrarResumenDiario();
          },
          error:()=>{
            this.utilidadService.alertaError("No se pudo cancelar la reserva del turno","ERROR");
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
          next:()=>{
            this.utilidadService.alertaExito("Se modificó la asistencia","OK")
            this.mostrarResumenDiario();
         
        },
        error:(err:HttpErrorResponse)=>{
          if(err.status === 499){
            
            this.utilidadService.alertaError(err.error,"ERROR");
          }else{
            
            this.utilidadService.alertaError("No se pudo modificar la asistencia","ERROR");
          }
        }
        
      });
    }
    
    
  }
  
  
  animarContador(valorNuevasMascotas:number,valorNuevosClientes:number) {
    
    let valorFinal = 0;
  
  
    if(valorNuevasMascotas>valorNuevosClientes){
      valorFinal = valorNuevasMascotas;
    }
    else{
      valorFinal = valorNuevosClientes;
    }
  
   
    const duration = 1000;
    const steps = valorFinal;
    const stepDuration = duration / steps;
  
    let contador = 0;
  
    const interval = setInterval(() => {
      
      if(this.cantidadMascotasNuevas < valorNuevasMascotas){
        this.cantidadMascotasNuevas = contador;
      }
  
      if(this.cantidadClientesNuevos<valorNuevosClientes){
  
        this.cantidadClientesNuevos = contador;
      }  
  
      
      contador++;
  
      if (contador > valorFinal) {
        clearInterval(interval);
      }
      
    }, stepDuration);
  }
  
  
}
