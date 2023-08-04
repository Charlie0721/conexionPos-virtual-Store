import axios from '../../services/axios/axios.connect';
import { LoginUserInterface } from '../interface/Login.interface'

export class LoginUserService {

    async LoginUser(loginUser: LoginUserInterface) {
        return await axios.post(`/users/login`, loginUser)
    }
}
