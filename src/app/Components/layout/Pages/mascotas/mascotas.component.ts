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

    this.mascotaService.mostrarMascotas().subscribe({
      next:(res)=>{
        
        if(res.resultado ===1){
          
          this.dataTableSource.data = res.data;
          if(this.dataTableSource.data.length>0) this.sinDatos = false;
          
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
          this.mascotaService.eliminarMascota(mascota.id).subscribe({
          next:(res)=>{
            if(res.resultado===1){
              this.utilidadService.mostrarAlerta("La Mascota se eliminó con éxito","Exito");
              this.mostrarMascotas();
            }
            else{
              this.utilidadService.mostrarAlerta("No se pudo eliminar la Mascota","Error");
              console.log(res);
            }
          },
          error:(error)=>{
            
            this.utilidadService.mostrarAlerta("No se pudo eliminar la Mascota","Error");
            console.log(error);
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
