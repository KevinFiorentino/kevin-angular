export class Contacto {

    public nombre: string;
    public profesion: string;
    public genero: string;
    public votes: number;

    constructor(nombre: string, profesion: string, genero: string, votes: number = 0) {
        this.nombre = nombre;
        this.profesion = profesion;
        this.genero = genero;
        this.votes = votes;
    }

    public voteUp(): void {
        this.votes++;
    }

    public voteDown(): void {
        this.votes--;
    }

}
