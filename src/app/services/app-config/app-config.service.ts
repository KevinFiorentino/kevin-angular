import { Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { NuevoContactoAction, NuevoFavoritoAction } from "../../models/store-state.model";
import { ClienteMockApiHTTPService } from "../cliente-mock-api/cliente-mock-api-http.service";
import { ClienteIndexedDbService } from "../cliente-indexed-db/cliente-indexed-db.service"
import { Contacto } from "../../models/contacto.model";

import { trigger, state, style, transition, animate } from '@angular/animations';


// Animación para el botón de favoritos
export const ANIMATED = [
	trigger("disabledButton", [
		state("estateEnable", style({
			backgroundColor: "#f44336"
		})),
		state("estateDisabled", style({
			backgroundColor: "grey"
		})),
		transition("estateEnable-> estateDisabled", [
			animate("1s")
		]),
		transition("estateDisabled -> estateEnable", [
			animate("1s")
		])
	]),
]


// Creamos InjectionToken para pasar la URL de la API del BAck
export interface IAppConfigUrl {
	url_mock_api: string;
}
export const APP_CONFIG = new InjectionToken<IAppConfigUrl>('app.config.url.back');


// Creamos servicio para inicializar REDUX con los datos de contacto y favoritos
@Injectable({
	providedIn: 'root'
})
export class AppConfigService {

	constructor(private clienteIndexedDbService: ClienteIndexedDbService, private clienteMockApiHTTPService: ClienteMockApiHTTPService, private store: Store<AppState>) { }

	loadRedux() {
		return new Promise((resolve, reject) => {

			// MockAPI devuelve un string en latitud y longitud, por lo tanto se le agrega un + adelante para convertirlo en number

			// Cargamos los contacto en Redux desde MockAPI
			this.clienteMockApiHTTPService.getMockApiAll()
				.subscribe(response => {
					response.map(res => {
						this.store.dispatch(new NuevoContactoAction(new Contacto(res.nombre, res.profesion, +res.latitud, +res.longitud, res.imagen, res.id)))
					})
				});

			// Cargamos los favoritos en Redux desde IndexedDB
			this.clienteIndexedDbService.getFavoritosIndexedDB()
				.subscribe((favoritos) => {
					favoritos.map(data => {
						this.store.dispatch(new NuevoFavoritoAction(new Contacto(data.nombre, data.profesion, +data.latitud, +data.longitud, data.imagen, data.id)))
					})
				});
			 
			resolve(true); 
		});
	}

}
