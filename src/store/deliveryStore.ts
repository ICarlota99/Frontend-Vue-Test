// stores/deliveryStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import type { DeliveryCosts } from '@/types/deliveryCosts'

interface DeliveryState {
  locations: DeliveryCosts[]
  selectedLocation: DeliveryCosts | null
  isLoading: boolean
  error: Error | null
}

export const useDeliveryStore = defineStore('delivery', {
  state: (): DeliveryState => ({
    locations: [],
    selectedLocation: null,
    isLoading: false,
    error: null
  }),
  
  actions: {
    async fetchLocations() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.get('/delivery-locations')
        this.locations = response.data
        
        // Try to load saved location or use first as default
        const savedLocation = localStorage.getItem('deliveryLocation')
        this.selectedLocation = savedLocation 
          ? JSON.parse(savedLocation)
          : this.locations[0]
          
      } catch (error) {
        this.error = error instanceof Error ? error : new Error('Failed to fetch locations')
      } finally {
        this.isLoading = false
      }
    },
    
    setSelectedLocation(location: DeliveryCosts) {
      if (!this.locations.some(l => l.id === location.id)) {
        throw new Error('Invalid location selected')
      }
      
      this.selectedLocation = location
      localStorage.setItem('deliveryLocation', JSON.stringify(location))
    }
  },
  
  getters: {
    deliveryFee: (state) => state.selectedLocation?.price ?? 0,
    
    formattedLocations: (state) => 
      state.locations.map(loc => ({
        ...loc,
        label: `${loc.name} ($${loc.price.toFixed(2)})` // Ensures proper price formatting
      })),
      
    isLocationSelected: (state) => (locationId: string) => 
      state.selectedLocation?.id === locationId
  }
})