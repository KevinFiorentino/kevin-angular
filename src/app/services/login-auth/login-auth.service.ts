import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoginAuthService {

	constructor(private router: Router) { }

	logIn():void {
		localStorage.setItem("login", "auth");

		this.router.navigate(["contactos"]);
	}

	logOut():void {
		localStorage.setItem("login", "");

		//this.router.navigate(["login"]);
	}

	statusAuth(): boolean {

		let status = localStorage.getItem("login");
		if(status == "auth") {
			return true;
		}
		else {
			return false;
		}

	}
	
}
