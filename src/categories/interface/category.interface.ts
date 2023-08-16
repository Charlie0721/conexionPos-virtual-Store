export interface CategoriesInterface {

    idregistro: number;
    codigo: string;
    nombre: string;

}

export interface ProductsByCategoryInterface {

    barcode: string;
    cantidad: number;
    codigo: string;
    codiva: string;
    costo: number
    descripcion: string;
    idproducto: number
    nomalmacen: string
    nombre_nivel: string;
    precioventa: number;
    ultcosto: number;
    url_foto: string;
}

export interface CartProduct extends ProductsByCategoryInterface {
    quantity: number;
}