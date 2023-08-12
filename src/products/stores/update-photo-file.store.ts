import { defineStore } from 'pinia';
import { UploadPhotoFileService } from '../services/upload-photo-product.service';
import { PhotoFileInterface } from '../interfaces/uploadPhotoFile.interface';

export const usePhotoFileUpdateStore = defineStore('photoFileUpdateStore', {
    state: () => ({
        productId: 0,
    }),
    actions: {
        async uploadFile(productId: number, file: any) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadPhotoService = new UploadPhotoFileService();
                const response = await uploadPhotoService.uploadPhotoService(productId, formData);

                console.log(response)
                return response;
            } catch (error) {
                throw error;
            }
        },
    },
});
