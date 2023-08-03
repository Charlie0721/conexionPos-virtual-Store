import axios from '../../services/axios/axios.connect';

export class GetProductsByCategoriesService {

    async getProductsByCategories(warehouseId: number, categoryName: string, page: number, limit: number, description:string) {

        return await axios.get(`/categories/${warehouseId}/${categoryName}?page=${page}&limit=${limit}&descripcion=${description}`)

    }

}


