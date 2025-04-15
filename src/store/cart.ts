import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = ref<{ product: Product; quantity: number }[]>([])

  // Add item to cart
  const addToCart = (product: Product, quantity = 1) => {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
  }

   // Remove item from cart
  const removeFromCart = (productId: string) => {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  // Calculate total items and price
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity * item.product.actualPrice, 0)
  )

  return { items, addToCart, removeFromCart, totalItems, totalPrice }
})
