<template>
    <Navbar />
    <br>
    <div class="container">
        <div class="container">
            <div class="row w-100">
                <div class="card col-md-8 mb-8">
                    <div class="card-body d-flex flex-column align-items-center">
                        <div class="d-flex mb-2">
                            <button class="btn btn-dark mr-2" @click="allProductsStore.previousPage"
                                v-if="allProductsStore.page > 0">
                                Anterior
                            </button>
                            <span class="mx-2">pagina: {{ allProductsStore.page }}</span>
                            <button class="btn btn-dark mr-2" @click="allProductsStore.nextPage">Siguiente</button>
                        </div>
                        <div class="input-group">
                            <input type="search" class="form-control" placeholder="Buscar Producto" v-model="searchInput"
                                @input="productsComponent.handleSearchInput"
                                @keypress.enter="productsComponent.searchoneProduct()" />
                            <span class="input-group-text">
                                <i class="bi bi-search"></i>
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            <br>

            <div class="row w-100">

                <div class="col-md-4 mb-4" style="width: 18rem;" v-for="product in allProductsStore.allProducts "
                    :key="product.idproducto">
                    <div class="card card text-dark bg-ligth">

                        <img :src="product.url_foto || defaultImageUrl" class="card-img-fixed card-img-top centered-img"
                            alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.descripcion }} </h5>
                            <p class="card-text">Código: {{ product.codigo }}</p>
                            <p class="card-text">SKU: {{ product.barcode }}</p>
                            <h5 class="card-text">Precio: $ {{ new Intl.NumberFormat("de-DE").format(product.precioventa) }}
                            </h5>
                            <a href="#" class="btn btn-primary">Editar Producto</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAllProductsStore } from '../stores/get-all-products.store';
import defaultImageUrl from '../../assets/logo_celulares.png';
import { useloginUserStore } from '../../users/stores/login.store'
import router from '../../router/index';
import Swal from 'sweetalert2';
import Navbar from '../../components/navbar.vue'
const loginUserStore = useloginUserStore()
const allProductsStore = useAllProductsStore();
const searchInput = ref("");
onMounted(() => {

    productsComponent.getProductsInComponent(
        allProductsStore.page,
        allProductsStore.limit,
        allProductsStore.barcode,
        allProductsStore.description
    );

})

class ProductsComponent {

    async getProductsInComponent(page: number,
        limit: number,
        barcode: string,
        description: string) {

        const isAuthenticated = loginUserStore.checkAuthentication();
        console.log("isAuthenticated", isAuthenticated)
        if (!isAuthenticated) {
            router.push('/login/conexion-pos-user');
            return;
        }

        const products = await allProductsStore.getProducts(page, limit, barcode, description);

        if (allProductsStore.errorToken === 'Unauthorized') {
            console.log("Unauthorized response received");
            Swal.fire({
                title: '¡Atención!',
                text: 'No está autorizado !',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            router.push('/login/conexion-pos-user')
        }

        return products;
    }
    async searchoneProduct() {
        searchInput.value
        await allProductsStore.searchProduct(searchInput.value.trim().toUpperCase())
    }
    handleSearchInput() {
        if (!searchInput.value.trim().toUpperCase()) {
            allProductsStore.page = 1;
            allProductsStore.limit = 10;
            this.searchoneProduct();
        }
    }
}
const productsComponent = new ProductsComponent()
</script>
  