<script setup lang="ts">
import { ref } from 'vue';
import banner1 from "/banner1.png";
import banner2 from "/banner2.png";

const banners = [banner1, banner2];
const currentIndex = ref(0);

const prevBanner = () => {
  currentIndex.value = (currentIndex.value - 1 + banners.length) % banners.length;
};

const nextBanner = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.length;
};
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <!-- Container for banners -->
    <div class="flex w-full h-auto transition-transform duration-500">
      <!-- Banners as images -->
      <div 
        v-for="(banner, index) in banners"
        :key="index"
        class="w-full flex-shrink-0 transition-transform duration-500"
        :style="{
          transform: `translateX(${-100 * currentIndex}%)`
        }"
      >
        <img
          :src="banner"
          class="w-full h-full object-cover"
          alt="banner"
        />
      </div>
    </div>

    <!-- Navigation arrows -->
    <button
      @click="prevBanner"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
    >
      &lt;
    </button>
    <button
      @click="nextBanner"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
    >
      &gt;
    </button>
  </div>
</template>