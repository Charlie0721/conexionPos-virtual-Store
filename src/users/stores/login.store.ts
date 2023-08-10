import { defineStore } from 'pinia';
import { LoginUserInterface } from '../interface/Login.interface';
import { LoginUserService } from '../services/Login.service';

const loginUserService = new LoginUserService();

export const useloginUserStore = defineStore('loginUserStore', {

  state: () => ({
    user: {} as LoginUserInterface,
    jwt: '',
    errorData: [] as any
  }),

  actions: {
    async login(loginUser: LoginUserInterface) {
      try {
        this.user = loginUser;
        const responseLoginUser = await loginUserService.LoginUser(this.user);
        this.setToken(responseLoginUser.data.access_token);
      } catch (error: any) {
        this.errorData = error.response.data.message;
      }
    },
    setToken(token: string) {
      this.jwt = token;
      localStorage.setItem('authToken', token);
    },
    checkAuthentication() {
      const storedToken = localStorage.getItem('authToken');
      console.log("storedToken", storedToken)
      if (storedToken) {
        this.jwt = storedToken;
      }
      return !!this.jwt; 
    }
  }
});

