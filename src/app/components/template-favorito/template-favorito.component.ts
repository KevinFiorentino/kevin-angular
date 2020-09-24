import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Contacto } from 'src/app/models/contacto.model';

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { EliminarFavoritoAction, VoteUpAction, VoteDownAction } from '../../models/store-state.model';

import { ClienteIndexedDbService } from "../../services/cliente-indexed-db/cliente-indexed-db.service"


@Component({
	selector: 'app-template-favorito',
	templateUrl: './template-favorito.component.html',
	styleUrls: ['./template-favorito.component.scss']
})
export class TemplateFavoritoComponent implements OnInit {

    @Input() index: string;
    @Input() contacto: Contacto;
    //@Output() borrarContacto = new EventEmitter<Contacto>();

	constructor(private clienteIndexedDbService: ClienteIndexedDbService, private store: Store<AppState>) { }

	ngOnInit(): void {}

	sendBorrarFavorito(): void {
		// Borramos el favorito de Redux y de IndexedDB
		this.store.dispatch(new EliminarFavoritoAction(this.contacto));

		this.clienteIndexedDbService.removeFavoritoIndexedDB(this.contacto);
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
