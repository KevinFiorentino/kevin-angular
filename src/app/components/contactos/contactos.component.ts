import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/clases/Contacto';

import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
    selector: 'app-contactos',
    templateUrl: './contactos.component.html',
    styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

    contactos: Contacto[];
    formulario = {
        nombre: '',
        profesion: '',
        genero: ''
    };

    f: FormGroup;

    constructor() {
        this.contactos = new Array();
    }

    ngOnInit(): void {}

    agregarContactoHandle(formContacto) {
        let contacto = new Contacto(this.formulario.nombre, this.formulario.profesion, this.formulario.genero);
        this.contactos.push(contacto);

        this.formulario = {
            nombre: '',
            profesion: '',
            genero: ''
        };
        formContacto.fomr.reset();
    }

    borrarContactoHandle(idContacto: number) {
        this.contactos.splice(idContacto, 1);
    }

}
