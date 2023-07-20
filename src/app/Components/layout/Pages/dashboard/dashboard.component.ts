import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCaja } from 'src/app/models/respuesta-caja';
import { Turno } from 'src/app/models/turno/turno';
import { Usuario } from 'src/app/models/usuario';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(usuarioService:UsuariosService, private dashboardService:DashboardService){

    this.dataUsuario$ = usuarioService.getDatosUsuario;
    
  }
  ngOnInit(): void {
    
    this.mostrarResumenDiario();
   
    
  }
 
  listTurnosOcupados:Turno[]=[];
  listTurnosDisponibles:Turno[]=[];
  dataIngresos!:RespuestaCaja;

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

  

}
