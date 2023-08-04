import { defineStore } from 'pinia'
import { LoginUserInterface } from '../interface/Login.interface'
import { LoginUserService } from '../services/Login.service';

const loginUserService = new LoginUserService();

export const useloginUserStore = defineStore('loginUserStore', {

    state: () => {
        return {
            user: {} as LoginUserInterface,
            jwt: '' as string,
            data: [] as any
        }
    },

    actions: {

        async login(loginUser: LoginUserInterface) {
            try {
                this.user = loginUser
                const responseLoginUser = await loginUserService.LoginUser(this.user)
                console.log(responseLoginUser)

            } catch (error) {
                console.log(error)
            }
        }

    }


})