import { Component,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Turno } from 'src/app/models/turno/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { ModalReservarTurnoComponent } from '../modales-turnos/modal-reservar-turno/modal-reservar-turno.component';
import { ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
import { ModalDetalleTurnoComponent } from '../modales-turnos/modal-detalle-turno/modal-detalle-turno.component';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { Horario } from 'src/app/models/horario';
import { HorariosService } from 'src/app/services/horarios.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';


export const MY_DATA_FORMATS={
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY'
  }
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})

export class CalendarioComponent implements OnInit{
  
  constructor(private turnosService:TurnosService, private dialog:MatDialog, private activatedRoute:ActivatedRoute, private utilidadService:UtilidadService,
    private horarioService:HorariosService){
    
      this.turnoMenu = new Turno();
     
  }
  
  
  
  listTurnos:Turno[]=[];
  idCalendario!:number;
  listHorarios:Horario[] =[];
  listLunes:Turno[]= [];
  listMartes:Turno[]=[];
  listMiercoles:Turno[]=[];
  listJueves:Turno[]=[];
  listViernes:Turno[]=[];
  listSabado:Turno[]=[];
  listDomingo:Turno[]=[];
  cabecerasFechas:Date[] = [];
  


  fecha!:any;
  fechaFin!:any;
  fechaInicio!:any;

  turnoMenu!:Turno;

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((params:Params)=>{
      this.idCalendario = params['id'];
      
      
    });
    this.fecha = new Date(Date.now());
    
    this.mostrarHorarios();
    
    this.mostrarTurnos();
    

    
  }

  inicializacionListas(){
    this.listLunes = [];
    this.listMartes = [];
    this.listMiercoles = [];
    this.listJueves = [];
    this.listViernes = [];
    this.listSabado = [];
    this.listDomingo = [];
  }
  
  semanaAnterior():void{
    this.fecha = moment.utc(this.fecha).subtract(7,'days');
    this.mostrarTurnos();
  }

  semanaSiguiente():void{
    this.fecha = moment.utc(this.fecha).add(7,'days');
    this.mostrarTurnos();
  }

  mostrarTurnos(){
   
    const fechaSeleccionada =  moment.utc(this.fecha);
    
    if(fechaSeleccionada.isoWeekday() === 1){
      this.fechaInicio = fechaSeleccionada.clone();
      this.fechaFin = this.fechaInicio.clone().add(6,'days');
      
    }

    
    if(fechaSeleccionada.isoWeekday() === 2){
      this.fechaInicio = fechaSeleccionada.clone().subtract(1,'days');
      this.fechaFin = this.fechaInicio.clone().add(6,'days');
     
    }

    
    if(fechaSeleccionada.isoWeekday() === 3){
      this.fechaInicio = fechaSeleccionada.clone().subtract(2,'days');
        this.fechaFin = this.fechaInicio.clone().add(6,'days');
        
    }

    
    if(fechaSeleccionada.isoWeekday() === 4){
      this.fechaInicio = fechaSeleccionada.clone().subtract(3,'days');
        this.fechaFin = this.fechaInicio.clone().add(6,'days');
        
    }

    
    if(fechaSeleccionada.isoWeekday() === 5){
      this.fechaInicio = fechaSeleccionada.clone().subtract(4,'days');
        this.fechaFin = this.fechaInicio.clone().add(6,'days');
    }

    
    if(fechaSeleccionada.isoWeekday() === 6){
      this.fechaInicio = fechaSeleccionada.clone().subtract(5,'days');
        this.fechaFin = this.fechaInicio.clone().add(6,'days');
    }

    
    if(fechaSeleccionada.isoWeekday() === 7){
      this.fechaInicio = fechaSeleccionada.clone().subtract(6,'days');
      this.fechaFin = fechaSeleccionada.clone();
      
      
    }

    


    this.turnosService.filtrarTurnos(this.idCalendario,this.fechaInicio.format(),this.fechaFin.format()).subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.cabecerasFechas = [];
          this.cabecerasFechas.push(this.fechaInicio.format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(1,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(2,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(3,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(4,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(5,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaFin.format('DD-MMMM'));
          

          this.listTurnos = res.data;
          this.inicializacionListas();

          let cantidadHorarios = this.listHorarios.length; 
        
          let diaDeLaSemana = moment.utc(this.listTurnos[0].fecha.dia).isoWeekday();

          for(let i = 0; i< this.listTurnos.length; i++){
            
            

            if((diaDeLaSemana===1 || this.listTurnos.length>cantidadHorarios*6) && this.listLunes.length<cantidadHorarios){
                this.listLunes.push(this.listTurnos[i]);
                if(this.listLunes.length === cantidadHorarios) diaDeLaSemana++;
                continue;
            }


            if((diaDeLaSemana===2 || this.listTurnos.length>cantidadHorarios*5 ) && this.listMartes.length<cantidadHorarios){
              this.listMartes.push(this.listTurnos[i]);
              if(this.listMartes.length === cantidadHorarios) diaDeLaSemana++;
              continue;
            }


            if((diaDeLaSemana===3 || this.listTurnos.length>cantidadHorarios*4) && this.listMiercoles.length<cantidadHorarios){
              this.listMiercoles.push(this.listTurnos[i]);
              if(this.listMiercoles.length === cantidadHorarios) diaDeLaSemana++;
              continue;
            }



            if((diaDeLaSemana===4 || this.listTurnos.length>this.listHorarios.length*3) && this.listJueves.length<cantidadHorarios){
              this.listJueves.push(this.listTurnos[i]);
              if(this.listJueves.length === cantidadHorarios) diaDeLaSemana++;
              continue;
            }


            if((diaDeLaSemana===5 || this.listTurnos.length>this.listHorarios.length*2) && this.listViernes.length<cantidadHorarios){
              this.listViernes.push(this.listTurnos[i]);
              if(this.listViernes.length === cantidadHorarios) diaDeLaSemana++;
              continue;
            }

            if((diaDeLaSemana===6 || this.listTurnos.length>this.listHorarios.length) &&this.listSabado.length<cantidadHorarios){
              this.listSabado.push(this.listTurnos[i]);
              if(this.listSabado.length === cantidadHorarios) diaDeLaSemana++;
              continue;
            }

            
              this.listDomingo.push(this.listTurnos[i]);
            
          }
          
          

        }
        else{
          this.cabecerasFechas = [];
          this.cabecerasFechas.push(this.fechaInicio.format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(1,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(2,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(3,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(4,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaInicio.clone().add(5,'days').format('DD-MMMM'));
          this.cabecerasFechas.push(this.fechaFin.format('DD-MMMM'));
          

          
          this.inicializacionListas();
          
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });


  }
   mostrarHorarios ():void{
    
    this.horarioService.mostrarHorarios(this.idCalendario).subscribe({
       next:(res)=>{
        if(res.resultado === 1){
          this.listHorarios = res.data;
       
          
        }
        else{
          console.log(res.mensaje);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }



  reservarTurno(turno:Turno):void{
    this.dialog.open(ModalReservarTurnoComponent,{disableClose:true,data:turno}).afterClosed().subscribe(
      (res)=>{
        if(res===true){

          this.mostrarTurnos();
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
              this.mostrarTurnos();
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
          this.mostrarTurnos();
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
            this.mostrarTurnos();
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
