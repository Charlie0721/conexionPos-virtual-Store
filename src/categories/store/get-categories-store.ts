import { defineStore } from 'pinia';
import { GetCategoriesByWarehouseService } from '../service/getCategoriesByIwarehouse.service'

const getCategoriesByWarehouse = new GetCategoriesByWarehouseService();

export const useGetCategoriesByWarehouseStore = defineStore('getCategoriesByWarehouseStore', {


    state: () => {

        return {
            categories: [] as any,
            limit: 10 as number,
            page: 1 as number,
            categorieName: '' as string
        }

    },
    actions: {

        async getCategories(page: number, limit: number, categorieName: string) {

            try {
                this.page = page;
                this.limit = limit;
                this.categorieName = categorieName;
                const categorieResponse = await getCategoriesByWarehouse.getCategories(this.page,
                    this.limit,
                    this.categorieName)

                this.categories = categorieResponse.data

            } catch (error) {
                console.log(error)
            }
        },
        async nextPage() {

            this.page++
            return this.getCategories(this.page, this.limit, this.categorieName)

        },
        async previousPage() {
            if (this.page > 1) {

                this.page--
                return this.getCategories(this.page, this.limit, this.categorieName)
            }
        },

        async searchCategory(value: string) {

            if (value.length > 0) {
                this.categorieName = value
            } else {
                this.categorieName = ""
                return this.getCategories(this.page, this.limit, this.categorieName)
            }

            try {

                const categoryResponse = await getCategoriesByWarehouse.getCategories(this.page,
                    this.limit,
                    this.categorieName)

                this.categories = categoryResponse.data

            } catch (error) {
                console.log(error)
            }

        }

    }
})


