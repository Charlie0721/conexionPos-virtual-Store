import { defineStore } from 'pinia';
import { GetProductService } from '../services/get-product-by-id.service';
import { UpdateProductInterface } from '../interfaces/updateProduct.interface';

const getProductService = new GetProductService();

export const useUpdateProductStore = defineStore('updateProductStore', {
    state: () => ({
        oneProduct: [] as UpdateProductInterface,
        updateProduct: {} as UpdateProductInterface,
        productId: 0 as number,
    }),
    actions: {
        async getOneProduct(productId: number) {
            try {
                this.productId = productId;
                const productResponse = await getProductService.getOneProduct(this.productId);
                this.oneProduct = productResponse.data[0];

              
                this.updateProduct = { ...this.oneProduct };

                return this.oneProduct;
            } catch (error) {
                console.log(error);
            }
        },
    },
});