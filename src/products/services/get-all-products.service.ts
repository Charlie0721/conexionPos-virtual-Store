import axios from '../../services/axios/axios.connect';

export class AllProductsService {

    async getProductsAuth(page: number, limit: number, barcode: string, description: string) {
        return await axios.get(`products/?page=${page}&limit=${limit}&barcode=${barcode}&description=${description}`);
    }
}
