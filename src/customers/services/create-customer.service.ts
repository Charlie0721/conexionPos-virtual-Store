import axios from '../../services/axios/axios.connect';
import { CustomerInterface } from '../interfaces/customer.interface';
export class CreateCustomerService {

    async create(customer: CustomerInterface) {
        return axios.post(`/customers`, customer)
    }
}
