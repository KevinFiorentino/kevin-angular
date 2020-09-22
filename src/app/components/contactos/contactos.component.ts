import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { Contacto } from 'src/app/models/contacto.model';

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { NuevoContactoAction, EliminarContactoAction } from '../../models/store-state.model';

import { ClienteMockApiHTTPService } from "../../services/cliente-mock-api/cliente-mock-api-http.service"

@Component({
    selector: 'app-contactos',
    templateUrl: './contactos.component.html',
    styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

    contactos: Contacto[];
    formulario = {
        nombre: '',
        profesion: ''
    };

    //El formulario está siendo validado en el HTML, no en este Controlador
    //Es del tipo Template Drive, no Reactive Form

    constructor(private ClienteMockApiHTTPService: ClienteMockApiHTTPService, private store: Store<AppState>) {
        this.contactos = new Array();
    }

    ngOnInit(): void {

        this.store.select(state => state.contactos)
            .subscribe(data => {
                this.contactos = data.contactos;
            })
    }

    agregarContactoHandle(formContacto: NgForm): void {

        let img = "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-256.png";

        let contacto = new Contacto(this.formulario.nombre, this.formulario.profesion, img);

        // Guardamos contacto en el back
        this.ClienteMockApiHTTPService.getMockApiInsert(contacto)
            .subscribe(res => {
                // Guardamos contacto en redux
                this.store.dispatch(new NuevoContactoAction(res));
            });
        
        

        // Reiniciamos formulario de la view
        this.formulario = {
            nombre: '',
            profesion: ''
        };
        formContacto.form.reset(); 
    }

}
