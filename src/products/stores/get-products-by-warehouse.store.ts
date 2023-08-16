import { defineStore } from 'pinia';
import { ProductsByWarehouseservice } from '../services/get-products-by-warehouse.service';
import { GetProductsByWareHouseInterface } from '../interfaces/getProducts.interface'

const productsByWareHosueService = new ProductsByWarehouseservice();
export const useProductsByWarehouseStore = defineStore('productsByWarehouseStore', {
    state: () => {
        return {
            products: [] as Array<GetProductsByWareHouseInterface>,
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
                console.log(this.products)
                return this.products
            } catch (error) {
                console.log(error)
            }

        },
        async nextPage() {

            this.page++
            return this.getAllProducts(this.warehouseId, this.page, this.limit, this.barcode, this.description)

        },
        async previousPage() {
            if (this.page > 1) {

                this.page--
                return this.getAllProducts(this.warehouseId, this.page, this.limit, this.barcode, this.description)
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
                return this.getAllProducts(this.warehouseId, this.page, this.limit, this.barcode, this.description);
            }

            try {
                const productsResponse = await productsByWareHosueService.getProductsBywarehouseId(
                    this.warehouseId,
                    this.page,
                    this.limit,
                    this.barcode,
                    this.description
                );
                this.products = productsResponse.data;
                return this.products;
            } catch (error) {
                console.log(error);
            }
        },


    },


})

