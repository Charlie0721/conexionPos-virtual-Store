import { defineStore } from 'pinia'
import { CountriesInterface, DepartmentsInterface, MunicipalitiesInterface } from '../interfaces/countries.interfaces'
import { CustomerInterface, SearchCustomerInterface } from '../interfaces/customer.interface';
import { UpdateCustomerInterface } from '../interfaces/update-customer.interface';
import { CreateCustomerService } from '../services/create-customer.service'
import { CountriesService } from '../services/get-countries.service'
import { DepartmentsService } from '../services/get-departments.service'
import { MunicipalitiesService } from '../services/get-municipalities.service'
import documentType from '../document-type/documentsType.json';
import { SearchCustomerService } from '../services/search-customer.service'
import { UpdateCustomerService } from '../services/update-customer.service'

const createCustomerService = new CreateCustomerService()
const countriesService = new CountriesService()
const departmentsService = new DepartmentsService()
const municipalitiesService = new MunicipalitiesService()
const searchCustomerService = new SearchCustomerService()
const updateCustomerService = new UpdateCustomerService()
export const useCustomersStore = defineStore('customerStore', {

    state: () => {
        return {
            createCustomer: {} as CustomerInterface,
            countries: [] as Array<CountriesInterface>,
            departments: [] as Array<DepartmentsInterface>,
            municipalities: [] as Array<MunicipalitiesInterface>,
            documents: documentType,
            searchCustomerByNit: {} as SearchCustomerInterface,
            customerFound: {} as CustomerInterface,
            notFound: [] as any,
            updateCustomerObject: {} as UpdateCustomerInterface,
            customerId: 0 as number,
            responseUpdatedCustomer:[] as any
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
        },
        async searchCustomer(customer: SearchCustomerInterface) {

            try {
                this.searchCustomerByNit = customer
                const response = await searchCustomerService.search(this.searchCustomerByNit)
                this.customerId = response.data.idtercero

                if (response.status === 201) {
                    this.customerFound = response.data
                    return this.customerFound
                }
                if (response.data.status == 404) {
                    this.notFound = response.data.message
                    return this.notFound
                }

            } catch (error) {
                console.log(error)
            }

        },

        async updateCustomer(customerId: number, update: UpdateCustomerInterface) {
            this.updateCustomerObject = update;
            try {
                const response = await updateCustomerService.update(customerId, this.updateCustomerObject);
                console.log(response);
                this.responseUpdatedCustomer=response.status
            } catch (error) {
                console.log(error);
            }
        }
    }


})