import { Component } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  mostrarMascotas:boolean = false;
  mostrarEnfermedades:boolean = false;
  mostrarAlergias:boolean = false;
  mostrarRazas:boolean = false;

}
