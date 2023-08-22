import axios from '../../services/axios/axios.connect';
import { UpdateCustomerInterface } from '../interfaces/update-customer.interface';

export class UpdateCustomerService {

    async update(customerId: number, data: UpdateCustomerInterface) {
        return await axios.put(`/customers/update-customer/${customerId}`, data)
    }
}



