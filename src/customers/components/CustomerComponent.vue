<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <h3 class="text-center">{{ customerFound ? 'Editar Cliente' : 'Crear Cliente' }}</h3>
            </div>
            <div class="card-body">
                <form
                    @submit.prevent="customerFound ? customerComponent.updateCustomerComponent : customerComponent.sendCustomer">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="nit" class="form-label">NIT ó C.C</label>
                            <input type="text" class="form-control" id="nit" v-model="customer.nit"
                                @input="customerComponent.recalculateDigito"
                                @keydown.enter.prevent="customerComponent.searchCustomerByNit(customer.nit)"
                                @blur="customerComponent.searchCustomerByNit(customer.nit)" required />
                        </div>
                        <div class="col-md-2 mb-3">
                            <label for="digito" class="form-label">Dígito</label>
                            <input type="number" class="form-control" id="digito" v-model="customer.digito" disabled />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="TipoId" class="form-label">Tipo de Identificación</label>
                            <select class="form-select" id="TipoId" v-model="customer.TipoId" required>
                                <option selected>Seleccione una opción</option>
                                <option :value="document.TipoId" v-for="(document, index) in customerStore.documents"
                                    :key="index + document.TipoId">{{ document.Documento }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="nombres" class="form-label">Nombres</label>
                            <input type="text" class="form-control" id="nombres" v-model="customer.nombres" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="nombre2" class="form-label">Segundo Nombre</label>
                            <input type="text" class="form-control" id="nombre2" v-model="customer.nombre2" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="apellidos" class="form-label">Primer Apellido</label>
                            <input type="text" class="form-control" id="apellidos" v-model="customer.apellidos" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="apellido2" class="form-label">Segundo Apellido</label>
                            <input type="text" class="form-control" id="apellido2" v-model="customer.apellido2" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="direccion" class="form-label">Dirección</label>
                            <input type="text" class="form-control" id="direccion" v-model="customer.direccion" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="telefono" class="form-label">Teléfono</label>
                            <input type="text" class="form-control" id="telefono" v-model="customer.telefono" required />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control" id="email" v-model="customer.email" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email2" class="form-label">Segundo Correo Electrónico</label>
                            <input type="email" class="form-control" id="email2" v-model="customer.email2" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="idpais" class="form-label">País</label>
                            <select class="form-select" id="idpais" v-model="customer.idpais" required>
                                <option :value="country.idpais" v-for="(country, index) in customerStore.countries"
                                    :key="index + country.idpais">{{ country.nompais }}</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="iddepto" class="form-label">Departamento</label>
                            <select class="form-select" id="iddepto" v-model="customer.iddepto" required>
                                <option :value="department.iddepto" v-for="(department, index) in customerStore.departments"
                                    :key="index + department.iddepto">{{ department.nomdepartamento }}</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="idmunicipio" class="form-label">Municipio</label>
                            <select class="form-select" id="idmunicipio" v-model="customer.idmunicipio" required>
                                <option :value="municipalitie.idmunicipio"
                                    v-for="(municipalitie, index) in customerStore.municipalities"
                                    :key="index + municipalitie.idmunicipio">{{ municipalitie.nommunicipio }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="tipofactura" class="form-label">Tipo de Factura</label>
                            <select class="form-select" id="tipofactura" v-model="customer.tipofactura" required>
                                <option :value=1>P.O.S</option>
                                <option :value=2>Electrónica</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button v-if="customerFound" @click="customerComponent.updateCustomerComponent"
                                class="btn btn-primary">Editar</button>
                            <button v-else @click="customerComponent.sendCustomer" class="btn btn-primary">Guardar</button>
                        </div>
                    </div>
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
import { CustomerInterface, SearchCustomerInterface } from '../interfaces/customer.interface'
const customerFound = ref(false);
import Swal from 'sweetalert2'
import { UpdateCustomerInterface } from '../interfaces/update-customer.interface';
onMounted(async () => {

    await customerComponent.getAllCountries();
    await customerComponent.getAllDepartments();
    await customerComponent.getAllMunicipalities()
    documents.value = customerStore.getDocuments()
})

const isFormEnabled = ref(false);
const searchCustomer = ref<SearchCustomerInterface>({ nit: '' })
const customer = ref<CustomerInterface>({
    nit: '',
    digito: 0,
    tipopersona: 1,
    nombres: '',
    nombre2: '',
    apellidos: '',
    apellido2: '',
    nomcomercial: '',
    direccion: '',
    telefono: '',
    email: '',
    email2: '',
    iddepto: 0,
    idmunicipio: 0,
    TipoId: '',
    tipofactura: 0,
    cliente: 1,
    idactividad: 496,
    idregimen: 2,
    aplicaprom: 1,
    idclasifterc: 1,
    inactivo: 0,
    usapuntos: 1,
    idpais: 0,
    matriculamercan: '000000',
    RegiRenta: '05',
    autoretenedor: 0
})

const customerUpdate = ref<UpdateCustomerInterface>({

    nit: undefined,
    digito: undefined,
    tipopersona: undefined,
    nombres: undefined,
    nombre2: undefined,
    apellidos: undefined,
    apellido2: undefined,
    nomcomercial: undefined,
    direccion: undefined,
    telefono: undefined,
    email: undefined,
    email2: undefined,
    iddepto: undefined,
    idmunicipio: undefined,
    TipoId: undefined,
    tipofactura: undefined,
    cliente: undefined,
    idactividad: undefined,
    idregimen: undefined,
    aplicaprom: undefined,
    idclasifterc: undefined,
    inactivo: undefined,
    usapuntos: undefined,
    idpais: undefined,
    matriculamercan: undefined,
    RegiRenta: undefined,
    autoretenedor: undefined

})


class CustomerComponent {

    async searchCustomerByNit(nit: string) {
        searchCustomer.value.nit = nit;
        const response = await customerStore.searchCustomer(searchCustomer.value);

        if (response.status === 404) {
            isFormEnabled.value = true;
            customerFound.value = false;
            await Swal.fire({
                title: '¡Atencion!',
                text: `${response.message}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.cleanFormForCreation();
            return;
        }

        customerFound.value = true;
        customer.value = { ...customer.value, ...response };

        isFormEnabled.value = false;
    }


    cleanFormForCreation() {
        customerFound.value = false;
        const currentNit = customer.value.nit;
        customer.value.nit = currentNit;
        customer.value.digito = 0;
        customer.value.tipopersona = 1;
        customer.value.nombres = '';
        customer.value.nombre2 = '';
        customer.value.apellidos = '';
        customer.value.apellido2 = '';
        customer.value.nomcomercial = '';
        customer.value.direccion = '';
        customer.value.telefono = '';
        customer.value.email = '';
        customer.value.email2 = '';
        customer.value.iddepto = 0;
        customer.value.idmunicipio = 0;
        customer.value.TipoId = '';
        customer.value.tipofactura = 0;
        customer.value.cliente = 1;
        customer.value.idactividad = 496;
        customer.value.idregimen = 2;
        customer.value.aplicaprom = 1;
        customer.value.idclasifterc = 1;
        customer.value.inactivo = 0;
        customer.value.usapuntos = 1;
        customer.value.idpais = 0;
        customer.value.matriculamercan = '000000';
        customer.value.RegiRenta = '05';
        customer.value.autoretenedor = 0;
    }


    async getAllCountries() {
        await customerStore.getCountries()
    }

    async getAllMunicipalities() {
        await customerStore.getMunicipalities()
    }
    async getAllDepartments() {
        await customerStore.getDepartments()
    }
    recalculateDigito() {
        if (customer.value.nit) {
            const nitWithoutDigito = customer.value.nit.replace(/\D/g, '');
            const sequence = [41, 37, 29, 23, 19, 17, 13, 7, 3];
            let sum = 0;

            for (let i = 0; i < nitWithoutDigito.length; i++) {
                const digit = parseInt(nitWithoutDigito[i], 10);
                const factor = sequence[i % sequence.length];
                sum += digit * factor;
            }
            const modulo11 = sum % 11;
            const calculatedDigito = modulo11 === 0 ? 0 : (11 - modulo11);
            customer.value.digito = calculatedDigito;
        }
    }
    async sendCustomer() {
        let firtsName = customer.value.nombres.toUpperCase()
        customer.value.nombres = firtsName
        let secondName = customer.value.nombre2.toUpperCase()
        customer.value.nombre2 = secondName
        let surname = customer.value.apellidos.toUpperCase()
        customer.value.apellidos = surname
        let secondSurname = customer.value.apellido2.toUpperCase()
        customer.value.apellido2 = secondSurname
        let tradeName = customer.value.nombres.toUpperCase() + ' ' + customer.value.apellidos.toUpperCase()
        customer.value.nomcomercial = tradeName
        let address = customer.value.direccion.toUpperCase()
        customer.value.direccion = address
        customerFound.value = true;
        return await customerStore.create(customer.value)
    }

    async updateCustomerComponent() {
        let firtsName = customer.value.nombres.toUpperCase()
        customerUpdate.value.nombres = firtsName
        let secondName = customer.value.nombre2.toUpperCase()
        customerUpdate.value.nombre2 = secondName
        let surname = customer.value.apellidos.toUpperCase()
        customerUpdate.value.apellidos = surname
        let secondSurname = customer.value.apellido2.toUpperCase()
        customerUpdate.value.apellido2 = secondSurname
        let tradeName = customer.value.nombres.toUpperCase() + ' ' + customer.value.apellidos.toUpperCase()
        customerUpdate.value.nomcomercial = tradeName
        let address = customer.value.direccion.toUpperCase()
        customerUpdate.value.direccion = address
        customerUpdate.value = { ...customer.value }
        await customerStore.updateCustomer(customerStore.customerId, customerUpdate.value)
    }

}
const customerComponent = new CustomerComponent()



</script>