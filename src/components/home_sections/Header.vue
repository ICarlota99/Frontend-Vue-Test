<script setup lang="ts">
import { ref } from "vue";
import logo from "/logo.png";
import DeliveryLocation from "../navbar_components/DeliveryLocation.vue";

const selectedCurrency = ref('USD');
const cartCount = ref(0);
</script>

<template>
    <nav class="w-full z-50">
      <div>
        <!-- Unified navbar in larger screens (lg) -->
        <div class="lg:flex lg:justify-between lg:items-center lg:px-24 lg:py-2 lg:gap-4 hidden">
          <!-- Logo y ubicación -->
          <div class="flex items-center gap-4 lg:order-1">
            <img :src="logo" alt="TSO Tienda Logo" class="h-8" />
            <DeliveryLocation />
            <!-- <div class="flex items-center gap-2">
              <i class="pi pi-map-marker bg-amber-200 text-amber-950 p-2 rounded-full"></i>
              <div>
                <span class="text-xs">Entregar en:</span><br>
                <span class="text-sm font-medium underline text-amber-950">Arroyo Naranjo</span>
              </div>
            </div> -->
          </div>

          <!-- Search bar -->
          <div class="lg:flex lg:items-center lg:flex-1 lg:max-w-2xl lg:order-2">
            <div class="flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Busca chuleta de cerdo"
                class="flex-1 px-4 py-2 border border-gray-300 rounded"
              />
              <button class="text-amber-950 bg-amber-200 hover:bg-amber-300 px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap">
                <i class="pi pi-search"></i>
                <span>Buscar</span>
              </button>
            </div>
          </div>

          <!-- Currency selector -->
          <div class="lg:block lg:order-3">
            <select v-model="selectedCurrency" class="bg-transparent border rounded px-2 py-1">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <i class="pi pi-user ps-6"></i>
            <i class="pi pi-shopping-cart ps-6"></i>
          </div>
        </div>

        <!-- Mobile/tablet version (md y sm) -->
        <div class="lg:hidden">
          <!-- Top Bar -->
          <div class="flex justify-between items-center px-4 py-2">
            <img :src="logo" alt="TSO Tienda Logo" class="h-8" />
            <select v-model="selectedCurrency" class="bg-transparent border rounded px-2 py-1">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <!-- Combined navbar -->
          <div class="flex items-center gap-2 px-4 py-2">
            <!-- Icono de ubicación -->
            <i class="pi pi-map-marker bg-amber-200 text-amber-950 p-2 rounded-full flex-shrink-0"></i>
            
            <!-- Search bar -->
            <div class="flex-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="Busca chuleta de cerdo"
                class="flex-1 px-4 py-2 border border-gray-300 rounded"
              />
              <button class="text-amber-950 bg-amber-200 hover:bg-amber-300 px-4 py-2 rounded-md">
                <i class="pi pi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Bottom Menu Bar -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center py-4 text-sm text-gray-700 z-[100] font-bold">
        <div class="flex flex-col items-center">
          <i class="pi pi-bars"></i>
          <span>MENÚ</span>
        </div>
        <div class="flex flex-col items-center">
          <i class="pi pi-shopping-bag"></i>
          <span>Tiendas</span>
        </div>
        <div class="flex flex-col items-center">
          <i class="pi pi-inbox"></i>
          <span>Productos</span>
        </div>
        <div class="flex flex-col items-center relative">
          <i class="pi pi-shopping-cart"></i>
          <span>Carrito</span>
          <span v-if="cartCount > 0" class="absolute top-0 right-0 bg-red-500 text-white rounded-full text-[10px] px-1">
            {{ cartCount }}
          </span>
        </div>
        <div class="flex flex-col items-center">
          <i class="pi pi-user"></i>
          <span>Perfil</span>
        </div>
      </div>
    </nav>
</template>