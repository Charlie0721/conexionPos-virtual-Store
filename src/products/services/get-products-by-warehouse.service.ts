import axios from '../../services/axios/axios.connect';


export class ProductsByWarehouseservice {

    getProductsBywarehouseId(warehouseId: number, page: number, limit: number, barcode: string, description: string) {
        return axios.get(`/products/${warehouseId}?page=${page}&limit=${limit}&barcode=${barcode}&description=${description}`)
    }

}

