import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Contacto } from 'src/app/clases/Contacto';

@Component({
    selector: 'app-template-contacto',
    templateUrl: './template-contacto.component.html',
    styleUrls: ['./template-contacto.component.scss']
})
export class TemplateContactoComponent implements OnInit {

    @Input() index: string;
    @Input() contacto: Contacto;
    @Output() borrarContacto = new EventEmitter<string>();
    @HostBinding('attr.class') addClass = "col s12 m6 l4 xl3";

    constructor() { }

    ngOnInit(): void { console.log("init") }

    sendBorrarContacto(idContacto: string): void {
        console.log(idContacto);
        this.borrarContacto.emit(idContacto)
    }

}