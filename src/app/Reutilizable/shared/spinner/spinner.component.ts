import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

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
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {


    estaCargando$ = this.spinnerService.estaCargando$; 

    constructor(private spinnerService:SpinnerService){
      
    }
}
