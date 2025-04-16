<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProductDetail } from '@/types/product'

// Define props received by this modal component
const props = defineProps<{
  product: ProductDetail
  visible: boolean
  quantity: number
}>()

// Define custom events emitted by this component
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'add', variationName: string, quantity: number): void
}>()

// Index of the currently selected variation
const selected = ref<number | null>(null)

// Internal copy of the quantity, initialized from the prop
const localQuantity = ref(props.quantity)

// Extract variations from product
const variations = props.product.variations

// Watch for changes in visibility to reset modal state when opened
watch(() => props.visible, () => {
  if (props.visible) {
    selected.value = null              // Clear selected variation
    localQuantity.value = props.quantity  // Reset quantity
  }
})

// Select a variation by its index
const selectVariation = (index: number) => {
  selected.value = index
}

// Increase the quantity
const increment = () => {
  localQuantity.value++  
}

// Decrease the quantity (minimum is 1)
const decrement = () => {
  if (localQuantity.value > 1) localQuantity.value--
}

// Emit the "add" event and close modal if a variation is selected
const confirm = () => {
  if (selected.value !== null) {
    emits('add', variations[selected.value].name, localQuantity.value)
    emits('close')
  }
}

// Emit the "close" event
const close = () => {
  emits('close')
}
</script>

<template>
  <!-- Modal overlay shown only when `visible` is true -->
  <div v-if="visible" class="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" @click.stop>
    
    <!-- Modal container -->
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
      
      <!-- Close (X) button -->
      <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-800" @click="close">
        ✖
      </button>

      <!-- Title -->
      <h2 class="text-lg font-bold mb-4">Choose your product:</h2>

      <!-- List of variation buttons -->
      <div class="flex flex-col gap-2 mb-4">
        <button
          v-for="(variation, index) in variations"
          :key="index"
          class="p-2 border rounded-md hover:bg-gray-100"
          :class="{ 'bg-blue-100 border-blue-400': selected === index }"
          @click.stop="selectVariation(index)"
        >
          {{ variation.name }}
        </button>
      </div>

      <!-- Quantity selector -->
      <div class="flex justify-between items-center mt-4">
        <span class="font-semibold">Quantity: {{ localQuantity }}</span>
        <div class="flex items-center gap-2">
          <button @click.stop="decrement" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
          <button @click.stop="increment" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
        </div>
      </div>

      <!-- Confirm and add to cart button -->
      <button
        class="mt-6 w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded"
        @click.stop="confirm"
        :disabled="selected === null"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

