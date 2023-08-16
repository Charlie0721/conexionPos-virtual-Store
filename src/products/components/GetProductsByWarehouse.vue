<template>
    <Navbar />
    <br>
    <div class="container">
        <div class="row w-100">
            <div class="card col-md-8 mb-8">
                <div class="card-body d-flex flex-column align-items-center">
                    <div class="d-flex mb-2">
                        <button class="btn btn-dark mr-2" @click="productsByWarehouseStore.previousPage"
                            v-if="productsByWarehouseStore.page > 0">
                            Anterior
                        </button>
                        <span class="mx-2">pagina: {{ productsByWarehouseStore.page }}</span>
                        <button class="btn btn-dark mr-2" @click="productsByWarehouseStore.nextPage">Siguiente</button>
                    </div>
                    <div class="input-group">
                        <input type="search" class="form-control" placeholder="Buscar Producto" v-model="searchInput"
                            @input="handleSearchInput" @keypress.enter="searchoneProduct()" />
                        <span class="input-group-text">
                            <i class="bi bi-search"></i>
                        </span>
                    </div>
                </div>
            </div>

        </div>

        <br>
        <div class="row w-100">

            <div class="col-md-4 mb-4" style="width: 18rem;" v-for="product in productsByWarehouseStore.products "
                :key="product.idproducto">
                <div class="card card text-dark bg-ligth">

                    <img :src="product.url_foto || defaultImageUrl" class="card-img-fixed card-img-top centered-img"
                        alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.descripcion }} </h5>
                        <p class="card-text">Stock: {{ product.cantidad }}
                        </p>
                        <p class="card-text">Código: {{ product.codigo }}</p>
                        <p class="card-text">SKU: {{ product.barcode }}</p>
                        <h5 class="card-text">Precio: $ {{ new Intl.NumberFormat("de-DE").format(product.precioventa) }}
                        </h5>
                        <button class="btn btn-primary" @click="addToCart(product)"><i class="bi bi-cart-plus-fill">
                                Añadir </i></button>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>
  

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsByWarehouseStore } from '../stores/get-products-by-warehouse.store';
import defaultImageUrl from '../../assets/logo_celulares.png';
import Navbar from '../../components/navbar.vue'
import { CartProduct,GetProductsByWareHouseInterface } from '../interfaces/getProducts.interface';
import {useCartStore} from '../../shopping-cart/stores/shopping-car.store'
const productsByWarehouseStore = useProductsByWarehouseStore();
let barcode = ref("");
let description = ref("");
const route = useRoute();
let warehouseId = Number(route.params.idalmacen);
const searchInput = ref("");
onBeforeMount(async () => {
    await getProducts(warehouseId, productsByWarehouseStore.page, productsByWarehouseStore.limit, barcode.value, description.value);
});

const getProducts = async (
    warehouseId: number,
    page: number,
    limit: number,
    barcode: string,
    description: string
) => {
    const products = await productsByWarehouseStore.getAllProducts(
        warehouseId,
        page,
        limit,
        barcode,
        description
    );
    return products
};

const searchoneProduct = async () => {
    searchInput.value
    productsByWarehouseStore.searchProduct(searchInput.value.trim().toUpperCase())
}
const handleSearchInput = () => {
    if (!searchInput.value.trim().toUpperCase()) {
        productsByWarehouseStore.page = 1;
        productsByWarehouseStore.limit = 10;
        searchoneProduct();
    }
};

const addToCart = (product: GetProductsByWareHouseInterface) => {
    const cartStore = useCartStore(); 
    const productWithQuantity: CartProduct = { ...product, quantity: 1 }; 
    cartStore.addToCart(productWithQuantity);
}

</script>
<style scoped>
.card-content {
    padding: 1rem;
}

.custom-col {
    flex: 0 0 calc(33.33% - 1rem);
    max-width: calc(33.33% - 1rem);
}

.card-img-fixed {
    width: 170px;
    height: 170px;
    object-fit: cover;
}

.centered-img {
    margin: 0 auto;
    display: block;
}
</style>