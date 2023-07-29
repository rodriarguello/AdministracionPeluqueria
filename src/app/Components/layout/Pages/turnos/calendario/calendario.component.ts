import { Component,  Input, EventEmitter, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Turno } from 'src/app/models/turno/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { ModalReservarTurnoComponent } from '../modales-turnos/modal-reservar-turno/modal-reservar-turno.component';
import swal from 'sweetalert2';
import { ModalDetalleTurnoComponent } from '../modales-turnos/modal-detalle-turno/modal-detalle-turno.component';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { ModalDetalleCalendarioComponent } from '../modales-turnos/modal-detalle-calendario/modal-detalle-calendario.component';
import { Calendario } from 'src/app/models/calendario';
import { CalendarioService } from 'src/app/services/calendario.service';
import { MY_DATA_FORMATS } from 'src/app/Reutilizable/shared/spinner/spinner.component';




@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})


export class CalendarioComponent implements OnInit, OnChanges{
  
  constructor(private turnosService:TurnosService, private dialog:MatDialog, private utilidadService:UtilidadService,private calendarioService:CalendarioService){
    
      this.turnoMenu = new Turno();
      moment.locale("es");
     
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes['calendario']){
      this.fecha = new Date(Date.now());
    
    
    
    this.mostrarTurnos();

    }
  }
  
  @Output() calendarioEliminado = new EventEmitter<boolean>();
  @Input() calendario!:Calendario;

  
  listHorarios:string[] =[];
  listLunes:Turno[]= [];
  listMartes:Turno[]=[];
  listMiercoles:Turno[]=[];
  listJueves:Turno[]=[];
  listViernes:Turno[]=[];
  listSabado:Turno[]=[];
  listDomingo:Turno[]=[];
  cabecerasFechas:string[] = [];
  


  fecha!:any;
  fechaFin!:any;
  fechaInicio!:any;

  turnoMenu!:Turno;

  ngOnInit(): void {

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

    


    this.turnosService.filtrarTurnos(this.calendario.id,this.fechaInicio.format(),this.fechaFin.format()).subscribe({
      next:(res)=>{
        if(res.resultado===1){

          this.cabecerasFechas = [];
          const fechaLun = this.fechaInicio;
          this.cabecerasFechas.push(fechaLun.format('ddd DD [de] MMMM'));


          const fechaMar= this.fechaInicio.clone().add(1,'days');
          this.cabecerasFechas.push(fechaMar.format('ddd DD [de] MMMM'));

          const fechaMie = fechaMar.clone().add(1,'days');
          this.cabecerasFechas.push(fechaMie.format('ddd DD [de] MMMM'));

          const fechaJue = fechaMie.clone().add(1,'days');
          this.cabecerasFechas.push(fechaJue.format('ddd DD [de] MMMM'));

          const fechaVie = fechaJue.clone().add(1,'days');
          this.cabecerasFechas.push(fechaVie.format('ddd DD [de] MMMM'));

          const fechaSab = fechaVie.clone().add(1,'days');
          this.cabecerasFechas.push(fechaSab.format('ddd DD [de] MMMM'));

          const fechaDom = fechaSab.clone().add(1,'days');
          this.cabecerasFechas.push(fechaDom.format('ddd DD [de] MMMM'));
          

          
          this.inicializacionListas();
          this.listHorarios = [];
          
          for (let index = 0; index < res.data.cantidadHorarios; index++) {
            this.listHorarios.push(index.toString()); 
            
          }
          
          this.listLunes = res.data.lunes;
          this.listMartes = res.data.martes;
          this.listMiercoles = res.data.miercoles;
          this.listJueves = res.data.jueves;
          this.listViernes = res.data.viernes;
          this.listSabado = res.data.sabado;
          this.listDomingo = res.data.domingo;

          

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
      text: `Mascota: ${turno.mascota.nombre}\nDia: ${turno.fecha}\nHora:${turno.horario}`,
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

    mostrarDetallesCalendario(){
      this.dialog.open(ModalDetalleCalendarioComponent, {data:this.calendario}).afterClosed().subscribe((res)=>{
  
        if(res.eliminado){
          this.calendario = null!;
          this.calendarioEliminado.next(true);
        }
  
        if(res.modificado){
          this.mostrarCalendario();
          this.mostrarTurnos();
        }
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


    
}
