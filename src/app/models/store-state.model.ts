import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contacto } from './contacto.model';


// ESTADO
export interface StoreStateContacto {
    contactos: Contacto[];
}
export interface StoreStateFavorito {
    favoritos: Contacto[];
    notificacion: number
}

export const initStoreStateContacto = function() {
    return {
        contactos: []
    }
}
export const initStoreStateFavorito = function() {
    return {
        favoritos: [],
        notificacion: 0
    }
}

export enum StoreStatusTypes {
    NUEVO_CONTACTO = '[Contacto] Nuevo',
    ELIMINAR_CONTACTO = '[Contacto] Eliminar',
    ELEGIDO_FAVORITO = '[Favorito] Nuevo',
    NOTIFICAR_FAVORITOS = '[Favorito] Notificación',
    REINICIAR_NOTIFICAR_FAVORITOS = '[Favorito] Reiniciar norificacion'
}


// ACCIONES
export class NuevoContactoAction implements Action {
    type = StoreStatusTypes.NUEVO_CONTACTO;
    constructor(public contacto: Contacto) {}
}
export class EliminarContactoAction implements Action {
    type = StoreStatusTypes.ELIMINAR_CONTACTO;
    constructor(public contacto: Contacto) {}
}

export class NuevoFavoritoAction implements Action {
    type = StoreStatusTypes.ELEGIDO_FAVORITO;
    constructor(public contacto: Contacto) {}
}
export class NotificarFavoritoAction implements Action {
    type = StoreStatusTypes.NOTIFICAR_FAVORITOS;
    constructor() {}
}
export class ReiniciarNotificacionFavoritoAction implements Action {
    type = StoreStatusTypes.REINICIAR_NOTIFICAR_FAVORITOS;
    constructor() {}
}

export type ContactoActions = NuevoContactoAction | EliminarContactoAction | NuevoFavoritoAction | NotificarFavoritoAction | ReiniciarNotificacionFavoritoAction;


// REDUCERS
export function reducerContacto(state: StoreStateContacto, action: ContactoActions): StoreStateContacto {
    switch(action.type) {
        case StoreStatusTypes.NUEVO_CONTACTO: {
            return {
                ...state,
                contactos: [ 
                    ...state.contactos, 
                    (action as NuevoContactoAction).contacto 
                ]
            };
        }
        case StoreStatusTypes.ELIMINAR_CONTACTO: {
            return {
                ...state,
                contactos: [ 
                    //...state.contactos.splice(0, 1),
                    //state.contactos.filter(contacto => contacto.nombre !== (action as EliminarContactoAction).contacto)
                ]
            };
        }
        default: {
            return state;
        }
    }
}

export function reducerFavorito(state: StoreStateFavorito, action: ContactoActions): StoreStateFavorito {
    switch(action.type) {
        case StoreStatusTypes.ELEGIDO_FAVORITO: {
            //state.contactos.forEach(x => x.setSelected(false));
            //const fav: Contacto = (action as NuevoFavoritoAction).contacto;
            //fav.setSelected(true);
            return {
                ...state,
                favoritos: [ 
                    ...state.favoritos, 
                    (action as NuevoFavoritoAction).contacto 
                ]
            }
        }
        case StoreStatusTypes.NOTIFICAR_FAVORITOS: {
            return {
                ...state,
                notificacion: state.notificacion + 1
            }
        }
        case StoreStatusTypes.REINICIAR_NOTIFICAR_FAVORITOS: {
            return {
                ...state,
                notificacion: 0
            }
        }
        default: {
            return state;
        }
    }
}


// EFFECTS
@Injectable()
export class ContactoEffects {
    /*
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(StoreStatusTypes.ELEGIDO_FAVORITO),
        map((action: NuevoContactoAction) => new NuevoFavoritoAction(action.contacto))
    );

    constructor(private actions$: Actions) {
        console.log("EFFECT");
    }
    */
}