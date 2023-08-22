<template>
    <Navbar />
    <br>
    <div class="container">
        <h2 class="mb-4 text-center">Carrito</h2>
        <div class="table-responsive">

            <table class="table table-bordered ">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripcion</th>
                        <th>Cantidad de productos</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in cartStore.cart" :key="product.idproducto">
                        <td>
                            <div class="d-flex align-items-center">
                                <img :src="product.url_foto || defaultImageUrl" class="cart-product-image me-3"
                                    alt="Product Image" />
                            </div>
                        </td>
                        <td>{{ product.descripcion }}</td>
                        <td class="d-flex align-items-center">
                            <div class="input-group input-group-sm">
                                <button class="btn btn-secondary" @click="decrementQuantity(product)">
                                    -
                                </button>
                                <input type="number" class="form-control text-center" v-model.number="product.quantity"
                                    @input="updateQuantity(product)" />
                                <button class="btn btn-secondary" @click="incrementQuantity(product)">
                                    +
                                </button>
                            </div>
                        </td>
                        <td>$ {{ new Intl.NumberFormat("de-DE").format(product.precioventa) }}</td>
                        <td>${{ new Intl.NumberFormat("de-DE").format(product.precioventa * product.quantity) }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click="removeFromCart(product)">
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" class="text-end"><strong>Total</strong></td>
                        <td>
                            <strong>${{ new Intl.NumberFormat("de-DE").format(calculateTotal()) }}</strong>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <CustomerComponent />
    </div>
</template>


<script setup lang="ts">
import Navbar from '../../components/navbar.vue'
import defaultImageUrl from '../../assets/logo_celulares.png';
import { useCartStore } from '../stores/shopping-car.store'
import { CartProduct } from '../../products/interfaces/getProducts.interface';
import CustomerComponent from '../../customers/components/CustomerComponent.vue'
const cartStore = useCartStore();

const removeFromCart = (product: CartProduct) => {
    cartStore.removeFromCart(product);
};

const incrementQuantity = (product: CartProduct) => {
    cartStore.updateQuantity(product, product.quantity + 1);
};

const decrementQuantity = (product: CartProduct) => {
    cartStore.updateQuantity(product, product.quantity - 1);
};

const updateQuantity = (product: CartProduct) => {
    if (product.quantity < 1) {
        product.quantity = 1;
    }
    cartStore.updateQuantity(product, product.quantity);
};

const calculateTotal = () => {
    return cartStore.cart.reduce(
        (total: number, product: CartProduct) => total + (product.precioventa * product.quantity),
        0
    );
};

</script>

<style scoped>
.cart-product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
}
</style>