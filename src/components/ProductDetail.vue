<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { ProductDetail } from '@/types/product'

const route = useRoute()
const product = ref<ProductDetail | null>(null)
const selectedVariation = ref<string | null>(null)

defineProps<{ product: ProductDetail }>()

onMounted(async () => {
  const id = route.params.id
  const response = await axios.get(`/products/${id}/details`)
  product.value = response.data

  // Default to first variation
  if (product.value?.variations.length) {
    selectedVariation.value = product.value.variations[0].name
  }
})
</script>


<template>
  <div v-if=!product class="space-y-4 animate-pulse px-64">
    <!-- Skeleton Loader -->
    <div class="flex space-x-6 animate-pulse flex-col lg:flex-row gap-6 p-6 lg:px-12 xl:px-20 2xl:px-24 max-w-6xl mx-auto">
      <!-- Skeleton for Product Image -->
      <div class="w-full object-contain bg-gray-300 rounded-lg"></div>

      <!-- Skeleton for Product Content (name, price, quantity) -->
      <div class="flex-1 space-y-4">
        <!-- Skeleton for Product Name -->
        <div class="w-2/5 h-4 bg-gray-300 rounded-md"></div>
        <div class="flex-1 bg-gray-300 h-15 w-3/4 rounded-md"></div>

        <!-- Skeleton for Prices -->
        <div class="w-1/3 h-5 bg-gray-300 rounded-md"></div>
        <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>
        <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>

        <!-- Skeleton for Quantity Selector -->
        <div class="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100">
          <div class="w-1/10 h-3 bg-gray-300 rounded-md"></div>
          <div class="flex items-center border rounded-md overflow-hidden text-sm">
            <div class="w-6 h-8 bg-gray-300"></div>
            <div class="w-10 h-8 bg-gray-300 mx-2"></div>
            <div class="w-6 h-8 bg-gray-300"></div>
          </div>
        </div>
         <!-- Skeleton for buttons -->
        <div class="flex gap-2 mt-4 animate-pulse">
          <div class="bg-gray-200 h-8 w-32 rounded"></div>
          <div class="bg-gray-200 h-8 w-32 rounded"></div>
        </div>
        <!-- Text  -->
        <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>
        <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col lg:flex-row gap-6 p-6 lg:px-12 xl:px-20 2xl:px-24 max-w-6xl mx-auto bg-white rounded-xl shadow-md"
  >
    <!-- Thumbnails -->
    <div class="flex lg:flex-col gap-2">
      <img
        v-for="variation in product.variations"
        :key="variation.name"
        :src="variation.image"
        @click="selectedVariation = variation.name"
        class="w-16 h-16 object-contain border rounded cursor-pointer"
        :class="{ 'ring-2 ring-cyan-600': selectedVariation === variation.name }"
        alt="Thumbnail"
      />
    </div>

    <!-- Main Image -->
    <img :src="product.image" alt="Main image" class="max-w-md w-full object-contain rounded-lg" />

    <!-- Product Info -->
    <div class="flex-1 space-y-3">
      <a href="" class="underline py-3">Helados Ikoko</a>
      <h1 class="text-4xl font-bold text-gray-900 py-4">
        {{ product.name }}
      </h1>

      <div class="text-lg text-gray-800 flex gap-2 items-center">
        <span class="font-semibold">${{ product.actualPrice.toFixed(2) }}</span>
        <span v-if="product.originalPrice" class="line-through text-gray-400 text-base">
          ${{ product.originalPrice.toFixed(2) }}
        </span>
        <span
          v-if="product.discountPercentage"
          class="text-pink-600 text-sm bg-pink-100 px-2 py-0.5 rounded"
        >
          -{{ product.discountPercentage }}%
        </span>
      </div>

      <div class="text-sm text-gray-600">
        Marca: 
        <span class="bg-gray-200 p-1 rounded-md">{{ product.brand }}</span>
      </div>

      <div v-if="selectedVariation" class="text-sm text-gray-600">
        <span class="bg-yellow-100 text-yellow-900 font-medium p-1 rounded-md">
          {{ selectedVariation }}
        </span>
      </div>


      <div class="flex items-center gap-2">
        <label for="quantity" class="text-sm">Cantidad:</label>
        <div class="flex items-center border rounded-md overflow-hidden text-sm">
          <button class="px-2 py-1 hover:bg-gray-100">-</button>
          <span class="px-3">1</span>
          <button class="px-2 py-1 hover:bg-gray-100">+</button>
        </div>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="bg-amber-200 hover:bg-amber-300 text-amber-950 font-semibold px-4 py-2 rounded">
          <i class="pi pi-shopping-cart"></i> Añadir al carrito
        </button>
        <button class="bg-cyan-900 hover:bg-cyan-800 text-white px-4 py-2 rounded">
          <i class="pi pi-heart"></i> Añadir a favoritos
        </button>
      </div>

      <p class="text-sm text-gray-700 leading-snug pt-2">
        {{ product.description }}
      </p>
    </div>
  </div>
</template>
