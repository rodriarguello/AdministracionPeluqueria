import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {

  constructor(usuarioService:UsuariosService){

    this.dataUsuario$ = usuarioService.getDatosUsuario;

  }
  
  dataUsuario$:Observable<Usuario>;


}
