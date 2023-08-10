<template>
    <Navbar />
    <br>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Login</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="loginUserComponent.loginUser">
                            <div class="mb-3">
                                <label for="username" class="form-label">Usuario</label>
                                <input type="text" class="form-control" placeholder="Ingrese su usuario"
                                    v-model="user.username">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" placeholder="Ingrese su contraseña"
                                    v-model="user.password">
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-dark">Ingresar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, nextTick } from 'vue';
import { LoginUserInterface } from '../interface/Login.interface'
import { useloginUserStore } from '../stores/login.store'
import Navbar from '../../components/navbar.vue'
import Swal from 'sweetalert2';
import router from '../../router/index';
const loginUserStore = useloginUserStore();
const user = reactive<LoginUserInterface>({
    username: "",
    password: ""
})

class LoginUserComponent {

    async loginUser() {

        if (user.username === "") {
            Swal.fire({
                title: '¡Atención!',
                text: 'Debe digitar el usuario !',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            user.username = "";
            user.password = "";
            return
        }
        if (user.password === "") {
            Swal.fire({
                title: '¡Atención!',
                text: 'Ingrese la contraseña !',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            user.username = "";
            user.password = "";
            return
        }
        try {
            const response = await loginUserStore.login(user);

            if (loginUserStore.jwt) {
                loginUserStore.setToken(loginUserStore.jwt);
                nextTick(() => {
                    router.push({ name: 'all-products' });
                });
                return response;
            } else {
                Swal.fire({
                    title: '¡Atención!',
                    text: `${loginUserStore.errorData}`,
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                user.username = "";
                user.password = "";
                return;
            }
        } catch (error) {
            console.log("error desde componente", error)
        }

    }

}
const loginUserComponent = new LoginUserComponent()
</script>