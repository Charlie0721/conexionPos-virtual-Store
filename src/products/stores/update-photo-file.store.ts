import { defineStore } from 'pinia'
import { PhotoFileInterface } from '../interfaces/uploadPhotoFile.interface'
import { UploadPhotoFileService } from '../services/upload-photo-product.service'
const uploadPhotoFileService = new UploadPhotoFileService()

export const usePhotoFileUpdateStore = defineStore('photoFileUpdateStore', {

    state: () => {
        return {

            photoFile: {} as PhotoFileInterface,
            productId: 0 as number
        }
    },
    actions: {

        async uploadFile(productId: number, data: PhotoFileInterface) {
            try {
                this.productId = productId;
                this.photoFile = data;
                const responseFile = await uploadPhotoFileService.uploadPhotoService(this.productId, this.photoFile)
                console.log(responseFile)


            } catch (error) {
                console.log(error)
            }

        }


    }


})
