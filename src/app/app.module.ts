import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, forwardRef } from '@angular/core';
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
import { LoginComponent } from './components/login/login.component';

// Servicios
import { ClienteMockApiHTTPService } from "./services/cliente-mock-api/cliente-mock-api-http.service";
import { AppConfigService, IAppConfigUrl, APP_CONFIG } from "./services/app-config/app-config.service";
import { ClienteIndexedDbService, CONFIG_INDEXED_DB } from "./services/cliente-indexed-db/cliente-indexed-db.service";

// Directivas
import { FavoritoDisabledDirective } from './directives/favorito-disabled/favorito-disabled.directive';


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
import { NgxIndexedDBModule } from 'ngx-indexed-db';


// REDUX
import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreStateContacto, StoreStateFavorito, 
	reducerContacto, reducerFavorito, initStoreStateContacto, initStoreStateFavorito, VoteUpEffects } from './models/store-state.model';
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


// Función que se ejecuta antes que arranque el proyecto Angular
export function servicesOnRun(config: AppConfigService) {
	return () => config.loadRedux()
		.then(() => {
			console.log("END SERVICES ON RUN")
		});
}


// Variable de entorno que se injecta por @InjectionToken
const APP_CONFIG_VALUE_URL: IAppConfigUrl = {
	url_mock_api: environment.url_mock_api
}


// Google Maps
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';


@NgModule({
	declarations: [
		AppComponent,
		ContactosComponent,
		TemplateContactoComponent,
		NavbarComponent,
		FavoritosComponent,
		TemplateFavoritoComponent,
		LoginComponent,
		GoogleMapsComponent,
		FavoritoDisabledDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FlexLayoutModule,
		NgxIndexedDBModule.forRoot(CONFIG_INDEXED_DB),

		// REDUX
		NgRxStoreModule.forRoot(reducers, { 
			initialState: reducersInitialState ,
			runtimeChecks: {
				strictStateImmutability: false,
				strictActionImmutability: false
			}
		}),
		EffectsModule.forRoot([ VoteUpEffects ]),
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
		MatBadgeModule,

		// Google Maps
		AgmCoreModule.forRoot({
			apiKey: ''
		})
	],
	exports: [ RouterModule ],
	providers: [
		ClienteMockApiHTTPService,
		{ provide: AppConfigService, useClass: forwardRef(() => AppConfigService) },
		{
			provide: APP_INITIALIZER,
			useFactory: servicesOnRun,
			multi: true,
			deps: [ AppConfigService ]
		},
		{ provide: APP_CONFIG, useValue: APP_CONFIG_VALUE_URL },
		ClienteIndexedDbService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
