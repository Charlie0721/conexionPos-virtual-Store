<template>
    <Navbar />
    <br>
    <div class="container">
        <div class="row w-100">
            <div class="card col-md-8 mb-8">
                <div class="card-body d-flex flex-column align-items-center">
                    <div class="d-flex mb-2">
                        <button class="btn btn-dark mr-2" @click="productBycategoriesStore.previousPage"
                            v-if="productBycategoriesStore.page > 0">
                            Anterior
                        </button>
                        <span class="mx-2">pagina: {{ productBycategoriesStore.page }}</span>
                        <button class="btn btn-dark mr-2" @click="productBycategoriesStore.nextPage">Siguiente</button>
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
        <h2 class="text-center">CATEGORIA: {{ categoryName }}</h2>
        <div class="row w-100">

            <div class="col-md-4 mb-4" style="width: 18rem;" v-for="product in productBycategoriesStore.products "
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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useProductsByCategories } from '../store/get-products-by-categories.store'
import defaultImageUrl from '../../assets/logo_celulares.png';
import Navbar from '../../components/navbar.vue'
const productBycategoriesStore = useProductsByCategories();
import { useCartStore } from '../../shopping-cart/stores/shopping-car.store'
import { CartProduct, ProductsByCategoryInterface } from '../interface/category.interface'
const route = useRoute();
let warehouseId = Number(route.params.idalmacen);
let categoryName = String(route.params.nombre);
const searchInput = ref("");
onMounted(async () => {

    await getProduts(warehouseId, categoryName, productBycategoriesStore.page, productBycategoriesStore.limit, productBycategoriesStore.description)

})

async function getProduts(warehouseId: number, categoryName: string, page: number, limit: number, description: string) {

    const productsByCategories = await productBycategoriesStore.getProductsByCategories(warehouseId, categoryName, page, limit, description);
    return productsByCategories
}
const searchoneProduct = async () => {
    searchInput.value
    productBycategoriesStore.searchProduct(searchInput.value.trim().toUpperCase())
}
const handleSearchInput = () => {
    if (!searchInput.value.trim()) {
        productBycategoriesStore.page = 1;
        productBycategoriesStore.limit = 10;
        searchoneProduct();
    }
};

const addToCart = (product: ProductsByCategoryInterface) => {
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