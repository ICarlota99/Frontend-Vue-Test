<script setup lang="ts">
import { useProductStore } from '@/store/productStore'
import { useCategoryStore } from '@/store/categoryStore'
import { onMounted } from 'vue'

import Header from '@/components/home_sections/Header.vue'
import Hero from '@/components/home_sections/Hero.vue'
import ScrollingGrid from '@/components/ScrollingGrid.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import Banner from '@/components/home_sections/Banner.vue'
import Whyus from '@/components/home_sections/Whyus.vue'
import SuscriptionBanner from '@/components/home_sections/SuscriptionBanner.vue'
// import Contact from '@/components/home_sections/Contact.vue'
// import Footer from '@/components/home_sections/Footer.vue'

const store = useProductStore()
const catStore = useCategoryStore()

onMounted(() => {
  store.fetchProducts()
  catStore.fetchCategories()
})
</script>

<template>
  <Header />
  <Hero />
  <ScrollingGrid title="" :isCategoryView="true" :categories="catStore.categories" :products="[]"/>
  <ProductGrid 
    title="Productos recomendados" 
    :products="store.products" 
    class="lg:px-10 xl:px-32 py-6 bg-gray-100" 
  /> 
  <Banner />
  <ProductGrid title="Productos más vendidos" :products="store.products" class="lg:px-10 xl:px-32 py-6 bg-white" />
  <ScrollingGrid title="Últimos añadidos" :isCategoryView="false" :categories="[]" :products="store.products" class="bg-gray-100 py-16"/>
  <Whyus />
  <SuscriptionBanner />
  <!-- <ScrollingGrid title="Vinculados a tus compras" /> -->
  <!-- <Contact /> -->
  <!-- <Footer /> -->
</template>
