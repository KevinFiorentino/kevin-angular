import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Contacto } from 'src/app/models/contacto.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';

import { StoreStateContacto } from '../../models/store-state.model';

@Component({
	selector: 'app-google-maps',
	templateUrl: './google-maps.component.html',
	styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

	public contacto$: Observable<StoreStateContacto>;
	public contacto: Contacto;
	public idx: number;
	public lat;
	public long;

//return data.contactos.filter(contacto => contacto.id == params.id);

	constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) { 
		this.activatedRoute.params.subscribe(params => {
			this.idx = params.id;
			this.contacto$ = this.store.select("contactos");
		});
	}

	ngOnInit(): void { 
		this.contacto$.subscribe(data => {
			let con = data.contactos.filter(contacto => contacto.id == this.idx);
			this.contacto = con[0];

			this.lat = con[0].latitud;
			this.long = con[0].longitud;
		})
		//this.lat = this.contacto$.latitud;
		//this.long = this.contacto$.longitud;
	}

}
