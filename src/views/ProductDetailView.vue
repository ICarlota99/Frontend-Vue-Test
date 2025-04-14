<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useProductStore } from '@/store/productStore'
import ProductDetail from '@/components/ProductDetail.vue'

const route = useRoute()
const store = useProductStore()

onMounted(async () => {
  await store.fetchProductDetails(route.params.id.toString())
})
</script>

<template>
  <div class="p-6 xl:px-32">
    <ProductDetail 
      v-if="store.productDetails" 
      :product="store.productDetails" 
    />
    <div v-else class="text-center py-10">
      Loading product details...
    </div>
  </div>
</template>