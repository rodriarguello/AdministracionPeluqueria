import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/models/mascota/mascota';
import { MascotasService } from 'src/app/services/mascotas.service';
import { ModalMascotasDetalleComponent } from '../../modales/modal-mascotas-detalle/modal-mascotas-detalle.component';
import { ModalMascotasComponent } from '../../modales/modal-mascotas/modal-mascotas.component';
import swal from 'sweetalert2';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit, AfterViewInit{

  constructor(private mascotaService:MascotasService, private matDialog:MatDialog, private utilidadService:UtilidadService){

    this.sinDatos = true;

  }
  ngAfterViewInit(): void {
    this.dataTableSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    
    this.mostrarMascotas();
  }

  columnasTabla = ['Nombre','Propietario','Raza','Acciones'];

  public listMascotas:Mascota[]=[];

  dataTableSource = new MatTableDataSource(this.listMascotas);

  sinDatos:boolean;
  
  @ViewChild(MatPaginator)paginator!:MatPaginator;


  mostrarMascotas():void{

    this.mascotaService.getAll().subscribe({
      next:(res)=>{
          this.dataTableSource.data = res;
          if(this.dataTableSource.data.length>0) this.sinDatos = false;
      },
      error:()=>{
      }

    });
  }
 
  agregarMascota(){

    this.matDialog.open(ModalMascotasComponent,{disableClose:true}).afterClosed().subscribe((res)=>{
      if(res==='true')
      this.mostrarMascotas();
    });
  }

  actualizarMascota(mascota:Mascota){

    this.matDialog.open(ModalMascotasComponent,{data:mascota}).afterClosed().subscribe((res)=>{
      if(res==="true") this.mostrarMascotas();
    });
  }
  
  mostrarDetalles(mascota:Mascota){

    this.matDialog.open(ModalMascotasDetalleComponent,{data:mascota});
  }

  eliminarMascota(mascota:Mascota):void{
    swal.fire({
      title:"¿Desea eliminar el cliente?",
    text: mascota.nombre,
    icon:"warning",
    iconColor:'red',
    confirmButtonColor:"#3085d6",
    confirmButtonText:"Si, Eliminar",
    showCancelButton:true,
    cancelButtonColor:"#d33",
    cancelButtonText:"No,volver"
    }).then((res)=>{
      if(res.isConfirmed){
          this.mascotaService.delete(mascota.id).subscribe({
          next:()=>{
              this.utilidadService.alertaExito("La Mascota se eliminó con éxito","Exito");
              this.mostrarMascotas();
            
          },
          error:(err:HttpErrorResponse)=>{
            if(err.status === 499){
              this.utilidadService.alertaError(err.error,"Error");
            }else{
              
              this.utilidadService.alertaError("No se pudo eliminar la Mascota","Error");
            }
          }
        });
      }
    });


  }

  filtrar(event:Event):void{

    const value = (event.target as HTMLInputElement).value;
    this.dataTableSource.filter = value.trim().toLocaleLowerCase();

  }

}
