import { v4 as uuid } from "uuid";

export class Contacto {

    public id: number;
    public nombre: string;
    public profesion: string;
    public imagen: string;
    public latitud: number;
    public longitud: number;
    public votes: number;
    public isFavorite: boolean;

    constructor(nombre: string, profesion: string, lat: number, long: number, imagen?: string, id?: number) {
        this.nombre = nombre;
        this.profesion = profesion;
        this.latitud = lat;
        this.longitud = long;
        this.imagen = imagen;
        this.id = id;
        this.votes = 0;
        this.isFavorite = false;
    }

    public voteUp(): void {
        this.votes++;
    }

    public voteDown(): void {
        this.votes--;
    }

    public setIsFavoritoTrue(): void {
        this.isFavorite = true;
    }

    public setIsFavoritoFalse(): void {
        this.isFavorite = false;
    }

}
