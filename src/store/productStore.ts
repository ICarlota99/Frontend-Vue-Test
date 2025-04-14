import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Product, ProductDetail } from '@/types/product'

export const useProductStore = defineStore('products', () => {
  // State definitions
  const products = ref<Product[]>([])
  const productDetails = ref<ProductDetail | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  // Fetches all published products from API
  const fetchProducts = async () => {
    try {
      loading.value = true
      const response = await axios.get('/products/published/web')
      console.log('API response:', response.data)
      products.value = response.data
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  // Fetches detailed information for a specific product
  const fetchProductDetails = async (id: string) => {
    try {
      loading.value = true
      const response = await axios.get(`/products/${id}/details`)
      productDetails.value = response.data
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    products,
    productDetails,
    loading,
    error,
    
    // Actions
    fetchProducts,
    fetchProductDetails
  }
})