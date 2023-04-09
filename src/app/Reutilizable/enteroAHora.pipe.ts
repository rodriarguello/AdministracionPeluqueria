import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enteroAHora'
})
export class enteroAHoraPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    if(value===0) return "00:00";


    return (value<10)? `0${value}:00`: `${value}:00`;
  }

}
