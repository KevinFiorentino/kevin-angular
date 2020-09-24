import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../../services/login-auth/login-auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private loginAuthService: LoginAuthService) { }

	ngOnInit(): void { }

	logIn():void {
		this.loginAuthService.logIn();
	}

}
