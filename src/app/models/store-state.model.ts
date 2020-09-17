import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contacto } from './contacto.model';


// ESTADO
export interface StoreState {
    contactos: Contacto[];
    //favoritos: Contacto;
}

export const initStoreState = function() {
    return {
        contactos: [],
        favorito: null
    }
}

export enum StoreStatusTypes {
    NUEVO_CONTACTO = '[Contacto] Nuevo',
    ELIMINAR_CONTACTO = '[Contacto] Eliminar',
    ELEGIDO_FAVORITO = '[Contacto] Favorito'
}


// ACCIONES
export class NuevoContactoAction implements Action {
    type = StoreStatusTypes.NUEVO_CONTACTO;
    constructor(public contacto: Contacto) {}
}

export class EliminarContactoAction implements Action {
    type = StoreStatusTypes.ELIMINAR_CONTACTO;
    constructor() {}
}

export class NuevoFavoritoAction implements Action {
    type = StoreStatusTypes.ELEGIDO_FAVORITO;
    constructor(public contacto: Contacto) {}
}

export type ContactoActions = NuevoContactoAction | EliminarContactoAction | NuevoFavoritoAction;


// REDUCERS
export function reducerContacto(state: StoreState, action: ContactoActions): StoreState {

    let kev = new Contacto("kev", "prog", "asd");

    switch(action.type) {
        case StoreStatusTypes.NUEVO_CONTACTO: {
            return {
                ...state,
                contactos: [ ...state.contactos, (action as NuevoContactoAction).contacto ]
            };
        }
        case StoreStatusTypes.ELIMINAR_CONTACTO: {
            return {
                //FALTA BORRAR CONTACTO DEL ESTADO
                ...state,
            };
        }
        case StoreStatusTypes.ELEGIDO_FAVORITO: {
            //state.contactos.forEach(x => x.setSelected(false));
            //const fav: Contacto = (action as NuevoFavoritoAction).contacto;
            //fav.setSelected(true);
            return {
                ...state, //favoritos: fav
            }
        }
        default : {
            return state;
        }
    }

    //return state;
}


// EFFECTS
@Injectable()
export class ContactoEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(StoreStatusTypes.ELEGIDO_FAVORITO),
        map((action: NuevoContactoAction) => new NuevoFavoritoAction(action.contacto))
    );

    constructor(private actions$: Actions) {}
}