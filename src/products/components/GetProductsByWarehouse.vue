<template>
    <h1>Products</h1>
</template>
  

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsByWarehouseStore } from '../stores/get-products-by-warehouse.store';

const productsByWarehouseStore = useProductsByWarehouseStore();
let page = ref(1);
let limit = ref(10);
let barcode = ref("");
let description = ref("");
let products = reactive<any>([]);
const route = useRoute();
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
    products = await productsByWarehouseStore.getAllProducts(
        warehouseId,
        page,
        limit,
        barcode,
        description
    );
};
</script>