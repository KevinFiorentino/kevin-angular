import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { NuevoContactoAction, NuevoFavoritoAction } from "../../models/store-state.model"
import { ClienteMockApiHTTPService } from "../cliente-mock-api/cliente-mock-api-http.service"
import { Contacto } from "../../models/contacto.model"
import { Observable } from 'rxjs';

import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
	providedIn: 'root'
})
export class AppConfigService {

	constructor(private dbService: NgxIndexedDBService, private ClienteMockApiHTTPService: ClienteMockApiHTTPService, private store: Store<AppState>) { }

	load() {
		return new Promise((resolve, reject) => {

			// Cargamos los contacto en Redux desde MockAPI
			this.ClienteMockApiHTTPService.getMockApiAll()
				.subscribe(response => {
					response.map(res => {
						this.store.dispatch(new NuevoContactoAction(new Contacto(res.nombre, res.profesion, res.imagen, res.id)))
					})
				});

			// Cargamos los favoritos en Redux desde IndexedDB
			this.dbService.getAll('favoritos')
				.subscribe((favoritos) => {
					favoritos.map(data => {
						this.store.dispatch(new NuevoFavoritoAction(new Contacto(data.nombre, data.profesion, data.imagen, data.id)))
					})
				});
			 
			resolve(true); 
		});
	}

}
