import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCaja } from 'src/app/models/respuesta-caja';
import { Usuario } from 'src/app/models/usuario';
import { CajaService } from 'src/app/services/caja.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as moment from 'moment';

@Component({
  selector: 'app-resumen-caja-anual',
  templateUrl: './resumen-caja-anual.component.html',
  styleUrls: ['./resumen-caja-anual.component.css']
})
export class ResumenCajaAnualComponent implements OnInit {

constructor(private cajaService:CajaService,usuarioService:UsuariosService){

  this.datosUsuario$ = usuarioService.getDatosUsuario;
  this.fechaActual = moment();
  this.anioSeleccionado = this.fechaActual.year();
}
  ngOnInit(): void {
      
    this.generarListaAnios();
    this.mostrarIngresoAnual();

      
  }

  ingresoAnual!: RespuestaCaja;
  
  listAnios:number[] =[]; 
  
  anioSeleccionado!:number;
  
  anioMostrado!:number;
  
  datosUsuario$:Observable<Usuario>;
  
  fechaActual!:any;


  generarListaAnios():void{

    this.datosUsuario$.subscribe({
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

  
  
  
  mostrarIngresoAnual():void{

    if(this.anioMostrado === this.anioSeleccionado) return;
    
    this.anioMostrado = this.anioSeleccionado;
    
    this.cajaService.mostrarIngresosPorAnio(this.anioSeleccionado).subscribe({
      next:(res)=>{
        if(res.resultado ===1){
          this.ingresoAnual = res.data;
        }
      }
    });

  }


}
