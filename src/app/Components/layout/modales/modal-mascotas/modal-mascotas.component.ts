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

export const MY_DATA_FORMATS={
  parse:{
    dateInput:'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY'
  }
};


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
      private fb:FormBuilder, 
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

    }
    
    


  ngOnInit(): void {
    
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
    this.clienteService.mostrarClientes().subscribe({next:(res)=>{

      if(res.resultado ===1){
        this.listClientes = res.data;
      }
      else{
        console.log(res);
      }

    }});
  }

  mostrarRazas():void{

    this.razaService.mostrarRazas().subscribe({next:(res)=>{
      if(res.resultado===1){
        this.listRazas = res.data;

      }
      else{
        console.log(res);
      }
    }});

  }

  mostrarEnfermedades():void{
    this.enfermedadService.mostrarEnfermedades().subscribe({next:(res)=>{
      if(res.resultado ===1){
        this.listEnfermedades = res.data;
      }
      else{
        console.log(res);
      }
    }});
  }

  mostrarAlergias():void{
    this.alergiaService.mostrarAlergias().subscribe({next:(res)=>{
      if(res.resultado===1){
        this.listAlergias = res.data;
      }
      else{
        console.log(res);
      }
    }});
  }


  agregarActualizarMascota(){

   if(this.dataMascota !=null && this.dataMascota.id != -1){
    const mascota = new Mascota();
    mascota.id = this.dataMascota.id;
    mascota.nombre = this.formMascotas.value.nombre;
    mascota.fechaNacimiento = this.formMascotas.value.fechaNacimiento;
    mascota.idRaza = this.formMascotas.value.raza;
    mascota.idCliente = this.formMascotas.value.cliente;

    const listIdAlergias:Alergia[] = this.formMascotas.value.alergias;
    mascota.idAlergias = listIdAlergias.map(alergia=> alergia.id);


    const listIdEnfermedades:Enfermedad[] = this.formMascotas.value.enfermedades;
    mascota.idEnfermedades = listIdEnfermedades.map(enfermedad=> enfermedad.id);
   
    
    

    this.mascotaService.actualizarMascota(mascota).subscribe({next:(res)=>{
      if(res.resultado===1){
        this.dialogoActual.close("true");
        this.utilidadService.mostrarAlerta("La Mascota se modificó con éxito","Exito");
      }
      else{
        console.log(res);
        this.utilidadService.mostrarAlerta("No se pudo modificar la Mascota","Error");
      }
    },
    error:(error)=>{
      console.log(error);
      this.utilidadService.mostrarAlerta("No se pudo modificar la Mascota","Error");
    }
  });  
  
  }
   else{
    const mascota = new AgregarMascota();
    mascota.nombre = this.formMascotas.value.nombre;
    mascota.fechaNacimiento = this.formMascotas.value.fechaNacimiento;
    mascota.idRaza = this.formMascotas.value.raza;
    mascota.idCliente = this.formMascotas.value.cliente;

    const listAlergias:Alergia[] = this.formMascotas.value.alergias;

    mascota.idAlergias = listAlergias.map(alergia=> alergia.id);

    const listEnfermedades:Enfermedad[] = this.formMascotas.value.enfermedades;
    
    mascota.idEnfermedades = listEnfermedades.map(enfermedad=> enfermedad.id);
    
    this.mascotaService.agregarMascota(mascota).subscribe({
       next:(res)=>{

         if(res.resultado===1){
          
              if(this.dataMascota && this.dataMascota.id===-1){
                this.dialogoActual.close(res.data.id);
              }
              else{
                
                this.dialogoActual.close("true");
              }
              this.utilidadService.mostrarAlerta("Se agrego una nueva Mascota","Exito");

        }
         
        else
        {
          
          this.utilidadService.mostrarAlerta("No se pudo agregar la Mascota","Error"); 
          console.log(res);
           
        }
       },
       error:(error)=>{
        this.utilidadService.mostrarAlerta("No se pudo agregar la Mascota","Error");
        console.log(error);
       }
     });
     
   }
  }


  agregarCliente():void{
    const cliente = new Cliente();
    cliente.id = -1;
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

    const raza = new Raza();
    raza.id = -1;
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

    const enfermedad=new Enfermedad();
    enfermedad.id = -1;

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
    const alergia = new Alergia();
    alergia.id = -1;

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
