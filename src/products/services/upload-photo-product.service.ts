import axios from '../../services/axios/axios.connect';
import { PhotoFileInterface } from '../interfaces/uploadPhotoFile.interface';

export class UploadPhotoFileService {
  async uploadPhotoService(productId: number, photoFileFormData: FormData) {
    return await axios.put<PhotoFileInterface>(`/products/${productId}`, photoFileFormData);
  }
}
