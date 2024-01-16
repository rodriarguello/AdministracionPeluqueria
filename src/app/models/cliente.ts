import { Mascota } from "./mascota/mascota";

export interface Cliente{

    id?:number,
    nombre:string,
    telefono:number,
    email:string,
    mascotas?:Mascota[]

}