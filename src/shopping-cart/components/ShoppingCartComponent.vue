<template>
    <Navbar />
    <br>
    <div class="container">
        <h2 class="mb-4 text-center">Carrito</h2>
        <table class="table table-bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsByWarehouseStore.shoppingCart" :key="product.idproducto">
            <td>
              <div class="d-flex align-items-center">
                <img
                  :src="product.url_foto || defaultImageUrl"
                  class="cart-product-image me-3"
                  alt="Product Image"
                />
                   </div>
            </td>
            <td>{{ product.descripcion }}</td>
            <td class="d-flex align-items-center">
              <button class="btn btn-secondary btn-sm me-2" @click="decrementQuantity(product)">
                -
              </button>
              <input
                type="number"
                class="form-control form-control-sm w-25 me-2"
                v-model.number="product.quantity"
                @input="updateQuantity(product)"
              />
              <button class="btn btn-secondary btn-sm" @click="incrementQuantity(product)">
                +
              </button>
            </td>
            <td>${{ product.precioventa }}</td>
            <td>${{ product.precioventa * product.quantity }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="removeFromCart(product)">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>


<script setup lang="ts">
import { useProductsByWarehouseStore } from '../../products/stores/get-products-by-warehouse.store'
import Navbar from '../../components/navbar.vue'
import defaultImageUrl from '../../assets/logo_celulares.png';
import { CartProduct } from '../../products/interfaces/getProducts.interface';
const productsByWarehouseStore = useProductsByWarehouseStore()

const removeFromCart = (product: CartProduct) => {
    const index = productsByWarehouseStore.shoppingCart.indexOf(product);
    if (index !== -1) {
        productsByWarehouseStore.shoppingCart.splice(index, 1);
        updateTotalQuantity();
    }
};

const incrementQuantity = (product: CartProduct) => {
    product.quantity++;
    updateTotalQuantity();
};

const decrementQuantity = (product: CartProduct) => {
    if (product.quantity > 1) {
        product.quantity--;
        updateTotalQuantity();
    }
};

const updateQuantity = (product: CartProduct) => {
    if (product.quantity < 1) {
        product.quantity = 1;
    }
    updateTotalQuantity();
};

const updateTotalQuantity = () => {
    productsByWarehouseStore.totalItemsInCart = productsByWarehouseStore.shoppingCart.reduce(
        (total: number, product: CartProduct) => total + product.quantity,
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