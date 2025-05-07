<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NavbarIcon from './NavbarIcon.vue';

const isOpen = ref(false)
const route = useRoute()

const links = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/products' },
  { name: 'Tiendas', path: '/stores' },
  { name: 'Categorías', path: '/categories' },
  { name: 'Vende con nosotros', path: '/sell' },
  { name: 'Contáctenos', path: '/contact' },
  { name: 'Preguntas Frecuentes', path: '/faq' }
]
</script>

<template>
    <div class="lg:justify-center">
      <!-- Toggle icon (visible only on sm and md) -->
      <div class="lg:hidden">
        <button @click="isOpen = !isOpen" aria-label="menu button">
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

    <!-- Collapsible menu on small and medium screens -->
    <div v-if="isOpen" class="lg:hidden px-6 pb-4">
      <ul class="flex flex-col gap-2">
        <!-- "Productos" and "Tiendas" visible in small/medium screens, hidden in large screens -->
        <li v-for="link in links.filter(link => link.name !== 'Productos' && link.name !== 'Tiendas')" :key="link.name">
          <RouterLink
            :to="link.path"
            class="block text-gray-700 hover:text-amber-600 font-medium-bold"
            :class="{ 'text-amber-800 font-bold': route.path === link.path }"
            @click="isOpen = false"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
</template>
