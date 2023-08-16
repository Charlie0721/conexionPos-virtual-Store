import { defineStore } from 'pinia';
import { CartProduct } from '../../products/interfaces/getProducts.interface';


export const useCartStore = defineStore('cartStore', () => {
  return {
    cart: [] as CartProduct[],
    totalItems: 0,
    addToCart(product: CartProduct) {
      const existingProduct = this.cart.find(item => item.idproducto === product.idproducto);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }

      this.totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart(product: CartProduct) {
      const index = this.cart.findIndex(item => item.idproducto === product.idproducto);

      if (index !== -1) {
        const removedProduct = this.cart.splice(index, 1)[0];
        this.totalItems -= removedProduct.quantity;
      }
    },
    updateQuantity(product: CartProduct, quantity: number) {
      const existingProduct = this.cart.find(item => item.idproducto === product.idproducto);

      if (existingProduct && quantity > 0) {
        existingProduct.quantity = quantity;
        this.totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
      }
    },
    clearCart() {
      this.cart = [];
      this.totalItems = 0;
    },
  };
});