import axios from '../../services/axios/axios.connect';
import { UpdateProductInterface } from '../interfaces/updateProduct.interface'
export class UpdateProductService {

    async updateProduct(productId: number, productData: UpdateProductInterface) {
        return await axios.put(`/products/update-product/${productId}`, productData)
    }
}