import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Contacto } from 'src/app/models/contacto.model';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClienteMockApiHTTPService {

	url: string;

	constructor(private httpClient: HttpClient) { 
		this.url = "https://5f691b59dc0bff0016f44324.mockapi.io/api/mockangular/Contacto";
	}


	// Traer todos los contactos
	public getMockApiAll(): Observable<any> {
		return this.httpClient.get(this.url)
			.pipe(
				catchError(this.handleError)
		  	);
	}

	// Nuevo contacto
	public getMockApiInsert(contacto: Contacto): Observable<any> {
		return this.httpClient.post(this.url, contacto, this.getHttpOption())
			.pipe(
				catchError(this.handleError)
			);
	}

	// Borrar contacto
	public deleteMockApiContacto(id: number): Observable<any> {

		return this.httpClient.delete(this.url+"/"+id)
			.pipe(
				catchError(this.handleError)
			);
	}


	// Función para contruir el header de la petición
	private getHttpOption() {
		return {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		}
	}

	// Funciona para manejar los errores en la API
	private handleError(error: HttpErrorResponse) {
		if(error.error instanceof ErrorEvent) {
			console.log("Error del cliente: ", error.error.message)
		}
		else {
			console.log("Error del servidor:", error.status, error.message)
		}
		return throwError("Error en la comunicación HTTP")
	}

}
