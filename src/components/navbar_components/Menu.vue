<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import NavbarIcon from './NavbarIcon.vue';

const isOpen = ref(false);
const route = useRoute();

// Close menu when route changes
watchEffect(() => {
  route.path;
  isOpen.value = false;
});

const links = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Tiendas', path: '/stores' },
  { name: 'Categorías', path: '/categories' },
  { name: 'Vende con nosotros', path: '/sell' },
  { name: 'Contáctenos', path: '/contact' },
  { name: 'Preguntas Frecuentes', path: '/faq' }
];

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.menu-container') && !target.closest('[aria-label="menu button"]')) {
    isOpen.value = false;
  }
};

// Add and remove event listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="lg:justify-center">
    <!-- Toggle icon (visible only on sm and md) -->
    <div class="lg:hidden">
      <button 
        @click="isOpen = !isOpen" 
        aria-label="menu button"
        :aria-expanded="isOpen"
      >
        <NavbarIcon icon="bars" name="Menú" />
      </button>
    </div>

    <!-- Links for large screens -->
    <ul class="hidden lg:flex gap-8 text-center">
      <li v-for="link in links" :key="link.name">
        <RouterLink
          :to="link.path"
          class="text-gray-700 hover:text-amber-600 font-medium-bold"
          :class="{ 'text-amber-800 font-bold border-b-2 border-amber-800': route.path === link.path }"
        >
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>
  </div>

  <!-- Off-canvas menu overlay -->
  <div 
    v-if="isOpen"
    class="fixed inset-0 bg-white/20 backdrop-blur-sm backdrop-brightness-75 z-40 lg:hidden"
    @click="isOpen = false"
  ></div>

  <!-- Off-canvas menu -->
  <div 
    class="menu-container fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform -translate-x-full transition-transform duration-300 ease-in-out lg:hidden"
    :class="{ 'translate-x-0': isOpen }"
  >
    <div class="p-4 h-full flex flex-col">
      <!-- Close button -->
      <button 
        @click="isOpen = false"
        class="self-end p-2"
        aria-label="Close menu"
      >
        <NavbarIcon icon="times" name="" />
      </button>

      <!-- Menu content -->
      <ul class="flex flex-col gap-4 mt-4 overflow-y-auto">
        <li v-for="link in links.filter(link => link.name !== 'Productos' && link.name !== 'Tiendas')" :key="link.name">
          <RouterLink
            :to="link.path"
            class="block py-2 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded font-medium-bold"
            :class="{ 'text-amber-800 font-bold bg-amber-50': route.path === link.path }"
            @click="isOpen = false"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>