import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

/* Mis Componentes */
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { TemplateContactoComponent } from './components/template-contacto/template-contacto.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

//Angular flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

/* Angular Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
	declarations: [
		AppComponent,
		ContactosComponent,
		TemplateContactoComponent,
		NavbarComponent,
		FavoritosComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		FlexLayoutModule,

		/* Angular Material */
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatToolbarModule,
		MatDialogModule
	],
	exports: [ RouterModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
