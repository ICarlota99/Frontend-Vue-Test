<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProductDetail } from '@/types/product'

const props = defineProps<{
  product: ProductDetail
  visible: boolean
  quantity: number
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'add', variationName: string, quantity: number): void
}>()

const selected = ref<number | null>(null)
const localQuantity = ref(props.quantity)

const variations = props.product.variations

// Reset localQuantity when modal opens
watch(() => props.visible, () => {
  if (props.visible) {
    selected.value = null
    localQuantity.value = props.quantity  
  }
})

const selectVariation = (index: number) => {
  selected.value = index
}

// Increase the quantity
const increment = () => {
  localQuantity.value++  
}

// Decrease the quantity but prevent going below 1
const decrement = () => {
  if (localQuantity.value > 1) localQuantity.value--
}

const confirm = () => {
  if (selected.value !== null) {
    emits('add', variations[selected.value].name, localQuantity.value)
    emits('close')
  }
}

const close = () => {
  emits('close')
}
</script>

<template>
  <div v-if="visible" class="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center" @click.stop>
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
      <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-800" @click="close">
        ✖
      </button>
      <h2 class="text-lg font-bold mb-4">Elige tu producto:</h2>
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
      <div class="flex justify-between items-center mt-4">
        <span class="font-semibold">Cantidad: {{ localQuantity }}</span>
        <div class="flex items-center gap-2">
          <button @click.stop="decrement" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
          <button @click.stop="increment" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
        </div>
      </div>
      <button
        class="mt-6 w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded"
        @click.stop="confirm"
        :disabled="selected === null"
      >
        Añadir al carrito
      </button>
    </div>
  </div>
</template>
