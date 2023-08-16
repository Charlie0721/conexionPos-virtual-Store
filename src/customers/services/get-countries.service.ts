import axios from '../../services/axios/axios.connect';

export class CountriesService {
    async getAll() {
        return await axios.get(`/countries`)
    }
}