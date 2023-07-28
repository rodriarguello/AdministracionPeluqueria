import { MascotaSinDetalles } from "../mascota/mascotaSinDetalles";

export class Turno{
    id!:number;
    fecha!:Date;
    horario!:string;
    disponible!:boolean;
    mascota!:MascotaSinDetalles;
    asistio!:boolean;
    precio!:number;
    
}