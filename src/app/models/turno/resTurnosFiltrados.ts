import { Turno } from "./turno";

export interface ResTurnosFiltrados{
    lunes:Turno[],
    martes:Turno[],
    miercoles:Turno[],
    jueves:Turno[],
    viernes:Turno[],
    sabado:Turno[],
    domingo:Turno[],
    cantidadHorarios:number


}