import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Product, ProductDetail } from '@/types/product'

export const useProductStore = defineStore('products', () => {
  // State definitions
  const products = ref<Product[]>([])  // List of products
  const productDetails = ref<ProductDetail | null>(null)  // Details of a single product
  const productsLoading = ref(false)  // Loading state for products
  const productDetailsLoading = ref(false)  // Loading state for product details
  const error = ref<string | null>(null)  // Error state for any failures

  // Fetches all published products from API
  const fetchProducts = async () => {
    try {
      productsLoading.value = true  // Start loading products
      const response = await axios.get('/products/published/web')
      console.log('API response:', response.data)
      products.value = response.data  // Store fetched products
    } catch (err) {
      error.value = (err as Error).message  // Capture any errors
    } finally {
      productsLoading.value = false  // Finish loading products
    }
  }

  // Fetches detailed information for a specific product
  const fetchProductDetails = async (id: string) => {
    try {
      productDetailsLoading.value = true  // Start loading product details
      const response = await axios.get(`/products/${id}/details`)
      productDetails.value = response.data  // Store fetched product details
    } catch (err) {
      error.value = (err as Error).message  // Capture any errors
    } finally {
      productDetailsLoading.value = false  // Finish loading product details
    }
  }

  return {
    // State
    products,
    productDetails,
    productsLoading,
    productDetailsLoading,
    error,

    // Actions
    fetchProducts,
    fetchProductDetails
  }
})
