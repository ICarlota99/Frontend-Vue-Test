<script setup lang="ts">
import type { Product } from '@/types/product'
import { useProductStore } from '@/store/productStore';
import ProductCard from './ProductCard.vue'
import CardSkeleton from './skeletons/CardSkeleton.vue';

defineProps<{
  title: string
  products: Product[]
}>()

const store = useProductStore()
</script>

<template>
  <div class="bg-gray-50 space-y-6 lg:px-8 xl:px-32 2xl:px-64 py-12 px-4">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-gray-800 py-6 text-center lg:text-left">{{ title }}</h1>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:gap-4 gap-2">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <!-- Show Skeleton when loading -->
      <CardSkeleton v-if="store.productsLoading" v-for="index in 10" :key="index" />
    </div>

    <a href="" class="block mx-auto w-fit py-2 hover:bg-gray-400 p-2 rounded-md">
      Ver todos los productos 
      <i class="pi pi-arrow-right bg-gray-200 rounded-full p-2"></i>
    </a>
  </div>
</template>
