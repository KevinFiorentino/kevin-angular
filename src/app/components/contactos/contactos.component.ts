import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contacto.model';

import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { NuevoContactoAction, EliminarContactoAction } from '../../models/store-state.model';


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

    constructor(private store: Store<AppState>) {
        this.contactos = new Array();
    }

    ngOnInit(): void {

        this.store.select(state => state.contactos)
            .subscribe(data => {
                this.contactos = data.contactos;
            })
    }

    agregarContactoHandle(formContacto: NgForm): void {

        let contacto = new Contacto(this.formulario.nombre, this.formulario.profesion, this.formulario.genero);
        
        this.store.dispatch(new NuevoContactoAction(contacto));

        // El suscribe se encarga de setear el array de contactos.
        // this.contactos.push(contacto);

        // Reiniciamos formulario de la view
        this.formulario = {
            nombre: '',
            profesion: '',
            genero: ''
        };
        formContacto.form.reset(); 
    }

    borrarContactoHandle(contacto: Contacto): void {
        //this.contactos.splice(idContacto, 1);

        this.store.dispatch(new EliminarContactoAction(contacto));
    }

}
