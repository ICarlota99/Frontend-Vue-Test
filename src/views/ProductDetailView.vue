<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useProductStore } from '@/store/productStore'
import ProductDetail from '@/components/ProductDetail.vue'
import DetailSkeleton from '@/components/skeletons/DetailSkeleton.vue'
import ScrollingGrid from '@/components/ScrollingGrid.vue'

const route = useRoute()
const store = useProductStore()

onMounted(async () => {
  await store.fetchProductDetails(route.params.id.toString())
  await store.fetchProducts() // Needs to implement a fetchRelatedProducts function
})

// Watch for changes in the route id to fetch the correct product details.
watch(
  () => route.params.id,
  async (newId) => {
    await store.fetchProductDetails(newId.toString())
  }
)
</script>

<template>
  <div class="p-6 xl:px-32 bg-gray-50">
    <ProductDetail 
      v-if="store.productDetails" 
      :key="store.productDetails.id"
      :product="store.productDetails" 
    />
    <div v-else class="text-center py-10">
      <DetailSkeleton />
    </div>
  </div>
  <ScrollingGrid title="Productos similares" :isCategoryView="false" :products="store.products" class="bg-gray-100 py-16"/>
</template>