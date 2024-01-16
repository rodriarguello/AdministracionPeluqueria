import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable, take } from 'rxjs';
import { RespuestaCaja } from 'src/app/models/respuesta-caja';
import { Usuario } from 'src/app/models/usuario';
import { CajaService } from 'src/app/services/caja.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-resumen-caja-mensual',
  templateUrl: './resumen-caja-mensual.component.html',
  styleUrls: ['./resumen-caja-mensual.component.css']
})
export class ResumenCajaMensualComponent {

  constructor(private cajaService:CajaService, usuarioService:UsuariosService){

     this.datosUsuario$ = usuarioService.getDatosUsuario;
    this.fechaActual = moment();
    this.anioSeleccionado = this.fechaActual.year();
    this.mesSeleccionado = this.fechaActual.month() + 1;

    
  }
    ngOnInit(): void {
        
      this.generarListaAnios();
      this.mostrarIngresoMensual();
  
        
    }
  
    ingresoMensual!: RespuestaCaja;
    
    listAnios:number[] =[]; 
    listMeses = [
    {
      numero:1,
      nombre:'Enero'
    },
    {
      numero:2,
      nombre:'Febrero'
    },
    {
      numero:3,
      nombre:'Marzo'
    },
    {
      numero:4,
      nombre:'Abril'
    },
    {
      numero:5,
      nombre:'Mayo'
    },
    {
      numero:6,
      nombre:'Junio'
    },
    {
      numero:7,
      nombre:'Julio'
    },
    {
      numero:8,
      nombre:'Agosto'
    },
    {
      numero:9,
      nombre:'Septiembre'
    },
    {
      numero:10,
      nombre:'Octubre'
    },
    {
      numero:11,
      nombre:'Noviembre'
    },
    {
      numero:12,
      nombre:'Diciembre'
    }
    ];
    
    anioSeleccionado:number;
    mesSeleccionado:number;
    
    anioMostrado!:number;
    mesMostrado!:number;
    
    datosUsuario$:Observable<Usuario>;
    
    fechaActual!:any;
  
  
    generarListaAnios():void{
  
      this.datosUsuario$.pipe(take(1)).subscribe({
        next:(datosUsuario)=>{
  
          const fechaCreacion = moment(datosUsuario.fechaCreacion);
          
  
          let anioInicio = fechaCreacion.year();
          
          
          let diferencia = this.fechaActual.diff(fechaCreacion,'years');
          
          if(fechaCreacion.add(diferencia,'year').year()!= this.fechaActual.year()){
            diferencia++;
          }
  
  
          for (let index = 0; index <= diferencia ; index++) {
            
            this.listAnios.push(anioInicio);
            anioInicio++;
            
          }
          
  
  
        }
      })
    }
  
    
    
    
    mostrarIngresoMensual():void{
      
      

      if(this.anioMostrado === this.anioSeleccionado && this.mesMostrado === this.mesSeleccionado) return;
      
      this.anioMostrado = this.anioSeleccionado;

      this.mesMostrado = this.mesSeleccionado;

      
      
      this.cajaService.getIngresoMensual(this.anioSeleccionado,this.mesSeleccionado).subscribe({
        next:(res)=>{
            this.ingresoMensual = res;
        }
      });
  
    }
}
