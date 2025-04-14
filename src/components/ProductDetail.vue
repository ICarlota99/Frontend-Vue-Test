<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { ProductDetail } from '@/types/product'

const route = useRoute()
const product = ref<ProductDetail | null>(null)

defineProps<{ product: ProductDetail }>()

onMounted(async () => {
  const id = route.params.id
  const response = await axios.get(`/products/${id}/details`)
  product.value = response.data
})
</script>

<template>
  <div v-if="product" class="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-xl shadow-md xl:px-32">
    <!-- Thumbnails -->
    <div class="flex lg:flex-col gap-2">
      <img
        v-for="n in 3"
        :key="n"
        :src="product.image"
        class="w-16 h-16 object-contain border rounded cursor-pointer"
        alt="Thumbnail"
      />
    </div>

    <!-- Main Image -->
    <img :src="product.image" alt="Main image" class="max-w-md w-full object-contain rounded-lg" />

    <!-- Product Info -->
    <div class="flex-1 space-y-3">
      <h1 class="text-2xl font-bold text-gray-900">
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

      <div class="text-sm text-gray-600">Marca: {{ product.brand }}</div>

      <div class="flex items-center gap-2">
        <label for="quantity" class="text-sm">Cantidad:</label>
        <div class="flex items-center border rounded-md overflow-hidden text-sm">
          <button class="px-2 py-1 hover:bg-gray-100">-</button>
          <span class="px-3">1</span>
          <button class="px-2 py-1 hover:bg-gray-100">+</button>
        </div>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded">
          🛒 Añadir al carrito
        </button>
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded">
          ❤️ Añadir a favoritos
        </button>
      </div>

      <p class="text-sm text-gray-700 leading-snug pt-2">
        {{ product.description }}
      </p>
    </div>
  </div>

  <!-- Loading state -->
  <div v-else class="text-center py-10">
    Loading product details...
  </div>
</template>
