import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  estaCargando$ = new Subject<boolean>();

  mostrar():void{
    this.estaCargando$.next(true);
  }

  ocultar():void{
    this.estaCargando$.next(false);
  }
}
