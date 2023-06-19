import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {


    estaCargando$ = this.spinnerService.estaCargando$; 

    constructor(private spinnerService:SpinnerService){
      
    }
}
