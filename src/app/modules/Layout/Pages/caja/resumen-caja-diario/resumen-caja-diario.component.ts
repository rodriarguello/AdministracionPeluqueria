import { Component } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { MY_DATA_FORMATS } from 'src/app/spinner/spinner.component';
import { RespuestaCaja } from 'src/app/models/respuesta-caja';
import { CajaService } from 'src/app/services/caja.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { take } from 'rxjs';



@Component({
  selector: 'app-resumen-caja-diario',
  templateUrl: './resumen-caja-diario.component.html',
  styleUrls: ['./resumen-caja-diario.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})
export class ResumenCajaDiarioComponent {

  constructor(private cajaService:CajaService,private usuarioService:UsuariosService){
    this.obtenerFechaCreacionUsuario();
    this.minDate = moment(this.fechaCreacion);
    this.maxDate = moment();
    this.fechaSeleccionada = moment();
    this.mostrarIngresoDiario();
  }

  obtenerFechaCreacionUsuario(){

     this.usuarioService.getDatosUsuario.pipe(take(1)).subscribe({
      next:(res)=>{
        this.fechaCreacion =  res.fechaCreacion!;
      }

     });

     
  }

  fechaCreacion!:Date;

  minDate;
  maxDate;
  fechaSeleccionada;
  ingresoDiario!:RespuestaCaja;
  

  mostrarIngresoDiario(){

    
    
   
    this.cajaService.getIngresoDiario(
      this.fechaSeleccionada.year(),
      this.fechaSeleccionada.month()+1,
      this.fechaSeleccionada.date()).subscribe({
        next:(res)=>{
              this.ingresoDiario = res;
        }
      });
  }

}
