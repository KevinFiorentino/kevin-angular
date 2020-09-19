import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/models/contacto.model';

import { Store } from '@ngrx/store'
import { AppState } from 'src/app/app.module';

@Component({
    selector: 'app-favoritos',
    templateUrl: './favoritos.component.html',
    styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

    favoritos: Contacto[];

    constructor(private store: Store<AppState>) {
        this.favoritos = new Array();
    }

    ngOnInit(): void {

        this.store.select(state => state.favoritos)
            .subscribe(data => {
                this.favoritos = data.favoritos;
            })
    }

}
