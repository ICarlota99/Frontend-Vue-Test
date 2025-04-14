<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/product'

const props = defineProps<{ product: Product }>()

const quantity = ref(1)
const router = useRouter()

const increment = () => {
  quantity.value++
}

const decrement = () => {
  if (quantity.value > 1) quantity.value--
}

const goToDetails = () => {
  router.push({ 
    name: 'ProductDetailView', 
    params: { id: props.product.id }
  })
}
</script>

<template>
  <div
    class="bg-white rounded-xl border shadow-sm p-3 flex flex-row md:flex-col gap-4 relative"
  >
    <!-- Discount Badge -->
    <div class="absolute top-2 left-2 flex flex-col gap-1 z-10">
      <span
        v-if="product.discountPercentage"
        class="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"
      >
        <span>🔖</span> - {{ product.discountPercentage }}%
      </span>

      <span
        v-if="product.isNew"
        class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-md"
      >
        ⭐️ NUEVO
      </span>
    </div>

    <!-- Details Icon -->
    <div class="absolute top-2 right-2">
      <button
        @click="goToDetails"
        class="text-gray-400 hover:text-gray-600"
      >
        🖉
      </button>
    </div>

    <!-- Product Image -->
    <img
      :src="product.image"
      :alt="product.name"
      class="w-32 h-32 md:w-full md:h-40 object-contain rounded-lg"
    />

    <!-- Product Content -->
    <div class="flex flex-col gap-2 flex-1">
      <!-- Store name -->
      <span class="text-xs text-gray-500">{{ product.store }}</span>

      <!-- Product name -->
      <h3 class="text-sm font-semibold text-gray-900 leading-tight">
        {{ product.name }}
      </h3>

      <!-- Prices -->
      <div class="flex items-center gap-2">
        <span
          v-if="product?.actualPrice !== undefined"
          class="text-lg font-bold text-gray-800"
        >
          ${{ product.actualPrice.toFixed(2) }}
        </span>
        <span
          v-if="product?.originalPrice !== undefined"
          class="text-sm text-red-600 line-through"
        >
          ${{ product.originalPrice.toFixed(2) }}
        </span>
        <span
          v-if="product.freeShipping"
          class="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded"
        >
          Envío gratis
        </span>
      </div>

      <!-- Quantity Selector + Add to Cart -->
      <div class="flex items-center gap-2 mt-2">
        <div class="flex items-center border rounded-md overflow-hidden text-sm">
          <button @click="decrement" class="px-2 py-1 hover:bg-gray-100">−</button>
          <span class="px-3">{{ quantity }}</span>
          <button @click="increment" class="px-2 py-1 hover:bg-gray-100">+</button>
        </div>

        <button
          class="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-800 text-gray-600 font-semibold py-1.5 rounded-md text-sm"
          @click="console.log(`Added ${quantity} x ${product.name}`)"
        >
          🛒 Añadir
        </button>
      </div>
    </div>
  </div>
</template>


