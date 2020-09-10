import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { TemplateProductoComponent } from './components/template-producto/template-producto.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';


const routes: Routes = [
	{ path: '', redirectTo: '/productos', pathMatch: 'full' },
	{ path: 'productos', component: ProductosComponent },
	{ path: 'favoritos', component: FavoritosComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		ProductosComponent,
		TemplateProductoComponent,
		NavbarComponent,
		FavoritosComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
