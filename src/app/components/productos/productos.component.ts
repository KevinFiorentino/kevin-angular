import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/Producto';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

    productos: Producto[];

    constructor() {
        this.productos = new Array();
    }

    ngOnInit(): void {}

    agregarProductoHandle(title: string, descripción: string) {
        let producto = new Producto(title, descripción);
        this.productos.push(producto);
    }

    borrarProductoHandle(idProducto: number) {
        this.productos.splice(idProducto, 1);
    }

}
