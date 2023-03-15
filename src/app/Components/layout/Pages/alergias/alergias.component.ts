import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Alergia } from 'src/app/models/alergia';
import { AlergiasService } from 'src/app/services/alergias.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlergiasComponent } from '../../modales/modal-alergias/modal-alergias.component';

import swal from 'sweetalert2';
import { UtilidadService } from 'src/app/services/utilidad.service';


@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.component.html',
  styleUrls: ['./alergias.component.css']
})
export class AlergiasComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {

    
    this.mostrarAlergias();
  }
  
  constructor(private alergiasService:AlergiasService, private  matDialog:MatDialog, 
    private utilidadService:UtilidadService){
      
      this.sinDatos = true;

  }

  ngAfterViewInit(): void {
    this.dataListaAlergias.paginator = this.paginacionTabla;
  }

listAlergias: Alergia[]= [];

dataListaAlergias = new MatTableDataSource(this.listAlergias);

columnasTabla:string[] = ['Nombre', 'Acciones'];

@ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

sinDatos:boolean;

mostrarAlergias():void{

this.alergiasService.mostrarAlergias().subscribe({
  next:(res)=>{
    if(res.resultado === 1){
      
      this.dataListaAlergias.data = res.data;
      if(this.dataListaAlergias.data.length != 0) this.sinDatos = false;  
    }
    else{
      console.log(res.mensaje);
    }
  }
});



}


aplicarFiltroTabla(event:Event):void{

  const filtroValor = (event.target as HTMLInputElement).value;
  this.dataListaAlergias.filter = filtroValor.trim().toLocaleLowerCase();
}


agregarAlergia():void{

  this.matDialog.open(ModalAlergiasComponent,{disableClose:true}
  ).afterClosed().subscribe(res=>{
    if(res==="true") this.mostrarAlergias();
  });
}

actualizarAlergia(alergia:Alergia):void{

  this.matDialog.open(ModalAlergiasComponent,{disableClose:true, data:alergia}
  ).afterClosed().subscribe(res=>{
    if(res==="true") this.mostrarAlergias();
  });
}

eliminarAlergia(alergia:Alergia){
   swal.fire({
    title:"¿Desea eliminar la alergia?",
    text: alergia.nombre,
    icon:"warning",
    iconColor:'red',
    confirmButtonColor:"#3085d6",
    confirmButtonText:"Si, Eliminar",
    showCancelButton:true,
    cancelButtonColor:"#d33",
    cancelButtonText:"No,volver"
   }).then((res)=>{
    if(res.isConfirmed){
      this.alergiasService.eliminarAlergia(alergia.id).subscribe({
        next:(res)=>{
          if(res.resultado===1){
            this.utilidadService.mostrarAlerta("La Alergia se eliminó con éxito","Exito");
            this.mostrarAlergias();
            
          }
          else
          this.utilidadService.mostrarAlerta("No se pudo eliminar la Alergia","Error");
          
        },
        error:()=>{
          this.utilidadService.mostrarAlerta("No se pudo eliminar la Alergia","Error");
        }

      }
      );
    }
    
   });

  
}

}
