import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreStateContacto, StoreStateFavorito, NuevoContactoAction, VoteUpAction, NuevoFavoritoAction, NotificarFavoritoAction, ReiniciarNotificacionFavoritoAction,
	reducerContacto, reducerFavorito, initStoreStateContacto, initStoreStateFavorito } from './store-state.model';

import { Contacto } from './contacto.model'


describe('Testing REDUX', () => {

	it('Inicialización de datos de Contacto', () => {
        // SETUP
        const contacto: Contacto = new Contacto("Kevin Fiorentino", "Programador", 12345, 12345, "URL_IMAGEN");
        const initState: StoreStateContacto = initStoreStateContacto();
        const action: NuevoContactoAction = new NuevoContactoAction(contacto);
        // ACTION
        let state: StoreStateContacto = reducerContacto(initState, action);
        // ASSERTIONS
        expect(state.contactos.length).toEqual(1);
    });

    it('Vote up de un Contacto', () => {
        // SETUP
        const contacto: Contacto = new Contacto("Kevin Fiorentino", "Programador", 12345, 12345, "URL_IMAGEN");
        const initState: StoreStateContacto = initStoreStateContacto();
        const action1: NuevoContactoAction = new NuevoContactoAction(contacto);
        const action2: VoteUpAction = new VoteUpAction(contacto);
        // ACTION
        let state: StoreStateContacto = reducerContacto(initState, action1);
        state = reducerContacto(state, action2);
        // ASSERTIONS
        expect(state.contactos[0].votes).toEqual(1);
    });

    it('Inicialización de datos de Favoritos', () => {
        // SETUP
        const contacto: Contacto = new Contacto("Kevin Fiorentino", "Programador", 12345, 12345, "URL_IMAGEN");
        const initState: StoreStateFavorito = initStoreStateFavorito();
        const action: NuevoFavoritoAction = new NuevoFavoritoAction(contacto);
        // ACTION
        let state: StoreStateFavorito = reducerFavorito(initState, action);
        // ASSERTIONS
        expect(state.favoritos.length).toEqual(1);
    });

    it('Notificaciones de favoritos +1', () => {
        // SETUP
        const contacto: Contacto = new Contacto("Kevin Fiorentino", "Programador", 12345, 12345, "URL_IMAGEN");
        const initState: StoreStateFavorito = initStoreStateFavorito();
        const action1: NuevoFavoritoAction = new NuevoFavoritoAction(contacto);
        const action2: NotificarFavoritoAction = new NotificarFavoritoAction();
        // ACTION
        let state: StoreStateFavorito = reducerFavorito(initState, action1);
        state = reducerFavorito(state, action2);
        // ASSERTIONS
        expect(state.notificacion).toEqual(1);
    });

    it('Reinicio notificaciones de favoritos', () => {
        // SETUP
        const contacto: Contacto = new Contacto("Kevin Fiorentino", "Programador", 12345, 12345, "URL_IMAGEN");
        const initState: StoreStateFavorito = initStoreStateFavorito();
        const action1: NuevoFavoritoAction = new NuevoFavoritoAction(contacto);
        const action2: NotificarFavoritoAction = new NotificarFavoritoAction();
        const action3: ReiniciarNotificacionFavoritoAction = new ReiniciarNotificacionFavoritoAction();
        // ACTION
        let state: StoreStateFavorito = reducerFavorito(initState, action1);
        state = reducerFavorito(state, action2);
        state = reducerFavorito(state, action3);
        // ASSERTIONS
        expect(state.notificacion).toEqual(0);
    });
    
});
