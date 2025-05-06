<script setup lang="ts">
import { ref } from "vue";
import logo from "/logo.png";
import DeliveryLocation from "../navbar_components/DeliveryLocation.vue";
import SearchBar from "../navbar_components/SearchBar.vue";
import CurrencySelector from "../navbar_components/CurrencySelector.vue";
import NavbarIcon from "../navbar_components/NavbarIcon.vue";
import Menu from "../navbar_components/Menu.vue";

const cartCount = ref(0);
</script>

<template>
  <nav class="w-full z-50">
    <div class="lg:flex lg:items-center lg:justify-between lg:px-24 lg:py-2">
      
      <!-- Logo + Delivery -->
      <div class="flex items-center gap-4">
        <img :src="logo" alt="TSO Tienda Logo" class="h-8" />
        <DeliveryLocation />
      </div>

      <!-- Search Bar -->
      <div class="flex-1 flex justify-center my-2 lg:my-0">
        <SearchBar />
      </div>

      <!-- Currency + Icons -->
      <div class="flex items-center gap-4">
        <CurrencySelector />
        <NavbarIcon name="Perfil" icon="user"/>
        <NavbarIcon name="Carrito" icon="shopping-cart" />
      </div>

    </div>

    <Menu class="bg-gray-100"/>
  </nav>
</template>
