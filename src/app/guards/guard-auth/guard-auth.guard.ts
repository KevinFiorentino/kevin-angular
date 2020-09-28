import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth/login-auth.service'


@Injectable({
	providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {

	constructor(private loginAuthService: LoginAuthService, private router: Router) { }
	
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if(this.loginAuthService.statusAuth()) {
			return true;
		}
		
		this.router.navigate(['/login']);
		return false;
	}
	
}
