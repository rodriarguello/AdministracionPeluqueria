import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgregarMascota } from 'src/app/models/mascota/agregarMascota';
import { Alergia } from 'src/app/models/alergia';
import { Cliente } from 'src/app/models/cliente';
import { Enfermedad } from 'src/app/models/enfermedad';
import { Mascota } from 'src/app/models/mascota/mascota';
import { Raza } from 'src/app/models/raza';
import { AlergiasService } from 'src/app/services/alergias.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { EnfermedadesService } from 'src/app/services/enfermedades.service';
import { MascotasService } from 'src/app/services/mascotas.service';
import { RazasService } from 'src/app/services/razas.service';
import { UtilidadService } from 'src/app/services/utilidad.service';
import { ModalAlergiasComponent } from '../modal-alergias/modal-alergias.component';
import { ModalClientesComponent } from '../modal-clientes/modal-clientes.component';
import { ModalEnfermedadesComponent } from '../modal-enfermedades/modal-enfermedades.component';
import { ModalRazasComponent } from '../modal-razas/modal-razas.component';
import { MY_DATA_FORMATS } from 'src/app/spinner/spinner.component';



@Component({
  selector: 'app-modal-mascotas',
  templateUrl: './modal-mascotas.component.html',
  styleUrls: ['./modal-mascotas.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue:MY_DATA_FORMATS}
  ]
})
export class ModalMascotasComponent implements OnInit {



    constructor(
      fb:FormBuilder, 
      private dialogoActual:MatDialogRef<ModalMascotasComponent>, 
      @Inject(MAT_DIALOG_DATA)public dataMascota:Mascota,
      private mascotaService:MascotasService,
      private clienteService:ClientesService,
      private razaService:RazasService,
      private alergiaService:AlergiasService, 
      private enfermedadService:EnfermedadesService,
      private utilidadService:UtilidadService,
      private nuevoDialog:MatDialog)
      {

      this.formMascotas = fb.group({
        
        nombre:['',Validators.required],
        fechaNacimiento:['',Validators.required],
        cliente:['',Validators.required],
        raza:['',Validators.required],
        alergias:['',Validators.required],
        enfermedades:['',Validators.required],      
      
      });
        
      this.tituloAccion = "Agregar Mascota";
      this.botonAccion = "Agregar";

      if(this.dataMascota!=null && this.dataMascota.id != -1){
       
        
        this.tituloAccion = "Actualizar Mascota";
        this.botonAccion = "Actualizar";
        this.formMascotas.patchValue({
          nombre:this.dataMascota.nombre,
          fechaNacimiento:this.dataMascota.fechaNacimiento,
          cliente:this.dataMascota.cliente.id,
          raza:this.dataMascota.raza.id,
          enfermedades:this.dataMascota.enfermedades,
          alergias:this.dataMascota.alergias
        });
  
      }
  
      this.cargarSelect();
    }
    
    


  ngOnInit(): void {
    
    

  }




  formMascotas:FormGroup;
  botonAccion:string;
  tituloAccion:string; 

  listClientes:Cliente[] = [];
  listRazas:Raza[] = [];
  listEnfermedades:Enfermedad[] = [];
  listAlergias:Alergia [] = [];

  cargarSelect():void{

    this.mostrarClientes();

    this.mostrarRazas();

    this.mostrarEnfermedades();

    this.mostrarAlergias();
  }

  compareFn(alergia1: Alergia, alergia2: Alergia): boolean {
    return alergia1 && alergia2 ? alergia1.nombre === alergia2.nombre : alergia1 === alergia2;
  }


  mostrarClientes():void{
    this.clienteService.getAll().subscribe({
      next:(res)=>{
        this.listClientes = res;
      },
      error:()=>{

      }
  });
  }

  mostrarRazas():void{

    this.razaService.getAll().subscribe({
      next:(res)=>{
        this.listRazas = res;
      },
      error:()=>{

      }
    });

  }

  mostrarEnfermedades():void{
    this.enfermedadService.getAll().subscribe({
      next:(res)=>{
        this.listEnfermedades = res;
      },
      error:()=>{

      }
  });
  }

