import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';

import { ReiniciarNotificacionFavoritoAction } from '../../models/store-state.model';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	notificar_favoritos: number;
	hiddenBadgeFavoritos: boolean;

	constructor(private store: Store<AppState>) {
		this.notificar_favoritos = 0;
		this.hiddenBadgeFavoritos = true;
	}

	ngOnInit(): void {

        this.store.select(state => state.favoritos.notificacion)
            .subscribe(data => {
				this.notificar_favoritos = data;
				if(data > 0) {
					this.hiddenBadgeFavoritos = false;
				}
            })
	}

	ocultarBadgeFavoritos(): void {
		this.hiddenBadgeFavoritos = true;
		this.store.dispatch(new ReiniciarNotificacionFavoritoAction());
	}

}
