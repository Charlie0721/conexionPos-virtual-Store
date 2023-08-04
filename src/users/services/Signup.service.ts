import axios from '../../services/axios/axios.connect';
import { SignupInterface } from '../interface/Signup.interface'

export class SignupService {

    signup(user: SignupInterface) {
        return axios.post(`/users/signup`, user)
    }
}

