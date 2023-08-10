<template>
    <Navbar />
    <br>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h2 class="text-center">INFORMACION DEL PRODUCTO  <br> {{ updateProduct.descripcion }} </h2>
            </div>
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="idproducto" class="form-label">ID del Producto</label>
                        <input type="number" class="form-control" id="idproducto" name="idproducto" disabled
                            v-model="updateProduct.idproducto">
                    </div>
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Código</label>
                        <input type="text" class="form-control" id="codigo" name="codigo" disabled
                            v-model="updateProduct.codigo">
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <input type="text" class="form-control" id="descripcion" name="descripcion" required
                            v-model="updateProduct.descripcion">
                    </div>
                    <div class="mb-3">
                        <label for="barcode" class="form-label">Código de Barras</label>
                        <input type="text" class="form-control" id="barcode" name="barcode" v-model="updateProduct.barcode">
                    </div>
                    <div class="mb-3">
                        <label for="costo" class="form-label">Costo</label>
                        <input type="number" step="0.01" class="form-control" id="costo" name="costo" required
                            v-model="updateProduct.costo">
                    </div>
                    <div class="mb-3">
                        <label for="precioventa" class="form-label">Precio de Venta</label>
                        <input type="number" step="0.01" class="form-control" id="precioventa" name="precioventa" required
                            v-model="updateProduct.precioventa">
                    </div>
                    <div class="mb-3">
                        <label for="precioespecial1" class="form-label">Precio Especial 1</label>
                        <input type="number" step="0.01" class="form-control" id="precioespecial1" name="precioespecial1"
                            v-model="updateProduct.precioespecial1">
                    </div>
                    <div class="mb-3">
                        <label for="precioespecial2" class="form-label">Precio Especial 2</label>
                        <input type="number" step="0.01" class="form-control" id="precioespecial2" name="precioespecial2"
                            v-model="updateProduct.precioespecial2">
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Actualizar Producto</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useUpdateProductStore } from '../stores/update-product.store';
import Navbar from '../../components/navbar.vue';
import { UpdateProductInterface } from '../interfaces/updateProduct.interface';

const updateProductStore = useUpdateProductStore();
const route = useRoute();

const updateProduct = ref<UpdateProductInterface>({
    idproducto: undefined,
    codigo: undefined,
    barcode: undefined,
    descripcion: undefined,
    precioventa: undefined,
    precioespecial1: undefined,
    precioespecial2: undefined,
    costo: undefined,
    ultcosto: undefined,
    url_foto: undefined,
});


onBeforeMount(async () => {
    await updateProductComponent.getProductData()
});

class UpdateProductComponent {
    productId: number = Number(route.params.idproducto);

    async getProductData() {
        const response = await updateProductStore.getOneProduct(this.productId);
        
        updateProduct.value = { ...response };
    }
}

const updateProductComponent = new UpdateProductComponent()
</script>
