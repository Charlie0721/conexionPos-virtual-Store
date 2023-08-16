import axios from '../../services/axios/axios.connect';

export class DepartmentsService {
    async getAll() {
        return await axios.get(`/departments`)
    }
}