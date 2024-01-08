import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Alergia } from 'src/app/models/alergia';
import { AlergiasService } from 'src/app/services/alergias.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlergiasComponent } from '../../modales/modal-alergias/modal-alergias.component';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.component.html',
  styleUrls: ['./alergias.component.css']
})
export class AlergiasComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {

    
    this.mostrarAlergias();
  }
  
  constructor(private alergiasService:AlergiasService, private  matDialog:MatDialog){
      
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

this.alergiasService.getAll().subscribe({
  next:(res)=>{
      
      this.dataListaAlergias.data = res;
      if(this.dataListaAlergias.data.length != 0) this.sinDatos = false;  
    
  },
  error:()=>{

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
   Swal.fire({
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
      this.alergiasService.delete(alergia.id!).subscribe({
        next:()=>{
            Swal.fire(
              'Ok',
              'La Alergia se eliminó con éxito',
              'success'
            );
            this.mostrarAlergias();
            
        },
        error:(err:HttpErrorResponse)=>{

          if(err.status === 499){
            Swal.fire({
              title:'Error al eliminar',
              text: `Para eliminar la alergia: "${alergia.nombre}", primero debe eliminar todas las mascotas que están asociadas a ella.`,
              
              width:'300px'
              

            });
          }else{
            Swal.fire(
              'Error al eliminar',
              'No se pudo eliminar la Alergia',
              'error'
              );
          }
        }

      }
      );
    }
    
   });

  
}

}
