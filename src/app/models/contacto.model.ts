import { v4 as uuid } from "uuid";

export class Contacto {

    public id = uuid();
    public nombre: string;
    public profesion: string;
    public genero: string;

    constructor(nombre: string, profesion: string, genero: string, public votes: number = 0) {
        this.nombre = nombre;
        this.profesion = profesion;
        this.genero = genero;
    }

    public voteUp(): void {
        this.votes++;
    }

    public voteDown(): void {
        this.votes--;
    }

}
