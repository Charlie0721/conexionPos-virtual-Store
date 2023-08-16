import axios from '../../services/axios/axios.connect';

export class MunicipalitiesService {
    async getAll() {
        return await axios.get(`/municipalities`)
    }
}