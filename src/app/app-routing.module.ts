import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactosComponent } from './components/contactos/contactos.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';


const routes: Routes = [
	{ path: '', redirectTo: '/contactos', pathMatch: 'full' },
	{ path: 'contactos', component: ContactosComponent },
	{ path: 'favoritos', component: FavoritosComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
