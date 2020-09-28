import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {

    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Capturar mensaje de ingreso al sistema', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('¿Ingresar al sistema de contacto KevinAngular?');
    });

    it('Completar campo de texto Nombre', () => {
        page.navigateTo();
        page.clickLogin()
        page.completeTextInputNombre();
        expect(page.getTextInputNombre()).toEqual('Kevin Fiorentino');
    });

    it('Completar campo de texto Profesion', () => {
        page.navigateTo();
        page.clickLogin()
        page.completeTextInputProfesion();
        expect(page.getTextInputProfesion()).toEqual('Programador');
    });

    it('Completar formulario de contacto y guardar', () => {

        page.navigateTo();
        page.clickLogin()
        page.completeTextInputNombre();
        page.completeTextInputProfesion();
        page.clickAgregarContacto();

        // Muestra el nombre del último contacto
        expect(page.getLastContacto()).toEqual('Kevin Fiorentino');
    });

    
    // FUENTE: https://medium.com/swlh/angular-end-to-end-testing-with-protractor-55897de591be


    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

});
