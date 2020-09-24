import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginAuthService } from '../../services/login-auth/login-auth.service'


@Injectable({
	providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {

	constructor(private loginAuthService: LoginAuthService) { }
	
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let statusAuth = this.loginAuthService.statusAuth();
		return statusAuth;
	}
	
}
