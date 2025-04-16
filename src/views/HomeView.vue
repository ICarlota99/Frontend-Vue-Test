<script setup lang="ts">
import { useProductStore } from '@/store/productStore'
import { onMounted } from 'vue'

import Hero from '@/components/home_sections/Hero.vue'
import ScrollingGrid from '@/components/ScrollingGrid.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import Banner from '@/components/home_sections/Banner.vue'
import Whyus from '@/components/home_sections/Whyus.vue'
import SuscriptionBanner from '@/components/home_sections/SuscriptionBanner.vue'
// import Contact from '@/components/home_sections/Contact.vue'
import BannerSkeleton from '@/components/skeletons/BannerSkeleton.vue'

const store = useProductStore()

onMounted(() => {
  store.fetchProducts()
})
</script>

<template>
  <Hero v-if="!store.productsLoading" />
  <BannerSkeleton v-else />
  <ScrollingGrid title="" :isCategoryView="true" :products="[]"/>
  <ProductGrid 
    title="Productos recomendados" 
    :products="store.products" 
    class="lg:px-10 xl:px-32 py-6 bg-gray-100" 
  /> 
  <Banner />
  <ProductGrid title="Productos más vendidos" :isCategoryView="false" :products="store.products" class="lg:px-10 xl:px-32 py-6 bg-white" />
  <ScrollingGrid title="Últimos añadidos" :isCategoryView="false" :products="store.products" class="bg-gray-100 py-16"/>
  <Whyus />
  <SuscriptionBanner />
  <!-- <ScrollingGrid title="Vinculados a tus compras" /> -->
  <!-- <Contact /> -->
</template>
