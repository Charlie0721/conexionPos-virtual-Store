import { defineStore } from 'pinia';
import { WarehousesService } from '../services/initial-connection-with-warehouse';

const warehousesService = new WarehousesService()

export const useGetWarehouseStore = defineStore('warehouseStore', {

    state: () => {
        return {
            warehouses: [] as any,
            warehouseId: 0 as number,
            warehouseName:"" as string
        }
    },

    actions: {

        async getWarehouse() {

            try {
                const response = await warehousesService.getWareHouseWithVirtualStore();
                this.warehouseId=response.data.warehouseId
                this.warehouseName=response.data.warehouse[0].nomalmacen
                           
            } catch (error) {
                console.log(error)
            }

        }

    }


})
