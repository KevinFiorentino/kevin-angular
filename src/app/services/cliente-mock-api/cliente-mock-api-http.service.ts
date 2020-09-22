import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contacto } from 'src/app/models/contacto.model';

import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ClienteMockApiHTTPService {

	constructor(private httpClient: HttpClient) { }

	getMockApiAll(): Observable<any> {

		const URL = "https://5f691b59dc0bff0016f44324.mockapi.io/api/mockangular/Contacto";

		return this.httpClient.get(URL)

	}

}
