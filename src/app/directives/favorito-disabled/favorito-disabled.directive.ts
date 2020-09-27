import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appFavoritoDisabled]'
})
export class FavoritoDisabledDirective {

	@Input()
	set statusFavorito(status: boolean) {
		// Al encolar el evento en el CallStack, provoca que logre capturar el dato y desactivar el botón correctamente
		setTimeout(() => { 
			this.el.nativeElement.disabled = status;
		}, 0)
	}

	constructor(public el: ElementRef) { }
	
}
