<template>
    <Navbar />
    <br>
    <div class="container">
        <div class="row w-100">
            <div class="card col-md-8 mb-8">
                <div class="card-body d-flex flex-column align-items-center">
                    <div class="d-flex mb-2">
                        <button class="btn btn-dark mr-2" @click="getCategoriesByWarehouseStore.previousPage"
                            v-if="getCategoriesByWarehouseStore.page > 0">
                            Anterior
                        </button>
                        <span class="mx-2">pagina: {{ getCategoriesByWarehouseStore.page }}</span>
                        <button class="btn btn-dark mr-2" @click="getCategoriesByWarehouseStore.nextPage">Siguiente</button>
                    </div>

                    <div class="input-group">
                        <input type="search" class="form-control" placeholder="Buscar Categoria" v-model="searchInput"
                            @input="handleSearchInput" @keypress.enter="searchOneCategory()" />
                        <span class="input-group-text">
                            <i class="bi bi-search"></i>
                        </span>
                    </div>
                </div>
            </div>

        </div>
        <br>
        <h2 class="text-center">CATEGORIAS</h2><br>
        <div class="accordion bg-dark " id="accordionExample">
            <div v-for="category in getCategoriesByWarehouseStore.categories" :key="category.idregistro">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" @click="toggleAccordion(category.idregistro)"
                            :class="{ collapsed: activeCategory !== category.idregistro }">
                            <h5 class="text-center"> {{ category.nombre }}</h5>
                        </button>
                    </h2>
                    <div v-if="activeCategory === category.idregistro" class="accordion-collapse collapse show">
                     
                        <div class="accordion-body">
                            <button class="btn btn-primary btn-block w-100"
                                @click="showProducts(getWareHouseStore.warehouseId, category.nombre)">Ver Productos</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script  setup lang="ts" >
import { onMounted, ref, Ref, reactive } from 'vue';
import { useGetCategoriesByWarehouseStore } from '../store/get-categories-store'
import Navbar from '../../components/navbar.vue'
import { useGetWarehouseStore } from '../../stores/getWarehouse.store';
import router from '../../router/index'
const getWareHouseStore = useGetWarehouseStore();
const getCategoriesByWarehouseStore = useGetCategoriesByWarehouseStore()
let activeCategory: Ref<number | null> = ref(null)

const searchInput = ref("");
onMounted(async () => {
    await getCategoriesFunction(getCategoriesByWarehouseStore.page, getCategoriesByWarehouseStore.limit, getCategoriesByWarehouseStore.categorieName)
    await getWarehouse()
})
const getWarehouse = async () => {
    const warehouse = await getWareHouseStore.getWarehouse()

}
const getCategoriesFunction = async (
    page: number,
    limit: number,
    categorieName: string,
) => {
    const categories = await getCategoriesByWarehouseStore.getCategories(page, limit, categorieName)
    return categories
}

const showProducts = (warehouseId: number, categoryName: string) => {

    router.push(`/categories/${warehouseId}/${categoryName}`)

}

const toggleAccordion = (categoryId: number) => {

    if (activeCategory.value === categoryId) {
        activeCategory.value = null;
    } else {
        activeCategory.value = categoryId;
    }
}
const searchOneCategory = () => {

    getCategoriesByWarehouseStore.searchCategory(searchInput.value.trim().toUpperCase())

}
const handleSearchInput = () => {

    if (!searchInput.value.trim()) {
        getCategoriesByWarehouseStore.page = 1;
        getCategoriesByWarehouseStore.limit = 10;
        searchOneCategory();
    }

}


</script>