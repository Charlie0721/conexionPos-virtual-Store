import { defineStore } from 'pinia';
import { ProductsByWarehouseservice } from '../services/get-products-by-warehouse.service';
const productsByWareHosueService = new ProductsByWarehouseservice();
export const useProductsByWarehouseStore = defineStore('productsByWarehouseStore', {
    state: () => {
        return {
            products: [] as any,
            limit: 10 as number,
            page: 1 as number,
            barcode: "" as string,
            description: "" as string,
            warehouseId: 0 as number,
        }
    },
    actions: {
        async getAllProducts(warehouseId: number, page: number, limit: number, barcode: string, description: string) {

            try {
                this.warehouseId = warehouseId
                this.page = page;
                this.limit = limit;
                this.barcode = barcode;
                this.description = description;
                const productsResponse = await productsByWareHosueService.getProductsBywarehouseId(this.warehouseId,
                    this.page,
                    this.limit,
                    this.barcode,
                    this.description)
                this.products = productsResponse.data
                return this.products
            } catch (error) {
                console.log(error)
            }

        }



    }

})

