<script setup lang="ts">
import { defineProps, onMounted, ref, computed } from 'vue';
import type { Category, Product } from '@/types/product';
import ProductCard from './ProductCard.vue';
import RoundImage from './RoundImage.vue';
import AllProductsLink from '@/components/AllProductsLink.vue';

const props = defineProps<{
  isCategoryView: boolean;
  categories: Category[];
  products: Product[];
  title: string;
}>();

const chunkedCategories = computed(() => {
  const result: Category[][] = [];
  for (let i = 0; i < props.categories.length; i += 2) {
    result.push(props.categories.slice(i, i + 2));
  }
  return result;
});

const scrollRef = ref<HTMLElement | null>(null);

const setupDragScroll = (el: HTMLElement) => {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const start = (e: MouseEvent | TouchEvent) => {
    isDown = true;
    startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    scrollLeft = el.scrollLeft;
    el.classList.add('cursor-grabbing');
  };

  const move = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;
    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const walk = x - startX;
    el.scrollLeft = scrollLeft - walk;
  };

  const stop = () => {
    isDown = false;
    el.classList.remove('cursor-grabbing');
  };

  el.addEventListener('mousedown', start);
  el.addEventListener('touchstart', start, { passive: true });
  el.addEventListener('mousemove', move);
  el.addEventListener('touchmove', move, { passive: true });
  el.addEventListener('mouseup', stop);
  el.addEventListener('mouseleave', stop);
  el.addEventListener('touchend', stop);
};

onMounted(() => {
  if (scrollRef.value) setupDragScroll(scrollRef.value);
});
</script>

<template>
    <div class="py-12">
      <!-- Categories -->
      <div v-if="isCategoryView">
        <div ref="scrollRef" class="overflow-x-auto pb-2 cursor-grab">
          <div class="flex flex-nowrap gap-4 w-max px-4 lg:px-6 lg:gap-24 sm:gap-2 xl:px-32 2xl:px-64">
            <div
              v-for="(group, index) in chunkedCategories"
              :key="index"
            >
              <div
                v-for="category in group"
                :key="category.id"
                class="w-56 flex-shrink-0"
              >
                <RoundImage
                  :src="category.image"
                  :alt="category.name"
                  :label="category.name"
                />
              </div>
            </div>
          </div>
        </div>
        <AllProductsLink />
      </div>
  
      <!-- Products -->
      <div v-else class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-800 py-6 text-center lg:text-left px-4 lg:px-6 xl:px-32 2xl:px-64">
          {{ title }}
        </h1>
        <div ref="scrollRef" class="overflow-x-auto pb-2 cursor-grab">
          <div class="flex flex-nowrap gap-4 w-max px-4 lg:px-6 xl:px-32 2xl:px-64">
            <div
              v-for="product in products"
              :key="product.id"
              class="w-90 flex-shrink-0"
            >
              <ProductCard :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
