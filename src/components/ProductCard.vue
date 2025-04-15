<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/store/productStore'
import type { Product, ProductDetail } from '@/types/product'
import { useCartStore } from '@/store/cart'
import VariationModal from '@/components/VariationModal.vue'

// Props
const props = defineProps<{ product: Product }>()
const { product } = props

// State
const quantity = ref(1)
const modalVisible = ref(false)
const productDetails = ref<ProductDetail | null>(null)
const productStore = useProductStore()

// Router
const router = useRouter()

// Cart Store
const cart = useCartStore()
const handleAdd = (variationName: string, qty: number) => {
  cart.addToCart(
    { ...product, name: `${props.product.name} (${variationName})` },
    qty
  )
}

// Methods
const increment = () => {
  quantity.value++
}

const decrement = () => {
  if (quantity.value > 1) quantity.value--
}

const goToDetails = () => {
  router.push({ 
    name: 'ProductDetailView', 
    params: { id: product.id }
  })
}

const openModal = async () => {
  if (!productDetails.value || productDetails.value.id !== product.id) {
    try {
      await productStore.fetchProductDetails(product.id)
      productDetails.value = productStore.productDetails
    } catch (error) {
      console.error('Error al cargar detalles del producto:', error)
      return
    }
  }
  modalVisible.value = true
}
</script>


<template>
  <div @click="goToDetails" class="cursor-pointer relative hover:scale-[1.03] hover:shadow-md duration-500">
    <!-- Card content -->
    <div v-if="product" class="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-row md:flex-col gap-4 h-full relative">
      <!-- Badges -->
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

      <!-- Calendar Icon -->
      <button
        @click.stop="router.push({ name: 'SelectDateTime', params: { id: product.id } })"
        class="absolute left-2 top-[60px] sm:top-2 sm:left-auto sm:right-2 z-10 text-gray-600 hover:text-gray-500 hover:bg-blue-300 bg-blue-200 rounded-md w-fit"
      >
        <i class="pi pi-calendar p-2"></i>
      </button>


      <!-- Product Image -->
      <div class="w-full aspect-square mb-3 relative">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-contain rounded-lg"
        />
        <!-- Store name -->
        <span class="absolute text-xs text-gray-500 bottom-2 right-2 bg-white rounded-md px-1">{{ product.store }}</span>
      </div>

      <!-- Product Content -->
      <div class="flex flex-col flex-1">
        <div>
          <h3 class="text-sm font-semibold text-gray-900 leading-tight min-h-[3rem]">
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
            <button @click.stop="decrement" class="px-1 py-1 hover:bg-gray-100">−</button>
            <span class="px-3">{{ quantity }}</span>
            <button @click.stop="increment" class="px-1 py-1 hover:bg-gray-100">+</button>
          </div>
          <button
            @click.stop="openModal"
            class="flex-1 flex items-center justify-center gap-2 bg-amber-200 hover:bg-amber-300 text-amber-950 font-semibold p-1.5 rounded-md text-sm"
          >
            <i class="pi pi-shopping-cart"></i>
            Añadir
          </button>
        </div>
      </div>
    </div>

    <div v-else class="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-row md:flex-col gap-4 h-full relative">
      <!-- Skeleton for Product Image -->
      <div class="w-full aspect-square mb-3 relative bg-gray-200 rounded-lg animate-pulse"></div>

      <!-- Skeleton for Product Content -->
      <div class="flex flex-col flex-1">
          <!-- Product Name -->
          <div class="h-4 bg-gray-200 rounded-full animate-pulse mb-2 w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded-full animate-pulse mb-4 w-1/2"></div>

          <!-- Price -->
          <div class="flex items-center gap-2 mt-1">
              <div class="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
              <div class="h-4 bg-gray-200 rounded-full animate-pulse w-12"></div>
              <div class="ml-auto h-5 bg-gray-200 rounded-full animate-pulse w-20"></div>
          </div>

          <!-- Quantity Selector + Add to Cart -->
          <div class="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100">
              <div class="flex items-center border rounded-md text-sm w-24 h-8 bg-gray-200 animate-pulse"></div>
              <div class="flex-1 h-8 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
      </div>
    </div>
  </div>
  <!-- Variation modal -->
  <VariationModal
      v-if="productStore.productDetails"
      :visible="modalVisible"
      :product="productStore.productDetails"
      :quantity="quantity"
      @close="modalVisible = false"
      @add="handleAdd"
    />
</template>
