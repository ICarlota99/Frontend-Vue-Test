import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Category } from '@/types/product'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const categoriesLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    try {
      categoriesLoading.value = true
      const response = await axios.get('/categories')
      categories.value = response.data
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      categoriesLoading.value = false
    }
  }

  return {
    categories,
    categoriesLoading,
    error,
    fetchCategories
  }
})
