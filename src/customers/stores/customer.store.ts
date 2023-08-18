import { defineStore } from 'pinia'
import { CountriesInterface, DepartmentsInterface, MunicipalitiesInterface } from '../interfaces/countries.interfaces'
import { CustomerInterface } from '../interfaces/customer.interface';
import { CreateCustomerService } from '../services/create-customer.service'
import { CountriesService } from '../services/get-countries.service'
import { DepartmentsService } from '../services/get-departments.service'
import { MunicipalitiesService } from '../services/get-municipalities.service'
import documentType from '../document-type/documentsType.json';

const createCustomerService = new CreateCustomerService()
const countriesService = new CountriesService()
const departmentsService = new DepartmentsService()
const municipalitiesService = new MunicipalitiesService()


export const useCustomersStore = defineStore('customerStore', {

    state: () => {
        return {
            createCustomer: {} as CustomerInterface,
            countries: [] as Array<CountriesInterface>,
            departments: [] as Array<DepartmentsInterface>,
            municipalities: [] as Array<MunicipalitiesInterface>,
            documents: documentType
        }
    },
    actions: {
        async getDepartments() {
            try {

                const responseDepartments = await departmentsService.getAll()
                this.departments = responseDepartments.data
                return this.departments
            } catch (error) {
                console.log(error)
            }
        },
        async getMunicipalities() {
            try {
                const responseMunicipalities = await municipalitiesService.getAll()
                this.municipalities = responseMunicipalities.data
                return this.municipalities
            } catch (error) {
                console.log(error)
            }

        },
        async getCountries() {
            try {
                const responseCountries = await countriesService.getAll()
                this.countries = responseCountries.data
                return this.countries
            } catch (error) {
                console.log(error)
            }
        },
        getDocuments() {
            return this.documents
        },

        async create(customer: CustomerInterface) {
            try {
                this.createCustomer = customer
                const response = await createCustomerService.create(this.createCustomer)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

    }


})