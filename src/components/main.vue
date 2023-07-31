
<template>
    <div class="jumbotron">
        <h1 class="display-4">¡BIENVENIDO A {{ getWarehouseStore.warehouseName }} ! </h1>
        <hr class="my-4">
        <a class="btn btn-primary btn-lg" role="button" @click="goToProducts(getWarehouseStore.warehouseId)">¡Empecemos!</a>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useGetWarehouseStore } from '.././stores/getWarehouse.store';
import router from '../router/index';

const getWarehouseStore = useGetWarehouseStore();

onMounted(async () => {
    await getWarehouseFunction()
})

let warehouse = reactive<any>([])
const getWarehouseFunction = async () => {
    warehouse = await getWarehouseStore.getWarehouse()
}

const goToProducts = async (warehouseId: number) => {
  router.push(`/products/${warehouseId}`)
}


</script>

<style scoped>
.jumbotron {
    background-color: #f8f9fa;
    padding: 2rem;
}
</style>