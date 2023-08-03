import { defineStore } from 'pinia';
import { GetProductsByCategoriesService } from '../service/getProductsByCategories.service';

const getProductsByCategoriesService = new GetProductsByCategoriesService();

export const useProductsByCategories = defineStore('productsByCategories', {

    state: () => {
        return {

            products: [] as any[],
            warehoseId: 0 as number,
            categoryName: '' as string,
            limit: 10 as number,
            page: 1 as number,
            description: '' as string

        }
    },
    actions: {

        async getProductsByCategories(warehouseId: number, categoryName: string, page: number, limit: number, description: string) {
            try {
                this.warehoseId = warehouseId;
                this.categoryName = categoryName;;
                this.page = page;
                this.limit = limit;
                this.description = description;
                const response = await getProductsByCategoriesService.getProductsByCategories(this.warehoseId, this.categoryName, this.page, this.limit, this.description);
                this.products = response.data

            } catch (error) {
                console.log(error);
            }

        },

        async nextPage() {

            this.page++
            return this.getProductsByCategories(this.warehoseId, this.categoryName, this.page, this.limit, this.description)

        },
        async previousPage() {
            if (this.page > 1) {

                this.page--
                return this.getProductsByCategories(this.warehoseId, this.categoryName, this.page, this.limit, this.description)
            }
        },

        async searchProduct(value: string) {
            if (value.length > 0) {
                this.description = value
            } else {
                this.description = ""
                return this.getProductsByCategories(this.warehoseId, this.categoryName, this.page, this.limit, this.description)
            }

            try {
                const response = await getProductsByCategoriesService.getProductsByCategories(this.warehoseId, this.categoryName, this.page, this.limit, this.description);
                this.products = response.data
            } catch (error) {
                console.log(error)
            }

        }


    }


});




