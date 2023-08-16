<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <h3>Crear Cliente</h3>
            </div>
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="nit" class="form-label">NIT</label>
                        <input type="text" class="form-control" id="nit" />
                    </div>
                    <div class="mb-3">
                        <label for="digito" class="form-label">Dígito</label>
                        <input type="number" class="form-control" id="digito" />
                    </div>
                    <!-- Otras propiedades del formulario... -->
                    <div class="mb-3">
                        <label for="nombres" class="form-label">Nombres</label>
                        <input type="text" class="form-control" id="nombres" />
                    </div>
                    <div class="mb-3">
                        <label for="nombre2" class="form-label">Segundo Nombre</label>
                        <input type="text" class="form-control" id="nombre2" />
                    </div>
                    <div class="mb-3">
                        <label for="apellidos" class="form-label">Primer Apellido</label>
                        <input type="text" class="form-control" id="apellidos" />
                    </div>
                    <div class="mb-3">
                        <label for="apellido2" class="form-label">Segundo Apellido</label>
                        <input type="text" class="form-control" id="apellido2" />
                    </div>
                    <div class="mb-3">
                        <label for="nomcomercial" class="form-label">Nombre Comercial</label>
                        <input type="text" class="form-control" id="nomcomercial" />
                    </div>
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="direccion" />
                    </div>
                    <div class="mb-3">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="telefono" />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="email" />
                    </div>
                    <div class="mb-3">
                        <label for="email2" class="form-label">Segundo Correo Electrónico</label>
                        <input type="email" class="form-control" id="email2" />
                    </div>
                    <div class="mb-3">
                        <label for="iddepto" class="form-label">Departamento</label>
                        <select class="form-select" id="iddepto">
                            <!-- Opciones del select... -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="idmunicipio" class="form-label">Municipio</label>
                        <select class="form-select" id="idmunicipio">
                            <!-- Opciones del select... -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="TipoId" class="form-label">Tipo de Identificación</label>
                        <select class="form-select" id="TipoId">
                            <!-- Opciones del select... -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="tipofactura" class="form-label">Tipo de Factura</label>
                        <select class="form-select" id="tipofactura">
                            <!-- Opciones del select... -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="idpais" class="form-label">País</label>
                        <select class="form-select" id="idpais">
                            <!-- Opciones del select... -->
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCustomersStore } from '../stores/customer.store'
const customerStore = useCustomersStore()
const documents = ref<{ Documento: string; TipoId: string }[]>([])
onMounted(async () => {

    await customerComponent.getAllCountries();
    await customerComponent.getAllDepartments();
    await customerComponent.getAllMunicipalities()
    documents.value = customerStore.getDocuments()
})

class CustomerComponent {

    async getAllCountries() {
        await customerStore.getCountries()
    }

    async getAllMunicipalities() {
        await customerStore.getMunicipalities()
    }
    async getAllDepartments() {
        await customerStore.getDepartments()
    }

}

const customerComponent = new CustomerComponent()



</script>