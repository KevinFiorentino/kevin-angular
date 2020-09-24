import { Injectable } from '@angular/core';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';
import { Contacto } from "../../models/contacto.model"
import { Observable } from 'rxjs';


export const CONFIG_INDEXED_DB: DBConfig = {
	name: 'kevinangular',
	version: 1,
	objectStoresMeta: [{
	  	store: 'favoritos',
	  	storeConfig: { keyPath: 'id', autoIncrement: false },
	  	storeSchema: [
			{ name: 'id', keypath: 'id', options: { unique: true } },
			{ name: 'nombre', keypath: 'nombre', options: { unique: false } },
			{ name: 'imagen', keypath: 'imagen', options: { unique: false } },
			{ name: 'profesion', keypath: 'profesion', options: { unique: false } }
	  	]
	}]
};


@Injectable({
	providedIn: 'root'
})
export class ClienteIndexedDbService {

	constructor(private ngxIndexedDBService: NgxIndexedDBService) { }

	getFavoritosIndexedDB(): Observable<Contacto[]> {
		// Devolvemos los datos de favoritos almacenados en IndexedDB
		return this.ngxIndexedDBService.getAll('favoritos');
	}

	addFavoritoIndexedDB(contacto: Contacto): void {
		this.ngxIndexedDBService
			.add('favoritos', 
			{
				id: contacto.id,
				nombre: contacto.nombre,
				imagen: contacto.imagen,
				profesion: contacto.profesion
			})
			.subscribe((key) => {
				console.log('Nuevo favorito: ', key);
			});
	}

	removeFavoritoIndexedDB(contacto: Contacto): void {
		// Borramos el favorito, devuelve en resto de favoritos en la base
		this.ngxIndexedDBService.delete('favoritos', contacto.id)
			.subscribe((todosLosFavoritos) => {
				console.log('Todos los Favoritos:', todosLosFavoritos);
			});

	}

}
