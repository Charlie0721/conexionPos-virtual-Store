import { defineStore } from 'pinia';
import { SignupInterface } from '../interface/Signup.interface'
import { SignupService } from '../services/Signup.service'

const singnupService = new SignupService();

export const useUsersStore = defineStore('userstore', {

    state: () => {
        return {
            user: {} as SignupInterface,
            response: [] as any
        }
    },

    actions: {
        async signup(user: SignupInterface) {

            try {
                this.user = user
                const responseUser = await singnupService.signup(this.user)
                return this.response = responseUser.data
            } catch (error) {
                console.log(error)
            }
        }
    }
})