import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Raza } from 'src/app/models/raza';
import { RazasService } from 'src/app/services/razas.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalRazasComponent } from '../../modales/modal-razas/modal-razas.component';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styleUrls: ['./razas.component.css']
})
export class RazasComponent implements OnInit,AfterViewInit{

  constructor(private matDialog:MatDialog, private razasService:RazasService, private utilidadService:UtilidadService){

    this.sinDatos=true;
  }

  listRazas:Raza[]=[];

  razaTableDataSource = new MatTableDataSource(this.listRazas);

  columnasTabla = ["Nombre","Acciones"];

  sinDatos:boolean;

  @ViewChild(MatPaginator)paginator!:MatPaginator;

  ngOnInit(): void {
    this.mostrarRazas();
  
  }
  ngAfterViewInit(): void {
    this.razaTableDataSource.paginator = this.paginator;
  }


  mostrarRazas(): void{
    this.razasService.getAll().subscribe({
      next:(res)=>{
          this.razaTableDataSource.data = res;
          if(this.razaTableDataSource.data.length !=0) this.sinDatos = false;
        
      },
      error:()=>{
      }
  });

  

  }



  agregarRaza(){

    this.matDialog.open(ModalRazasComponent,{disableClose:true}).afterClosed().subscribe((res)=>{
      if(res==="true") this.mostrarRazas();
    });

  }

  modificarRaza(raza:Raza){
    this.matDialog.open(ModalRazasComponent,{disableClose:true,data:raza}).afterClosed().subscribe((res)=>{
      if(res==="true") this.mostrarRazas();
    });
  }

  eliminarRaza(raza:Raza){
    
    swal.fire({
      title:"¿Desea eliminar la Raza?",
      text: raza.nombre,
      icon:"warning",
      iconColor:'red',
      confirmButtonColor:"#3085d6",
      confirmButtonText:"Si, Eliminar",
      showCancelButton:true,
      cancelButtonColor:"#d33",
      cancelButtonText:"No,volver"

    }).then( (res)=>{

      if(res.isConfirmed){
        this.razasService.delete(raza.id!).subscribe({
          next:()=>{

              Swal.fire('Ok',"La raza se eliminó con éxito.",'success');

              this.mostrarRazas();
            
            
          },
          error:(err:HttpErrorResponse)=>{

            if(err.status === 499){
              Swal.fire('Error',`Para eliminar la raza: "${raza.nombre}", primero debe eliminar todas las mascotas que están asociadas a ella.`,'error');
            }else{
              Swal.fire('Error',`No se pudo eliminar la raza.`,'error');
            }

          }

        });
      }
    });
  
  }

  filtrarRaza(event:Event):void{

    const valor = (event.target as HTMLInputElement).value;

    this.razaTableDataSource.filter = valor.trim().toLocaleLowerCase();

  }


}
