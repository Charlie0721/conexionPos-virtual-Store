<template>
    <div>
        <Navbar />
        <br>
        <h1>Get Products</h1>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAllProductsStore } from '../stores/get-all-products.store';
import router from '../../router/index';
import Swal from 'sweetalert2';
import Navbar from '../../components/navbar.vue'

const allProductsStore = useAllProductsStore();


onMounted(async () => {
    try {
        const products = await productsComponent.getProductsInComponent(
            allProductsStore.page,
            allProductsStore.limit,
            allProductsStore.barcode,
            allProductsStore.description
        );

        if (Array.isArray(products)) {
          
            allProductsStore.setAllProducts(products);
        } else {
            console.error("Invalid response format for products:", products);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
})

class ProductsComponent {

    async getProductsInComponent(page: number,
        limit: number,
        barcode: string,
        description: string) {
        const products = await allProductsStore.getProducts(page, limit, barcode, description);

            if(allProductsStore.errorToken==='Unauthorized'){
                Swal.fire({
                    title: '¡Atención!',
                text: 'No esta autorizado !',
                icon: 'error',
                confirmButtonText: 'Aceptar'
                })
                router.push('/login/conexion-pos-user')
            }

        return products;
    }
}
const productsComponent = new ProductsComponent()
</script>
