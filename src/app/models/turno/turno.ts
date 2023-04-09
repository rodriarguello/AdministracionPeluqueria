import { Fecha } from "../fecha";
import { Horario } from "../horario";
import { MascotaSinDetalles } from "../mascota/mascotaSinDetalles";

export class Turno{
    id!:number;
    fecha!:Fecha;
    horario!:Horario;
    disponible!:boolean;
    mascota!:MascotaSinDetalles;
    asistio!:boolean;
    precio!:number;
    
}