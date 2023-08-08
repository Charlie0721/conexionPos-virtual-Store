import { defineStore } from 'pinia'
import { LoginUserInterface } from '../interface/Login.interface'
import { LoginUserService } from '../services/Login.service';

const loginUserService = new LoginUserService();

export const useloginUserStore = defineStore('loginUserStore', {

    state: () => {
        return {
            user: {} as LoginUserInterface,
            jwt: null as string | null,
            errorData: [] as any
        }
    },

    actions: {
        async login(loginUser: LoginUserInterface) {
            try {
                this.user = loginUser;
                const responseLoginUser = await loginUserService.LoginUser(this.user);
                this.jwt = responseLoginUser.data.access_token;
            } catch (error: any) {
                this.errorData = error.response.data.message;
            }
        }
    }

})