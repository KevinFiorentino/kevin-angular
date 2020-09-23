import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';


// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { TemplateContactoComponent } from './components/template-contacto/template-contacto.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { TemplateFavoritoComponent } from './components/template-favorito/template-favorito.component';

// Servicios
import { ClienteMockApiHTTPService } from "./services/cliente-mock-api/cliente-mock-api-http.service";
import { AppConfigService } from "./services/app-config/app-config.service";

// Angular Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';

// IndexedDB
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const configIndexedDB: DBConfig  = {
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


// REDUX
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreStateContacto, StoreStateFavorito, reducerContacto, reducerFavorito, initStoreStateContacto, initStoreStateFavorito, VoteUpEffects, AddFavoritoEffects } from './models/store-state.model';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


export interface AppState {
	contactos: StoreStateContacto,
	favoritos: StoreStateFavorito
};

const reducers: ActionReducerMap<AppState> = {
	contactos: reducerContacto,
	favoritos: reducerFavorito
};

const reducersInitialState = {
	contactos: initStoreStateContacto(),
	favoritos: initStoreStateFavorito()
};


export function servicesOnRun(config: AppConfigService) {
	return () => config.load()
		.then(() => {
			console.log("END SERVICES ON RUN")
		});
}


@NgModule({
	declarations: [
		AppComponent,
		ContactosComponent,
		TemplateContactoComponent,
		NavbarComponent,
		FavoritosComponent,
		TemplateFavoritoComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FlexLayoutModule,
		NgxIndexedDBModule.forRoot(configIndexedDB),

		// REDUX
		NgRxStoreModule.forRoot(reducers, { 
			initialState: reducersInitialState ,
			runtimeChecks: {
				strictStateImmutability: false,
				strictActionImmutability: false
			}
		}),
		EffectsModule.forRoot([ VoteUpEffects, AddFavoritoEffects ]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production
		}),

		// Angular Material
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatToolbarModule,
		MatDialogModule,
		MatBadgeModule
	],
	exports: [ RouterModule ],
	providers: [
		ClienteMockApiHTTPService,
		AppConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: servicesOnRun,
			multi: true,
			deps: [ AppConfigService ]
		},
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
