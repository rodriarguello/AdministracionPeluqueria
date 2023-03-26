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
    
    this.mostrarClientes();

  }



  listClientes:Cliente[]=[];

  dataTableCliente= new MatTableDataSource(this.listClientes);

  columnasTabla = ["Nombre","Telefono","Email","Acciones"];

  sinDatos:boolean;

  @ViewChild(MatPaginator)paginator!:MatPaginator;


  mostrarClientes():void{

    this.clientesService.mostrarClientes().subscribe({
      next:(res)=>{
        if(res.resultado === 1){
          this.dataTableCliente.data = res.data;
          if(this.dataTableCliente.data.length!=0) this.sinDatos=false;
        }
        else{
          console.log(res.mensaje);
        }
      },
      error:(error)=>{
        console.log(error);
      }
        
    });
     
  }


  agregarCliente():void{
    this.matDialog.open(ModalClientesComponent,{disableClose:true}).afterClosed()
    .subscribe((res)=>{
      if(res==="true") this.mostrarClientes();
    });
    

  }


  actualizarCliente(cliente:Cliente):void{
    this.matDialog.open(ModalClientesComponent,{disableClose:true,data:cliente}).afterClosed().subscribe((res)=>{
      if(res==="true"){
        this.mostrarClientes();
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

        this.clientesService.eliminarCliente(cliente.id).subscribe({
          next:(res)=>{
            if(res.resultado===1){
              this.utilidadService.mostrarAlerta("El cliente se eliminó con éxito","Exito");
              this.mostrarClientes();
            }
            else{
              console.log(res);
              this.utilidadService.mostrarAlerta("No se pudo eliminar el cliente","Error");
            }
          },
          error:(error)=>{
            console.log(error);
            this.utilidadService.mostrarAlerta("No se pudo eliminar el cliente","Error");
          }
        });

      }
    });

  }


  filtrarCliente(event:Event):void{

    const valor = (event.target as HTMLInputElement).value;

    this.dataTableCliente.filter = valor.trim().toLocaleLowerCase();
  }


  mostrarDetalles(cliente:Cliente):void{

    this.matDialog.open(ModalClienteDetalleComponent,{disableClose:true,data:cliente}).afterClosed().subscribe((res)=>{
      if(res){
        this.mostrarClientes();
      }
    });


  }






}
