import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearTituloFechas'
})
export class FormatearTituloFechasPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(!value) return value;

    
    value = value.charAt(0).toUpperCase()+value.substring(1,11)+value.charAt(11).toUpperCase()+ value.substring(12);

    
    return value;
  }

}
