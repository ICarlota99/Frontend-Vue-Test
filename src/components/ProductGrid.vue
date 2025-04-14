<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductCard from './ProductCard.vue'

defineProps<{
  title: string
  products: Product[]
}>()
</script>

<template>
  <div class="space-y-6 lg:px-8 xl:px-32">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-800 py-4">{{ title }}</h1>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
