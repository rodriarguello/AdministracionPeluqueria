import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalClientesComponent } from '../../modales/modal-clientes/modal-clientes.component';
import swal from 'sweetalert2';
import { ModalClienteDetalleComponent } from '../../modales/modal-cliente-detalle/modal-cliente-detalle.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit{
  constructor(private matDialog:MatDialog, private clientesService:ClientesService, private utilidadService:UtilidadService){


    this.sinDatos = true;
  }
  ngAfterViewInit(): void {

    this.dataTableCliente.paginator = this.paginator;
    
  }


  ngOnInit(): void {
    
    this.getAllClientes();

  }



  listClientes:Cliente[]=[];

  dataTableCliente= new MatTableDataSource(this.listClientes);

  columnasTabla = ["Nombre","Telefono","Email","Acciones"];

  sinDatos:boolean;

  @ViewChild(MatPaginator)paginator!:MatPaginator;


  getAllClientes():void{

    this.clientesService.getAll().subscribe({
      next:(res)=>{
          this.dataTableCliente.data = res;
          if(this.dataTableCliente.data.length!=0) this.sinDatos=false;
      },
      error:()=>{
        this.sinDatos = true;
      }
        
    });
     
  }


  agregarCliente():void{
    this.matDialog.open(ModalClientesComponent,{disableClose:true}).afterClosed()
    .subscribe((res)=>{
      if(res==="true") this.getAllClientes();
    });
    

  }


  actualizarCliente(cliente:Cliente):void{
    this.matDialog.open(ModalClientesComponent,{disableClose:true,data:cliente}).afterClosed().subscribe((res)=>{
      if(res==="true"){
        this.getAllClientes();
      }
    });
  }


  eliminarCliente(cliente:Cliente):void{

    swal.fire({
      title:"¿Desea eliminar el cliente?",
    text: cliente.nombre,
    icon:"warning",
    iconColor:'red',
    confirmButtonColor:"#3085d6",
    confirmButtonText:"Si, Eliminar",
    showCancelButton:true,
    cancelButtonColor:"#d33",
    cancelButtonText:"No,volver"
    }).then((res)=>{
      if(res.isConfirmed){

        this.clientesService.delete(cliente.id!).subscribe({
          next:()=>{
              this.utilidadService.alertaExito("El cliente se eliminó con éxito","Exito");
              this.getAllClientes();
          },
          error:(error:HttpErrorResponse)=>{

            if(error.status === 499){
              this.utilidadService.alertaError(`Para eliminar el/la cliente: "${cliente.nombre}", primero debe eliminar todas las mascotas que están asociadas a el/ella.`,"Error");
            }else{

              this.utilidadService.alertaError("No se pudo eliminar el cliente","Error");
            }
          }
        });

      }
    });

  }


  filtrarCliente(event:Event):void{

    const valor = (event.target as HTMLInputElement).value;

    this.dataTableCliente.filter = valor.trim().toLocaleLowerCase();
  }


  mostrarDetalles(idCliente:number):void{

    this.matDialog.open(ModalClienteDetalleComponent,{disableClose:true,data:idCliente}).afterClosed().subscribe((res)=>{
      if(res){
        this.getAllClientes();
      }
    });


  }






}
