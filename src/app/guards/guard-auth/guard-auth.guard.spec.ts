import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GuardAuthGuard } from './guard-auth.guard';
import { Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth/login-auth.service'

describe('Testing Guard de Autorización', () => {

    let guard: GuardAuthGuard;
    let injector: TestBed;
    let authService: LoginAuthService
    let routeMock: any = { snapshot: {} };
    let routeStateMock: any = { snapshot: {}, url: '/contactos' };
    let routerMock = { navigate: jasmine.createSpy('navigate') }


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ 
                LoginAuthService,
                { provide: Router, useValue: routerMock },
            ]
        });
        injector = getTestBed();
        authService = injector.get(LoginAuthService);
        guard = injector.get(GuardAuthGuard);
    });


    it('Inicialización GUARD', () => {
        expect(guard).toBeTruthy();
    });


    it('Usuario sin autorización, redirigido a /login', () => {
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });


    it('Usuario autorizado OK', () => {
        spyOn(authService, 'statusAuth').and.returnValue(true);
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    });

});
