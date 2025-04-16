import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Product, ProductDetail } from '@/types/product'

export const useProductStore = defineStore('products', () => {
  // State definitions
  const products = ref<Product[]>([])  // List of products
  const productDetails = ref<ProductDetail | null>(null)  // Details of a single product
  const productDetailsCache = ref<Record<string, ProductDetail>>({}) // Id cache
  const productsLoading = ref(false)  // Loading state for products
  const productDetailsLoading = ref(false)  // Loading state for product details
  const error = ref<string | null>(null)  // Error state for any failures

  // Fetches all published products from API
  const fetchProducts = async () => {
    try {
      productsLoading.value = true  // Start loading products
      const response = await axios.get('/products/published/web')
      products.value = response.data  // Store fetched products
    } catch (err) {
      error.value = (err as Error).message  // Capture any errors
    } finally {
      productsLoading.value = false  // Finish loading products
    }
  }

  // Fetches detailed information for a specific product
  const fetchProductDetails = async (id: string) => {
    productDetailsLoading.value = true
    error.value = null
     
    // Check cache
    try {
      if (productDetailsCache.value[id]) {
        productDetails.value = productDetailsCache.value[id]
        return
      }

      const response = await axios.get(`/products/${id}/details`)
        // Save response
        productDetailsCache.value[id] = response.data
        productDetails.value = response.data
      } catch (err) {
        error.value = (err as Error).message
        console.error('Error fetching product details:', err)
      } finally {
        productDetailsLoading.value = false
      }
  }

  // Consult cache
  const getCachedProductDetails = (id: string) => {
    return productDetailsCache.value[id]
  }

  // Clear cache
  const clearProductDetails = () => {
    productDetails.value = null
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
    fetchProductDetails,
    clearProductDetails,
    getCachedProductDetails
  }
})
