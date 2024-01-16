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
        nombre:['',[Validators.required,Validators.minLength(2),Validators.maxLength(40)]],
        telefono:['',[Validators.required,Validators.max(9999999999999)]],
        email:['',[Validators.email,Validators.required, Validators.maxLength(40)]]
      });

      this.tituloAccion="Agregar Cliente";
      this.botonAccion = "Agregar";

      this.nombreCliente = '';
      this.emailCliente = '';
      this.telefonoCliente = '';
  }
  ngOnInit(): void {

    if(this.dataCliente != null && this.dataCliente.id !=(-1))
    {
      this.tituloAccion = "Actualizar Cliente";
      this.botonAccion = "Actualizar";

      this.nombreCliente = this.dataCliente.nombre;
      this.telefonoCliente=this.dataCliente.telefono.toString();
      this.emailCliente = this.dataCliente.email;
      

      this.formClientes.patchValue({
        nombre: this.dataCliente.nombre,
        telefono:this.dataCliente.telefono,
        email: this.dataCliente.email
      });

    }
  }

  formClientes:FormGroup;
  tituloAccion:string;
  botonAccion:string;
  nombreCliente:string;
  telefonoCliente:string;
  emailCliente:string;


  agregarActualizarCliente(){


    if(this.dataCliente!=null && this.dataCliente.id !=(-1)){
      //Metodo modificar
      
      
      const cliente:Cliente = {
        
        id: this.dataCliente.id,
        nombre: this.formClientes.value.nombre,
        telefono: this.formClientes.value.telefono,
        email: this.formClientes.value.email,
        mascotas: this.dataCliente.mascotas
      };
 

      this.clientesService.update(cliente).subscribe({
        next:()=>{
            this.utilidadService.alertaExito("El cliente se modificó con éxito","Exito");
            this.modalActual.close("true");
         
        },
        error:()=>{
          this.utilidadService.alertaError("No se pudo modificar el Cliente","Error");
        }
      });

    }
    else{
      //Metodo agregar

      const cliente: Cliente ={
        nombre: this.formClientes.value.nombre,
        telefono: this.formClientes.value.telefono,
        email: this.formClientes.value.email,
      } 

      this.clientesService.create(cliente).subscribe({
        next:(res)=>{
            this.utilidadService.alertaExito("Se agregó un nuevo Cliente","Exito");
            if(this.dataCliente != null){
              if(this.dataCliente.id===(-1))
                this.modalActual.close(res.id);
            }
            else{
              
              this.modalActual.close("true");
            }
        },
        error:()=>{
          this.utilidadService.alertaError("No se pudo agregar el Cliente","Error");
        }

      });
      


    }



  }



}
