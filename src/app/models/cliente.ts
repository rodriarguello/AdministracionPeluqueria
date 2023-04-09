import { Mascota } from "./mascota/mascota";

export class Cliente{

    id!:number;
    nombre!:string;
    telefono!:number;
    email!:string;
    mascotas!:Mascota[];

}