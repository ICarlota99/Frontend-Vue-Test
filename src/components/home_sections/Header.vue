<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import logo from "/logo.png";
import DeliveryLocation from "../navbar_components/DeliveryLocation.vue";
import SearchBar from "../navbar_components/SearchBar.vue";
import CurrencySelector from "../navbar_components/CurrencySelector.vue";
import NavbarIcon from "../navbar_components/NavbarIcon.vue";
import Menu from "../navbar_components/Menu.vue";

const cartCount = ref(0);
const isLargeScreen = ref(false)

const checkScreenSize = () => {
  isLargeScreen.value = window.matchMedia('(min-width: 1024px)').matches
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <nav class="w-full z-50 mt-2 lg:mt-0">
    <div class="lg:flex lg:items-center lg:py-2 px-4 lg:px-16">
      
      <!-- Logo -->
      <div class="flex items-center gap-4">
        <img :src="logo" alt="TSO Tienda Logo" class="h-8" />

        <!-- Currency Selector for md and sm screens  -->
        <div v-if="!isLargeScreen" class="ml-auto">
          <CurrencySelector />
        </div>
      </div>

      <!-- Delivery + Search Bar -->
      <div class="flex flex-1 my-2 lg:my-0 items-center justify-between">
        <DeliveryLocation class="pe-2 lg:mr-auto"/>
        <SearchBar />
      </div>

      <!-- Currency + Icons -->
      <div v-if="isLargeScreen" class="flex items-center gap-4">
        <CurrencySelector />
        <NavbarIcon name="Perfil" icon="user"/>
        <NavbarIcon name="Carrito" icon="shopping-cart" />
      </div>

      <div v-else class="bg-gray-200 fixed bottom-0 z-50 w-full p-0 flex justify-around items-center py-4 left-0 text-gray-800">
        <Menu />
        <NavbarIcon name="Productos" icon="shopping-bag" />
        <NavbarIcon name="Tiendas" icon="building" />
        <NavbarIcon name="Carrito" icon="shopping-cart" />
        <NavbarIcon name="Perfil" icon="user" />
      </div>
    </div>
    <div v-if="isLargeScreen" class="bg-gray-200 flex items-center lg:py-4 px-4 lg:px-16 justify-center">
      <Menu />
    </div>
  </nav>
</template>
