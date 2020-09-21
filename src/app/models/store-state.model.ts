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
    VOTE_UP = '[Contacto] Vote Up',
    VOTE_DOWN = '[Contacto] Vote Down',
    ELEGIDO_FAVORITO = '[Favorito] Nuevo',
    ELIMINAR_FAVORITO = '[Favorito] Eliminar',
    NOTIFICAR_FAVORITOS = '[Favorito] Notificación',
    REINICIAR_NOTIFICAR_FAVORITOS = '[Favorito] Reiniciar Notificacion',
}


// ACCIONES CONTACTO
export class NuevoContactoAction implements Action {
    type = StoreStatusTypes.NUEVO_CONTACTO;
    constructor(public contacto: Contacto) {}
}
export class EliminarContactoAction implements Action {
    type = StoreStatusTypes.ELIMINAR_CONTACTO;
    constructor(public contacto: Contacto) {}
}
export class VoteUpAction implements Action {
    type = StoreStatusTypes.VOTE_UP;
    constructor(public contacto: Contacto) {}
}
export class VoteDownAction implements Action {
    type = StoreStatusTypes.VOTE_DOWN;
    constructor(public contacto: Contacto) {}
}

// ACCIONES FAVORITOS
export class NuevoFavoritoAction implements Action {
    type = StoreStatusTypes.ELEGIDO_FAVORITO;
    constructor(public contacto: Contacto) {}
}
export class EliminarFavoritoAction implements Action {
    type = StoreStatusTypes.ELIMINAR_FAVORITO;
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

export type ContactoActions = 
    NuevoContactoAction | EliminarContactoAction | VoteUpAction | VoteDownAction |
    NuevoFavoritoAction | EliminarFavoritoAction | NotificarFavoritoAction | ReiniciarNotificacionFavoritoAction;


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
                    ...state.contactos.filter(contacto => contacto.id !== (action as EliminarContactoAction).contacto.id)
                ]
            };
        }
        case StoreStatusTypes.VOTE_UP: {
            let contacto: Contacto = (action as VoteUpAction).contacto;
            contacto.voteUp();
            return { ...state };
        }
        case StoreStatusTypes.VOTE_DOWN: {
            let contacto: Contacto = (action as VoteDownAction).contacto;
            contacto.voteDown();
            return { ...state };
        }
        default: {
            return state;
        }
    }
}

export function reducerFavorito(state: StoreStateFavorito, action: ContactoActions): StoreStateFavorito {
    switch(action.type) {
        case StoreStatusTypes.ELEGIDO_FAVORITO: {
            return {
                ...state,
                favoritos: [ 
                    ...state.favoritos, 
                    (action as NuevoFavoritoAction).contacto 
                ]
            }
        }
        case StoreStatusTypes.ELIMINAR_FAVORITO: {
            return {
                ...state,
                favoritos: [ 
                    ...state.favoritos.filter(contacto => contacto.id !== (action as EliminarFavoritoAction).contacto.id)
                ]
            };
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