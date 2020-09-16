import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/Contacto';

import { FormGroup, FormBuilder, Validators, Form, NgForm } from '@angular/forms'

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

    //El formulario está siendo validado en el HTML, no en este Controlador
    //Es del tipo Template Drive, no Reactive Form

    constructor() {
        this.contactos = new Array();
    }

    ngOnInit(): void {}

    agregarContactoHandle(formContacto: NgForm) {
        let contacto = new Contacto(this.formulario.nombre, this.formulario.profesion, this.formulario.genero);
        this.contactos.push(contacto);

        this.formulario = {
            nombre: '',
            profesion: '',
            genero: ''
        };
        formContacto.form.reset();
    }

    borrarContactoHandle(idContacto: number) {
        this.contactos.splice(idContacto, 1);
    }

}
