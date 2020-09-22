import { v4 as uuid } from "uuid";

export class Contacto {

    public id = uuid();
    public nombre: string;
    public profesion: string;
    public imagen: string;

    constructor(nombre: string, profesion: string, imagen?: string, public votes: number = 0) {
        this.nombre = nombre;
        this.profesion = profesion;
        this.imagen = imagen;
    }

    public voteUp(): void {
        this.votes++;
    }

    public voteDown(): void {
        this.votes--;
    }

}
