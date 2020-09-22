import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { NuevoContactoAction } from "../../models/store-state.model"
import { ClienteMockApiHTTPService } from "../cliente-mock-api/cliente-mock-api-http.service"
import { Contacto } from "../../models/contacto.model"
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AppConfigService {

	constructor(private ClienteMockApiHTTPService: ClienteMockApiHTTPService, private store: Store<AppState>) { }

	load() {
		return new Promise((resolve, reject) => {

			this.ClienteMockApiHTTPService.getMockApiAll()
				.subscribe(response => {
					response.map(res => {
						this.store.dispatch(new NuevoContactoAction(new Contacto(res.nombre, res.profesion, res.imagen)))
					})
				});
			 
			resolve(true); 
		});
	}

}