  mostrarAlergias():void{
    this.alergiaService.getAll().subscribe({
      next:(res)=>{
        this.listAlergias = res;
      },
      error:()=>{

      }
  });
  }


  agregarActualizarMascota(){

   if(this.dataMascota !=null && this.dataMascota.id != -1){
     const listAlergias:Alergia[] = this.formMascotas.value.alergias;
     const listIdAlergias = listAlergias.map(alergia=> alergia.id!);

     const listEnfermedades:Enfermedad[] = this.formMascotas.value.enfermedades;
     const listIdEnfermedades = listEnfermedades.map(enfermedad=> enfermedad.id!);
    
     const mascota: AgregarMascota = {
      nombre: this.formMascotas.value.nombre,
      fechaNacimiento: this.formMascotas.value.fechaNacimiento,
      idRaza: this.formMascotas.value.raza,
      idCliente: this.formMascotas.value.cliente,
      idAlergias:listIdAlergias,
      idEnfermedades:listIdEnfermedades
    };
    

    this.mascotaService.update(this.dataMascota.id, mascota).subscribe({next:(res)=>{
        this.dialogoActual.close("true");
        this.utilidadService.alertaExito("La Mascota se modificó con éxito","Exito");
   
    },
    error:()=>{
      this.utilidadService.alertaError("No se pudo modificar la Mascota","Error");
    }
  });  
  
  }
   else{
     const listAlergias:Alergia[] = this.formMascotas.value.alergias;
 
     const listIdAlergias = listAlergias.map(alergia=> alergia.id!);
 
     const listEnfermedades:Enfermedad[] = this.formMascotas.value.enfermedades;
     
    const listIdEnfermedades = listEnfermedades.map(enfermedad=> enfermedad.id!);
    const mascota:AgregarMascota = {

      nombre: this.formMascotas.value.nombre,
      fechaNacimiento :this.formMascotas.value.fechaNacimiento,
      idRaza :this.formMascotas.value.raza,
      idCliente :this.formMascotas.value.cliente,
      idAlergias: listIdAlergias,
      idEnfermedades: listIdEnfermedades
    };

    
    this.mascotaService.create(mascota).subscribe({
       next:(res)=>{
              if(this.dataMascota && this.dataMascota.id===-1){
                this.dialogoActual.close(res.id);
              }
              else{
                
                this.dialogoActual.close("true");
              }
              this.utilidadService.alertaExito("Se agrego una nueva Mascota","Exito");

            },
       error:()=>{
        this.utilidadService.alertaError("No se pudo agregar la Mascota","Error");
       }
     });
     
   }
  }


  agregarCliente():void{
    const cliente :Cliente = {

      id: -1,
      nombre: null!,
      email: null!,
      telefono: null!
    };
    
    this.nuevoDialog.open(ModalClientesComponent,{disableClose:true,data:cliente}).afterClosed().subscribe(
      (res)=>{
        if(res>0){

          this.mostrarClientes();
          
          this.formMascotas.patchValue({
            cliente:res
          });
        }
      }
    );

  }


  agregarRaza():void{

    const raza:Raza = {
        id: -1,
        nombre: null!

    };
    this.nuevoDialog.open(ModalRazasComponent,{disableClose:true,data:raza}).afterClosed().subscribe(
      (res)=>{
        if(res>0){
          this.mostrarRazas();
          this.formMascotas.patchValue({
            raza:res
          });
        }
      }
    );

  }

  agregarEnfermedad():void{

    const enfermedad= {
      id: -1,
      nombre:null!
    }

    this.nuevoDialog.open(ModalEnfermedadesComponent,{disableClose:true,data:enfermedad}).afterClosed().subscribe(
      (res)=>{
        if(res>0){
          this.mostrarEnfermedades();
          this.formMascotas.patchValue({
            enfermedad : res
          });
        }
      }
    );
  }

  agregarAlergia():void{
    const alergia:Alergia = {
      id: -1,
      nombre:null!

    }

    this.nuevoDialog.open(ModalAlergiasComponent,{disableClose:true,data:alergia}).afterClosed().subscribe(
      (res)=>{
        if(res>0){
          this.mostrarAlergias();
          this.formMascotas.patchValue({
            alergia:res
          });
        }
      }
    );
  }

}
