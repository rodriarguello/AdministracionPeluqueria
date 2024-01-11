import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import swal from 'sweetalert2';
import { ModalMascotasDetalleComponent } from '../modal-mascotas-detalle/modal-mascotas-detalle.component';
import { ModalMascotasComponent } from '../modal-mascotas/modal-mascotas.component';
import { ModalTurnosClienteComponent } from '../modal-turnos-cliente/modal-turnos-cliente.component';
import { Mascota } from 'src/app/models/mascota/mascota';

@Component({
  selector: 'app-modal-cliente-detalle',
  templateUrl: './modal-cliente-detalle.component.html',
  styleUrls: ['./modal-cliente-detalle.component.css']
})
export class ModalClienteDetalleComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA)idCliente:number, private mascotaService:MascotasService, private clienteService:ClientesService,
  private dialog:MatDialog,private modalActual:MatDialogRef<ModalClienteDetalleComponent>,private utilidadService:UtilidadService){

    this.sinDatos = true;
    this.clienteService.getById(idCliente).subscribe({
      next:(res)=>{
        this.dataCliente = res;
        this.matDataTable.data = res.mascotas!;
      },
      error:()=>{
        this.modalActual.close();
      }
    });
  }
  

  ngOnInit(): void {

    if(this.dataCliente && this.dataCliente.mascotas!.length >0){


      this.sinDatos = false;
      
    }


  }

  dataCliente!:Cliente;
  columnasTabla = ["Nombre","Fecha de Nacimiento", "Acciones"];  
  sinDatos:boolean;
  matDataTable:MatTableDataSource<Mascota> = new MatTableDataSource(null!);

  modificoDato:boolean = false;

  detalleMascota(idMascota:number):void{

    this.mascotaService.mostrarUnaMascota(idMascota).subscribe({
      next:(res)=>{
        if(res.resultado===1){
          this.dialog.open(ModalMascotasDetalleComponent,{disableClose:true,data:res.data})
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

  editarMascota(idMascota:number):void{
    this.mascotaService.mostrarUnaMascota(idMascota).subscribe({
      next:(res)=>{
        if(res.resultado===1){
          
          this.dialog.open(ModalMascotasComponent,{disableClose:true,data:res.data}).afterClosed().subscribe((res)=>{
            if(res==="true"){
              this.mostrarMascotas();
              this.modificoDato = true;
            }
          });
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

  eliminarMascota(id:number, nombre:string):void{
    swal.fire({
      title:"¿Desea eliminar el cliente?",
    text: nombre,
    icon:"warning",
    iconColor:'red',
    confirmButtonColor:"#3085d6",
    confirmButtonText:"Si, Eliminar",
    showCancelButton:true,
    cancelButtonColor:"#d33",
    cancelButtonText:"No,volver"
    }).then((res)=>{
      if(res.isConfirmed){
          this.mascotaService.eliminarMascota(id).subscribe({
          next:(res)=>{
            if(res.resultado===1){
              this.utilidadService.mostrarAlerta("La Mascota se eliminó con éxito","Exito");
              this.mostrarMascotas();
              this.modificoDato = true;
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

  mostrarMascotas():void{

    this.clienteService.getById(this.dataCliente.id!).subscribe({
      next:(res)=>{
          this.matDataTable.data = res.mascotas!;
          if(this.matDataTable.data.length<1) this.sinDatos = true;
      
      },
      error:()=>{
        this.sinDatos = true;
      }
    });

  }

  cerrarModal():void{
    this.modalActual.close(this.modificoDato);
  }

  mostrarHistorialTurnos():void{

    this.dialog.open(ModalTurnosClienteComponent,{data:this.dataCliente});

    
  }

}
