import axios from '../../services/axios/axios.connect';
import { SearchCustomerInterface } from '../interfaces/customer.interface'
export class SearchCustomerService {

    async search(searchNit: SearchCustomerInterface) {
        return axios.post(`/customers/search`, searchNit)
    }

}