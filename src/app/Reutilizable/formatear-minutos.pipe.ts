import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearMinutos'
})
export class FormatearMinutosPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    
    if(value===60) return "1 hora"

    if(value>60){
      return (value%60 != 0) ? `${Math.floor(value/60)}:${value%60} horas`:`${value/60} horas` ;  
    }


    return `${value} min.`;
  }

}
