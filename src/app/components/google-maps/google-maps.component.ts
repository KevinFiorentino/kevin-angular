import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contacto.model';
import { ActivatedRoute } from '@angular/router';

import { Observable, from, of } from 'rxjs';
import { filter, concatMap }  from  'rxjs/operators'; 

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';
import { StoreStateContacto } from '../../models/store-state.model';


@Component({
	selector: 'app-google-maps',
	templateUrl: './google-maps.component.html',
	styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

	public contacto: Observable<Contacto>;
	public idx: number;

	constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) { 

		this.activatedRoute.params.subscribe(params => {
			this.idx = params.id;
		});

		this.store.select("contactos").subscribe(data => {
			of(data.contactos).subscribe(contactos => {
				
				contactos.forEach(con => {
					if(con.id == this.idx) {
						this.contacto = of(con)
					}
				})

			});
		});

	}

	ngOnInit(): void { }

}
