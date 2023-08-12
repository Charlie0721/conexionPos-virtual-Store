<template>
    <Navbar />
    <br>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                Subir Foto del Producto
            </div>
            <div class="card-body">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="photoInput" class="form-label">Seleccionar foto</label>
                        <input type="file" class="form-control" id="photoInput" @change="handleFileChange"
                            accept="image/*" />
                    </div>
                    <button type="submit" class="btn btn-primary">Subir Foto</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Navbar from '../../components/navbar.vue';
import { usePhotoFileUpdateStore } from '../stores/update-photo-file.store'
import { useRoute } from 'vue-router';
// import Swal from 'sweetalert2';
const photoFileUpdateStore = usePhotoFileUpdateStore()
const route = useRoute();
const productId = ref<number>(0)
productId.value = Number(route.params.idproducto);
const selectedFile = ref<File | null>(null);

const handleFileChange = (event: InputEvent) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    selectedFile.value = file || null;
};

const submitForm = async () => {
    if (selectedFile.value) {
        const productIdPhotoFile = productId.value;
        try {
            const response = await photoFileUpdateStore.uploadFile(productIdPhotoFile, selectedFile.value);
            console.log('Foto subida:', response);
        } catch (error) {
            console.error('Error al subir la foto:', error);
        }
    }
};









</script>
