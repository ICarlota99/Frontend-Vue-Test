<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/types/product'

// Props
const props = defineProps<{ product: Product }>()

// State
const quantity = ref(1)
const showAlert = ref(false)

const cart = useCartStore()
const router = useRouter()

// Handlers
const handleAdd = (qty: number) => {
  // Select 1st variation
  const variationName = props.product.variations?.[0]?.name || 'Default Variation'

  cart.addToCart(
    { ...props.product, name: `${props.product.name} (${variationName})` },
    qty
  )
}

// Handle quantities and alerts
const increment = () => {
  showAlert.value = false
  quantity.value++
}

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--
    showAlert.value = false
  } else {
    showAlert.value = true
    setTimeout(() => {
      showAlert.value = false
    }, 3000)
  }
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
    @click="goToDetails" 
    class="cursor-pointer relative hover:scale-[1.03] hover:shadow-md duration-300"
  >
    <!-- Actual Product Card -->
    <div v-if="product" class="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-row md:flex-col gap-4 h-full relative">
      <!-- Badges for Discounts and New Products -->
      <div class="absolute top-2 left-2 flex flex-col gap-1 z-10 w-auto">
        <span
          v-if="product.discountPercentage"
          class="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit"
        >
          <i class="pi pi-tag"></i> - {{ product.discountPercentage }}%
        </span>
        <span
          v-if="product.isNew"
          class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-md w-fit"
        >
          <i class="pi pi-star"></i> <span class="hidden sm:inline">NUEVO</span>
        </span>
      </div>

      <!-- Calendar Icon for Date Selection -->
      <button
        @click.stop="router.push({ name: 'SelectDateTime', params: { id: product.id } })"
        class="absolute left-2 top-[60px] sm:top-2 sm:left-auto sm:right-2 z-10 text-gray-600 hover:text-gray-500 hover:bg-blue-300 bg-blue-200 rounded-md w-fit"
      >
        <i class="pi pi-calendar p-2"></i>
      </button>

      <!-- Product Image and Store Name -->
      <div class="w-full aspect-square mb-3 relative">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-contain rounded-lg"
        />
        <span class="absolute text-xs text-gray-500 bottom-2 right-2 bg-white rounded-md px-1">{{ product.store }}</span>
      </div>

      <!-- Product Content (Name, Price, Free Shipping) -->
      <div class="flex flex-col flex-1">
        <div>
          <h3 class="font-semibold text-gray-900 leading-tight min-h-[3rem]">
            {{ product.name }}
          </h3>

          <div class="flex items-center gap-2 mt-1">
            <span class="text-lg font-bold text-gray-800">
              ${{ product.actualPrice.toFixed(2) }}
            </span>
            <span
              v-if="product.originalPrice"
              class="text-xs text-red-600 line-through"
            >
              ${{ product.originalPrice.toFixed(2) }}
            </span>
            <span
              v-if="product.freeShipping"
              class="ml-auto text-xs text-green-600 bg-green-100 px-1 py-0.5 rounded text-center"
            >
              Envío gratis
            </span>
          </div>
        </div>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Quantity Selector + Add to Cart -->
        <div class="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100">
          <div class="flex items-center border rounded-md text-sm z-10">
            <button 
              @click.stop="decrement"
              :class="{
                'bg-gray-300': quantity === 1, // Light gray when quantity is 1
                'hover:bg-gray-100': quantity > 1
              }"
              class="px-1 py-1"
            >
              −
            </button>
            <span class="px-3">{{ quantity }}</span>
            <button @click.stop="increment" class="px-1 py-1 hover:bg-gray-100">+</button>
          </div>
          <button
            @click.stop="handleAdd(quantity)"
            class="flex-1 flex items-center justify-center gap-1 bg-amber-200 hover:bg-amber-300 text-amber-950 font-semibold p-1.5 rounded-md text-sm"
          >
            <i class="pi pi-shopping-cart"></i>
            Añadir
          </button>
        </div>
        <!-- Alert shown below the card -->
        <div v-if="showAlert" class="mt-2 text-sm text-amber-900 bg-amber-100 rounded-md px-3 py-1 absolute bottom-0 z-10 max-widht-1/2">
          <i class="pi pi-info-circle pe-2"></i>  
          <span> Cantidad mínima para este producto</span>
        </div>
      </div>
    </div>
  </div>
</template>
