import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/clases/Contacto';

@Component({
    selector: 'app-contactos',
    templateUrl: './contactos.component.html',
    styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

    contactos: Contacto[];

    constructor() {
        this.contactos = new Array();
    }

    ngOnInit(): void {}

    agregarContactoHandle(title: string, descripción: string, genero: string) {
        let contacto = new Contacto(title, descripción, genero);
        this.contactos.push(contacto);
    }

    borrarContactoHandle(idContacto: number) {
        this.contactos.splice(idContacto, 1);
    }

}
