import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Contacto } from 'src/app/models/contacto.model';

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { NuevoFavoritoAction, NotificarFavoritoAction, VoteUpAction, VoteDownAction } from '../../models/store-state.model';

@Component({
    selector: 'app-template-contacto',
    templateUrl: './template-contacto.component.html',
    styleUrls: ['./template-contacto.component.scss']
})
export class TemplateContactoComponent implements OnInit {

    @Input() index: string;
    @Input() contacto: Contacto;
    //@Output() borrarContacto = new EventEmitter<Contacto>();
    //@HostBinding('attr.class') addClass = "col s12 m6 l4 xl3";

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {}

    sendBorrarContacto(): void {
        //this.borrarContacto.emit(this.contacto)
    }

    agregarFavoritoHandle() {
        console.log("Nuevo FAVORITO");

        this.store.dispatch(new NuevoFavoritoAction(this.contacto));
        this.store.dispatch(new NotificarFavoritoAction());
        return false;
    }

    sendContactoVoteUp() {
		this.store.dispatch(new VoteUpAction(this.contacto));
		return false;
	}

	sendContactoVoteDown() {
		this.store.dispatch(new VoteDownAction(this.contacto));
		return false;
	}

}