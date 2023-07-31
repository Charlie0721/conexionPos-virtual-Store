import axios from '../services/axios/axios.connect';


export class WarehousesService {

    async getWareHouseWithVirtualStore() {

        return await axios.get('/warehouses/active-virtual-store')

    }

}