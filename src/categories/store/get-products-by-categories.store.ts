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

        }
    },
    actions: {

        async getProductsByCategories(warehouseId: number, categoryName: string, page: number, limit: number) {
            try {
                this.warehoseId = warehouseId;
                this.categoryName = categoryName;;
                this.page = page;
                this.limit = limit;
                const response = await getProductsByCategoriesService.getProductsByCategories(this.warehoseId, this.categoryName, this.page, this.limit);
                this.products = response.data

            } catch (error) {
                console.log(error);
            }

        }


    }


});




