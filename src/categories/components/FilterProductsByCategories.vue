<template>
    <Navbar />
    <br>
    <div class="container">
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
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { useProductsByCategories } from '../store/get-products-by-categories.store'
import defaultImageUrl from '../../assets/logo_celulares.png';
import Navbar from '../../components/navbar.vue'
const productBycategoriesStore = useProductsByCategories();
const route = useRoute();
let warehouseId = Number(route.params.idalmacen);
let categoryName = String(route.params.nombre);

onMounted(async () => {

    await getProduts(warehouseId, categoryName, productBycategoriesStore.page, productBycategoriesStore.limit)

})

async function getProduts(warehouseId: number, categoryName: string, page: number, limit: number) {

    const productsByCategories = await productBycategoriesStore.getProductsByCategories(warehouseId, categoryName, page, limit);
    return productsByCategories
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