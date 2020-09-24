import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Contacto } from 'src/app/models/contacto.model';

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { NuevoFavoritoAction, EliminarContactoAction, NotificarFavoritoAction, VoteUpAction, VoteDownAction } from '../../models/store-state.model';

import { ClienteMockApiHTTPService } from "../../services/cliente-mock-api/cliente-mock-api-http.service"
import { ClienteIndexedDbService } from "../../services/cliente-indexed-db/cliente-indexed-db.service"


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

    constructor(private clienteIndexedDbService: ClienteIndexedDbService, private ClienteMockApiHTTPService: ClienteMockApiHTTPService, private store: Store<AppState>) { }

    ngOnInit(): void { }
    

    sendBorrarContacto(): void {

        // Borramos el contacto del MockAPI
        this.ClienteMockApiHTTPService.deleteMockApiContacto(this.contacto.id)
            .subscribe(res => {
                // Borramos el contacto de Redux
                this.store.dispatch(new EliminarContactoAction(this.contacto))
            });   
    }

    agregarFavoritoHandle() {
        // Actualizamos Redux e IndexedDB con el contacto agregado a favoritos
        this.store.dispatch(new NuevoFavoritoAction(this.contacto));
        this.store.dispatch(new NotificarFavoritoAction());

        this.clienteIndexedDbService.addFavoritoIndexedDB(this.contacto);

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