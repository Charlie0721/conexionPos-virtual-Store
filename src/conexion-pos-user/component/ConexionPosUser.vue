<template>
    <Navbar />
    <br>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Credenciales de acceso</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="conexionPosLoginComponent.login">
                            <div class="mb-3">
                                <label for="username" class="form-label">Usuario</label>
                                <input type="text" class="form-control" v-model="posUser.user"
                                    placeholder="Ingrese su usuario">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" v-model="posUser.password"
                                    placeholder="Ingrese su contraseña">
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-dark">Continuar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, reactive, } from 'vue';
import Navbar from '../../components/navbar.vue'
import Swal from 'sweetalert2';
import { USER_CONEXION_POS } from '../constants/constants';
import router from '../../router/index';
const posUser = reactive<any>({
    user: "",
    password: "",
})

onMounted(() => {

    setTimeout(() => {
        conexionPosLoginComponent.alertMethod()
    }, 500)

})

class ConexionPosLoginComponent {

    alertMethod() {
        Swal.fire({
            title: '¡Atención!',
            text: 'Solo para registrar usuarios de conexion POS',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
    login() {
        const user = posUser.user.toUpperCase();
        if (user === "") {
            Swal.fire({
                title: '¡Atención!',
                text: 'Ingrese el usuario !',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            posUser.user = "";
            posUser.password = "";
            return
        }
        if (posUser.password === "") {
            Swal.fire({
                title: '¡Atención!',
                text: 'Ingrese la contraseña !',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            posUser.user = ""
            posUser.password = "";
            return
        }
        if (user === USER_CONEXION_POS.user && posUser.password === USER_CONEXION_POS.password) {
            Swal.fire({
                title: '¡CONFIRMACIÓN!',
                text: 'Usuario y contraseña validos !',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            router.push("/signup/conexion-pos-user")
        } else {
            Swal.fire({
                title: '¡Atención!',
                text: 'Usuario ó contraseña no valido !',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            posUser.user = "";
            posUser.password = "";
        }
    }
}

const conexionPosLoginComponent = new ConexionPosLoginComponent()



</script>
