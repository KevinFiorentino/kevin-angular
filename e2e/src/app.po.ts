import { browser, by, element } from 'protractor';

export class AppPage {

    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getTitleText(): Promise<string> {
        // Capturar mensaje de ingreso al sistema
        return element(by.css('app-root mat-card h1')).getText() as Promise<string>;
    }

    clickLogin(): void {
        // Hacemos click en el botón del login
        element(by.id('btn-login')).click();
    }

    completeTextInputNombre(): void {
        // Completamos campo de texto Nombre
        element(by.id('nombre')).sendKeys("Kevin Fiorentino");
    }
    getTextInputNombre(): Promise<string> {
        // Obtenemos el valor del campo nombre
        return element(by.id('nombre')).getAttribute('value') as Promise<string>;
    }

    completeTextInputProfesion(): void {
        // Completamos campo de texto Nombre
        element(by.id('profesion')).sendKeys("Programador");
    }
    getTextInputProfesion(): Promise<string> {
        // Obtenemos el valor del campo profesion
        return element(by.id('profesion')).getAttribute('value') as Promise<string>;
    }

    clickAgregarContacto(): void {
        // Hacemos click en el botón para crear el contacto
        element(by.id('btn-new-contacto')).click();
    }

    getLastContacto(): Promise<string> {
        // Camptura el nombre del último contacto
        return element.all(by.css('.mat-card .nombre-contacto')).last().getText() as Promise<string>;
    }

    // FUENTE: https://medium.com/swlh/angular-end-to-end-testing-with-protractor-55897de591be

}
