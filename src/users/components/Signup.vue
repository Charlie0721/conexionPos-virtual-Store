<template>
    <Navbar />
    <br>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Registrar Usuario</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="userSignupComponent.signupComponent">
                            <div class="mb-3">
                                <label for="username" class="form-label">Usuario</label>
                                <input type="text" class="form-control" v-model="user.username"
                                    placeholder="Ingrese su usuario">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" v-model="user.password"
                                    placeholder="Ingrese su contraseña">
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-dark">Crear</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive } from "vue"
import Navbar from '../../components/navbar.vue'
import Swal from 'sweetalert2';
import { useUsersStore } from '../stores/signup.store'
import { SignupInterface } from '../interface/Signup.interface'
import router from '../../router/index';
const usersStore = useUsersStore();
const user = reactive<SignupInterface>({
    username: "",
    password: ""
})

class UserSignupComponent {

    async signupComponent() {
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
        if (user.password == "") {
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
        const response = await usersStore.signup(user)
        if (usersStore.response.status === 302) {
            Swal.fire({
                title: '¡Atención!',
                text: `El Usuario ${user.username} ya existe en la base de datos !`,
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            user.username = "";
            user.password = "";
            return
        }
        Swal.fire({
            title: '¡CONFIRMADO!',
            text: 'Usuario Creado !',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        router.push('/login/conexion-pos-user')
        return response

    }
}
const userSignupComponent = new UserSignupComponent()

</script>