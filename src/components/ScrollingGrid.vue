<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css';

import type { Category, Product, ProductDetail } from '@/types/product';
import { useCategoryStore } from '@/store/categoryStore';
import { useProductStore } from '@/store/productStore';

import ProductCard from './ProductCard.vue';
import RoundImage from './RoundImage.vue';
import AllProductsLink from '@/components/AllProductsLink.vue';
import RoundImageSkeleton from './skeletons/RoundImageSkeleton.vue';
import CardSkeleton from './skeletons/CardSkeleton.vue';

const categoryStore = useCategoryStore();
const productStore = useProductStore();

const props = defineProps<{
  isCategoryView: boolean;
  products?: Product[] | ProductDetail[];
  title: string;
}>();

// Keen Slider setup
const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
  slides: {
    perView: 'auto',   // Adjusts the number of slides visible at once
    spacing: 0,       // Space between slides
  },
  mode: 'free-snap',    // Enables free snapping mode
  rubberband: true,    // Allows elastic scrolling at the ends
});

const chunkedCategories = computed(() => {
  const result: Category[][] = [];
  for (let i = 0; i < categoryStore.categories.length; i += 2) {
    result.push(categoryStore.categories.slice(i, i + 2));
  }
  return result;
});

onMounted(() => {
  categoryStore.fetchCategories(); // Fetch categories on mount
});

onUnmounted(() => {
  slider.value?.destroy(); // Cleanup the slider instance when the component is unmounted
});
</script>
<template>
  <div class="lg:py-12 py-6">
    <!-- Categories -->
    <div v-if="props.isCategoryView">
      <div ref="sliderRef" class="keen-slider px-0 md:px-6 lg:px-6 xl:px-32 2xl:px-64 pb-2">
        <template v-if="categoryStore.categories.length">
          <!-- Display categories once loaded -->
          <div
            v-for="(group, index) in chunkedCategories"
            :key="index"
            class="flex gap-6 flex-col w-fit lg:pr-16 pr-2"
          >
            <div
              v-for="category in group"
              :key="category.id"
              class="lg:w-40 md:w-32 w-24  flex-shrink-0"
            >
              <RoundImage
                :src="category.image"
                :alt="category.name"
                :label="category.name"
                class="keen-slider__slide"
              />
            </div>
          </div>
        </template>

        <template v-else>
          <!-- Display skeletons while loading -->
          <div
            v-for="index in 9"
            :key="'cat-skeleton-group-' + index"
            class="flex gap-6 flex-col w-fit"
          >
            <div
              v-for="i in 2"
              :key="'cat-skeleton-' + index + '-' + i"
              class="w-40 flex-shrink-0"
            >
              <RoundImageSkeleton />
            </div>
          </div>
        </template>
      </div>
      <AllProductsLink />
    </div>

    <!-- Products -->
    <div v-else class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-800 py-6 text-center lg:text-left px-4 lg:px-6 xl:px-32 2xl:px-64">
        {{ title }}
      </h1>
      <div ref="sliderRef" class="keen-slider px-4 lg:px-6 xl:px-32 2xl:px-64 pb-2">
        <template v-if="productStore.products.length">
          <!-- Display products once loaded -->
          <div
            v-for="product in products"
            :key="product.id"
            class="w-60 flex-shrink-0 pr-4"
          >
            <ProductCard :product="product" class="keen-slider__slide" />
          </div>
        </template>

        <template v-else>
          <!-- Display skeletons while loading -->
          <div
            v-for="index in 6"
            :key="'product-skeleton-' + index"
            class="w-60 flex-shrink-0"
          >
            <CardSkeleton />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
