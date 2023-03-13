import { Component, OnInit } from '@angular/core';
import { Alergia } from 'src/app/models/alergia';
import { AlergiasService } from 'src/app/services/alergias.service';

@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.component.html',
  styleUrls: ['./alergias.component.css']
})
export class AlergiasComponent implements OnInit {
  ngOnInit(): void {
    this.mostrarAlergias();
  }

  constructor(private alergiasService:AlergiasService){}


listAlergias: Alergia[]= [];


mostrarAlergias():void{

this.alergiasService.mostrarAlergias().subscribe({
  next:(res)=>{
    if(res.resultado === 1){
      
      this.listAlergias = res.data;
    }
    else{
      console.log(res.mensaje);
    }
  }
});

}



}
