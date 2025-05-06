<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDeliveryStore } from '@/store/deliveryStore'
import { storeToRefs } from 'pinia'

// Declare reactive variables
const isDropdownOpen = ref(false)
const deliveryStore = useDeliveryStore()
const { locations, selectedLocation, isLoading } = storeToRefs(deliveryStore)
const { setSelectedLocation } = deliveryStore

// Fetch locations when component mounts
onMounted(() => {
  if (deliveryStore.locations.length === 0) {
    deliveryStore.fetchLocations()
  }
})
</script>

<template>
  <div class="relative">
    <button 
      @click="isDropdownOpen = !isDropdownOpen"
      class="flex items-center gap-2 cursor-pointer"
      :disabled="isLoading"
    >
        <i class="pi pi-map-marker bg-amber-200 text-amber-950 p-2 rounded-full"></i>
        <div>
            <span class="text-xs">Entregar en:</span><br>
            <span class="text-sm font-medium underline text-amber-950">
            {{ selectedLocation?.name || (isLoading ? 'Cargando...' : 'Seleccionar') }}
            </span>
        </div>
    </button>

    <div 
      v-if="isDropdownOpen && !isLoading"
      class="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
    >
      <ul class="py-1 max-h-60 overflow-auto">
        <li
          v-for="location in locations"
          :key="location.id"
          @click="setSelectedLocation(location); isDropdownOpen = false"
          class="px-4 py-2 text-sm hover:bg-amber-50 cursor-pointer"
          :class="{ 'bg-amber-100': selectedLocation?.id === location.id }"
        >
          {{ location.name }}
          <span class="text-xs text-gray-500 ml-2">(${{ location.price }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>