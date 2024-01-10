import { MascotaSinDetalles } from "../mascota/mascotaSinDetalles";

export interface Turno{
    id:number,
    fecha:Date,
    horario:string,
    disponible:boolean,
    mascota:MascotaSinDetalles,
    asistio:boolean,
    precio:number
    
}