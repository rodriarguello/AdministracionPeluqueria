import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Enfermedad } from 'src/app/models/enfermedad';
import { EnfermedadesService } from 'src/app/services/enfermedades.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import swal from 'sweetalert2';
import { ModalEnfermedadesComponent } from '../../modales/modal-enfermedades/modal-enfermedades.component';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enfermedades',
  templateUrl: './enfermedades.component.html',
  styleUrls: ['./enfermedades.component.css']
})
export class EnfermedadesComponent implements OnInit,AfterViewInit {
  
  constructor(private matDialog:MatDialog, private enfermedadesService:EnfermedadesService,
    private utilidadesService:UtilidadService){
      this.sinDatos=true;
  }
  
  sinDatos:boolean;

  listEnfermedades:Enfermedad[] = [];

  matDataSource = new MatTableDataSource(this.listEnfermedades);

  columnasTabla:string [] = ['Nombre','Acciones'];

  @ViewChild(MatPaginator)paginacionTabla!:MatPaginator;
  
  ngOnInit(): void {
    
    this.mostrarEnfermedades();

  }
  
  ngAfterViewInit(): void {
  
    this.matDataSource.paginator = this.paginacionTabla;
  
  }

  mostrarEnfermedades():void{

    this.enfermedadesService.getAll().subscribe({
      next:(res)=>{
          this.matDataSource.data = res;
          if(this.matDataSource.data.length != 0) this.sinDatos = false;

      },
      error:(error)=>{
      }
    });

    

  }



  agregarEnfermedad():void{

    this.matDialog.open(ModalEnfermedadesComponent,{disableClose:true})
    .afterClosed().subscribe(
      (res)=>{
        if(res ==="true") this.mostrarEnfermedades();
      }
    );
  }

  actualizarEnfermedad(enfermedad:Enfermedad):void{
    this.matDialog.open(ModalEnfermedadesComponent,{disableClose:true, data:enfermedad}).afterClosed()
    .subscribe(
      (res)=> {
        if (res==="true") this.mostrarEnfermedades();
      }
      
    );
  }

  eliminarEnfermedad(enfermedad:Enfermedad):void{

    swal.fire({
      title:"¿Desea eliminar la Enfermedad?",
      text: enfermedad.nombre,
      icon:"warning",
      confirmButtonColor:"#3085d6",
      iconColor:'red',
      confirmButtonText:"Si, Eliminar",
      showCancelButton:true,
      cancelButtonColor:"#d33",
      cancelButtonText:"No,volver"


    }).then( (res)=>{
      if(res.isConfirmed){
        this.enfermedadesService.delete(enfermedad.id!).subscribe({
          next:()=>{
              Swal.fire('Ok','La enfermedad se eliminó con éxito','success');
              this.mostrarEnfermedades();
          },
          error:(err:HttpErrorResponse)=>{
            if(err.status === 499){

              Swal.fire(
                'Error',
                `Para eliminar la enfermedad: "${enfermedad.nombre}", primero debe eliminar todas las mascotas que están asociadas a ella.`,
                'error'
                );
            }else{
              Swal.fire(
                'Error',
                'No se pudo eliminar la enfermedad.',
                'error')
            }
          }
        });
      }
    }

    );
  }


  aplicarFiltroTabla(event:Event){
    const valor = (event.target as HTMLInputElement).value;
    this.matDataSource.filter = valor.trim().toLocaleLowerCase();
  }



}
