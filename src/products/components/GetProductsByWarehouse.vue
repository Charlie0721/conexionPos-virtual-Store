<template>
    <div class="container-fluid mx-auto">

        <div class="row w-100">

            <div class="col-md-4 mb-4" style="width: 18rem;" v-for="(product, index) in productsByWarehouseStore.products "
                :key="product.idproducto">
                <div class="card card text-dark bg-ligth">

                    <img :src="product.url_foto || defaultImageUrl" class="card-img-fixed card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ index + 1 }}. {{ product.descripcion }} </h5>
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
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsByWarehouseStore } from '../stores/get-products-by-warehouse.store';
import defaultImageUrl from '../../assets/logo_celulares.png';
const productsByWarehouseStore = useProductsByWarehouseStore();
let page = ref(1);
let limit = ref(10);
let barcode = ref("");
let description = ref("");
let products = reactive<any>([]);
const route = useRoute();
//let defaultImageUrl = '@/assets/logo_celulares.png'

let warehouseId = Number(route.params.idalmacen);

onBeforeMount(async () => {
    await getProducts(warehouseId, page.value, limit.value, barcode.value, description.value);
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
    console.log(defaultImageUrl)
    return products
};
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
</style>