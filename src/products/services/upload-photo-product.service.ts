import axios from '../../services/axios/axios.connect';
import { PhotoFileInterface } from '../interfaces/uploadPhotoFile.interface'


export class UploadPhotoFileService {

    async uploadPhotoService(productId: number, photoFile: PhotoFileInterface) {
        return await axios.put(`/products/${productId}`, photoFile)
    }
}