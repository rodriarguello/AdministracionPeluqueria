import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { UtilidadService } from 'src/app/services/utilidad.service';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css']
})
export class ModalClientesComponent  implements OnInit{

  constructor(private fb:FormBuilder,private modalActual:MatDialogRef<ModalClientesComponent>,
    @Inject(MAT_DIALOG_DATA)public dataCliente:Cliente, private clientesService:ClientesService,private utilidadService:UtilidadService){
      
      this.formClientes = fb.group({
        nombre:['',Validators.required],
        telefono:['',Validators.required],
        mail:['',Validators.required]
      });

      this.tituloAccion="Agregar Cliente";
      this.botonAccion = "Agregar";

      this.nombreCliente = '';
      this.mailCliente = '';
      this.telefonoCliente = '';
  }
  ngOnInit(): void {

    if(this.dataCliente != null)
    {
      this.tituloAccion = "Actualizar Cliente";
      this.botonAccion = "Actualizar";

      this.nombreCliente = this.dataCliente.nombre;
      this.telefonoCliente=this.dataCliente.telefono.toString();
      this.mailCliente = this.dataCliente.mail;

      this.formClientes.patchValue({
        nombre: this.dataCliente.nombre,
        telefono:this.dataCliente.telefono,
        mail: this.dataCliente.mail
      });

    }
  }

  formClientes:FormGroup;
  tituloAccion:string;
  botonAccion:string;
  nombreCliente:string;
  telefonoCliente:string;
  mailCliente:string;


  agregarActualizarCliente(){

    if(this.dataCliente!=null){
      //Metodo modificar
      const cliente = new Cliente();
      cliente.id = this.dataCliente.id;
      cliente.nombre = this.formClientes.value.nombre;
      cliente.telefono = this.formClientes.value.telefono;
      cliente.mail = this.formClientes.value.mail;
 

      this.clientesService.actualizarCliente(cliente).subscribe({
        next:(res)=>{
          if(res.resultado ===1){
            this.utilidadService.mostrarAlerta("El cliente se modificó con éxito","Exito");
            this.modalActual.close("true");
          }
          else{
            this.utilidadService.mostrarAlerta("No se pudo modificar el Cliente","Error");
          }
        },
        error:()=>{
          this.utilidadService.mostrarAlerta("No se pudo modificar el Cliente","Error");
        }
      });

    }
    else{
      //Metodo agregar

      const cliente = new Cliente();
      cliente.nombre = this.formClientes.value.nombre;
      cliente.telefono = this.formClientes.value.telefono;
      cliente.mail = this.formClientes.value.mail;

      this.clientesService.agregarCliente(cliente).subscribe({
        next:(res)=>{
          if(res.resultado ===1){ 
            this.utilidadService.mostrarAlerta("Se agregó un nuevo Cliente","Exito");
            this.modalActual.close("true");
          }
          else{
            this.utilidadService.mostrarAlerta("No se pudo agregar el Cliente","Error");
          }
        },
        error:()=>{
          this.utilidadService.mostrarAlerta("No se pudo agregar el Cliente","Error");
        }

      });
      


    }



  }



}
