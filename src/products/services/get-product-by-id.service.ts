import axios from '../../services/axios/axios.connect';

export class GetProductService {

    async getOneProduct(productId: number) {
        return await axios.get(`/products/get-product/${productId}`)
    }

}