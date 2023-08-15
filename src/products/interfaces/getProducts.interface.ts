export interface AllProductsInterface {

    idproducto: number;
    costo: number;
    ultcosto: number;
    codiva: string;
    precioventa: number;
    precioespecial1: number;
    precioespecial2: number;
    descripcion: string;
    barcode: string;
    codigo: string;
    url_foto: string;
}

export interface GetProductsByWareHouseInterface {

    barcode: string;
    cantidad: number;
    codigo: string;
    codiva: string;
    costo: number;
    descripcion: string;
    idproducto: number;
    nomalmacen: string;
    precioventa: number;
    ultcosto: number;
    url_foto: string;
 }

 export interface CartProduct extends GetProductsByWareHouseInterface {
    quantity: number;
}