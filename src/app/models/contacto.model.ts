import { v4 as uuid } from "uuid";

export class Contacto {

    public id: number;
    public nombre: string;
    public profesion: string;
    public imagen: string;
    public latitud: number;
    public longitud: number;

    constructor(nombre: string, profesion: string, lat: number, long: number, imagen?: string, id?: number, public votes: number = 0) {
        this.nombre = nombre;
        this.profesion = profesion;
        this.latitud = lat;
        this.longitud = long;
        this.imagen = imagen;
        this.id = id;
    }

    public voteUp(): void {
        this.votes++;
    }

    public voteDown(): void {
        this.votes--;
    }

}
