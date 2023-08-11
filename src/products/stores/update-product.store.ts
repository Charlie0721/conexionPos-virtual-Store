import { defineStore } from 'pinia';
import { GetProductService } from '../services/get-product-by-id.service';
import { UpdateProductInterface } from '../interfaces/updateProduct.interface';
import { UpdateProductService } from '../services/update-product.service'

const getProductService = new GetProductService();
const updateProductService = new UpdateProductService();
export const useUpdateProductStore = defineStore('updateProductStore', {
    state: () => ({
        oneProduct: [] as UpdateProductInterface,
        updateProduct: {} as UpdateProductInterface,
        productId: 0 as number,
        productToUpdate: {} as UpdateProductInterface,
        status: 0 as number

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
        async updateProductAction(productId: number, data: UpdateProductInterface) {
            try {
                this.productId = productId;
                this.productToUpdate = data;
                const updateResponse = await updateProductService.updateProduct(this.productId, this.productToUpdate)
                return this.status = updateResponse.status
            } catch (error) {
                console.log(error)
            }

        }
    },
});