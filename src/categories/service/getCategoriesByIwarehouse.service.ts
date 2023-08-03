import axios from '../../services/axios/axios.connect';


export class GetCategoriesByWarehouseService {

    getCategories(page: number, limit: number, categoryName: string) {

        return axios.get(`/categories?page=${page}&limit=${limit}&categoryName=${categoryName}`)
    }

}

