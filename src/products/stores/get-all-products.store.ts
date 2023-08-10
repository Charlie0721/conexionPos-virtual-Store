import { defineStore } from 'pinia';
import { AllProductsService } from '../services/get-all-products.service';
import { AllProductsInterface } from '../interfaces/getProdcuts.interface';

const allProductsService = new AllProductsService();

export const useAllProductsStore = defineStore('allProductsStore', {
  state: () => ({
    allProducts: [] as Array<AllProductsInterface>,
    limit: 10 as number,
    page: 1 as number,
    barcode: '' as string,
    description: '' as string,
    errorToken: '' as string,
    authToken: localStorage.getItem('authToken') || null,
  }),

  actions: {
    async getProducts(page: number, limit: number, barcode: string, description: string) {
      if (!this.authToken) {
        this.errorToken = 'Unauthorized';
        return this.errorToken;
      }

      try {
        this.page = page;
        this.limit = limit;
        this.barcode = barcode;
        this.description = description;
        const allProductsResponse = await allProductsService.getProductsAuth(this.page, this.limit, this.barcode, this.description);
        this.allProducts = allProductsResponse.data
        return allProductsResponse;
      } catch (error: any) {
        this.errorToken = error.response.data.message;
        return this.errorToken;
      }
    },
    setAllProducts(products: Array<AllProductsInterface>) {
      this.allProducts = products;
    },
    async nextPage() {

      this.page++
      return this.getProducts(this.page, this.limit, this.barcode, this.description)

    },
    async previousPage() {
      if (this.page > 1) {

        this.page--
        return this.getProducts(this.page, this.limit, this.barcode, this.description)
      }
    },
    async searchProduct(value: string) {
      if (value.length > 0) {
        const isNumeric = !isNaN(Number(value));
        if (isNumeric) {
          this.barcode = value;
          this.description = '';
        } else {
          this.description = value;
          this.barcode = '';
        }
      } else {
        this.description = '';
        this.barcode = '';
        return this.getProducts(this.page, this.limit, this.barcode, this.description);
      }

      try {
        const productsResponse = await allProductsService.getProductsAuth(
          this.page,
          this.limit,
          this.barcode,
          this.description
        );
        this.allProducts = productsResponse.data;
        return this.allProducts;
      } catch (error) {
        console.log(error);
      }
    }

  },

});
