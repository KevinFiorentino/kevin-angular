import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactosComponent } from './components/contactos/contactos.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { LoginComponent } from './components/login/login.component'
import { GoogleMapsComponent } from "./components/google-maps/google-maps.component"

import { GuardAuthGuard } from './guards/guard-auth/guard-auth.guard'

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'contactos', component: ContactosComponent, canActivate: [ GuardAuthGuard ] },
	{ path: 'favoritos', component: FavoritosComponent, canActivate: [ GuardAuthGuard ] },
	{ path: 'contacto/:id', component: GoogleMapsComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
