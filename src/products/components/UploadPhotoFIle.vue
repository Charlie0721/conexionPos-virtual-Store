<template>
    <Navbar />
    <br>

    <div class="container mt-4">

        <div class="card">

            <div class="card-header">
                Subir Foto del Producto
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <input type="file" ref="fileInput" class="form-control" @change="handleFileChange" accept="image/*" />
                </div>
                <button @click="uploadImage" class="btn btn-primary">Subir Foto</button>
            </div>

        </div>

    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { URI_API } from '../../services/environmentVariables';
import axios from 'axios';
import Navbar from '../../components/navbar.vue'
import Swal from 'sweetalert2';
const route = useRoute();
const productId = ref(Number(route.params.idproducto));
const fileInput = ref<HTMLInputElement | null>(null);
const storedToken = localStorage.getItem('authToken');
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    fileInput.value = target;
};

const uploadImage = async () => {
    if (fileInput.value && fileInput.value.files && fileInput.value.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.value.files[0]);
        try {
            const response = await axios.put(`${URI_API}/products/${productId.value}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${storedToken}`,
                },
            });
            console.log('Foto subida:', response);
            return Swal.fire({
                title: '¡Confirmacion!',
                text: 'Foto subida satisfactoriamente !',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        } catch (error) {
            console.error('Error al subir la foto:', error);
            alert(`Error al subir la foto: ${error}`)
        }
    } else {
        return Swal.fire({
            title: '¡Atencion!',
            text: 'Seleccione un archivo !',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    }
};
</script>
  