<template>
  <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Tienda Virtual</a>


      <a class="navbar-brand"><router-link to="/shopping-cart" v-if="cartStore.totalItems > 0"><i
            class="bi bi-cart-fill"></i> <span class="badge bg-danger">
            {{ cartStore.totalItems }}
          </span></router-link></a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link " aria-current="page"> <router-link to="/categories">Categorias</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page"> <router-link
                :to="'/products/' + getWareHouseStore.warehouseId">Productos</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><router-link to="/login/conexion-pos-user">Login</router-link></a>
          </li>
          <li class="nav-item">
            <a class="navbar-brand" href="/conexion-pos-user">Registrar usuario de Conexion Pos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><router-link to="/products">Editar productos</router-link></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useGetWarehouseStore } from '../stores/getWarehouse.store'
import { useCartStore } from '../shopping-cart/stores/shopping-car.store'
const getWareHouseStore = useGetWarehouseStore();
const cartStore = useCartStore();
getWareHouseStore.warehouseId
onMounted(async () => {
  await getWarehouse()
})

const getWarehouse = async () => {
  const warehouse = await getWareHouseStore.getWarehouse()
  return warehouse
}

</script>