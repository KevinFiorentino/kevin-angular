import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Producto } from 'src/app/clases/Producto';

@Component({
    selector: 'app-template-producto',
    templateUrl: './template-producto.component.html',
    styleUrls: ['./template-producto.component.scss']
})
export class TemplateProductoComponent implements OnInit {

    @Input() index: string;
    @Input() producto: Producto;
    @Output() borrarProducto = new EventEmitter<string>();
    @HostBinding('attr.class') addClass = "caja-producto mb-2";

    constructor() { }

    ngOnInit(): void { console.log("init") }

    sendBorrarProducto(idProducto: string): void {
        console.log(idProducto);
        this.borrarProducto.emit(idProducto)
    }

}