<script setup lang="ts">
// Import Vue composition utilities and type definitions
import { onMounted, ref, computed } from 'vue';
import type { Category, Product, ProductDetail } from '@/types/product';
import { useCategoryStore} from '@/store/categoryStore';
import { useProductStore } from '@/store/productStore';

// Import components used in the template
import ProductCard from './ProductCard.vue';
import RoundImage from './RoundImage.vue';
import AllProductsLink from '@/components/AllProductsLink.vue';
import RoundImageSkeleton from './skeletons/RoundImageSkeleton.vue';
import CardSkeleton from './skeletons/CardSkeleton.vue';

const categoryStore = useCategoryStore();
const productStore = useProductStore();

// Define props passed to this component
const props = defineProps<{
  isCategoryView: boolean;
  products?: Product[] | ProductDetail[];
  title: string;
}>();

// Groups categories into subarrays of 2 elements (for row layout)
const chunkedCategories = computed(() => {
  const result: Category[][] = [];
  for (let i = 0; i < categoryStore.categories.length; i += 2) {
    result.push(categoryStore.categories.slice(i, i + 2));
  }
  return result;
});


// Reference to the horizontally scrollable container
const scrollRef = ref<HTMLElement | null>(null);

// Enables drag-to-scroll behavior for horizontal scrolling
const setupDragScroll = (el: HTMLElement) => {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Called on drag start
  const start = (e: MouseEvent | TouchEvent) => {
    isDown = true;
    startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    scrollLeft = el.scrollLeft;
    el.classList.add('cursor-grabbing');
  };

  // Called during drag
  const move = (e: MouseEvent | TouchEvent) => {
    if (!isDown) return;
    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const walk = x - startX;
    el.scrollLeft = scrollLeft - walk;
  };

  // Called when drag ends
  const stop = () => {
    isDown = false;
    el.classList.remove('cursor-grabbing');
  };

  // Attach event listeners for mouse and touch events
  el.addEventListener('mousedown', start);
  el.addEventListener('touchstart', start, { passive: true });
  el.addEventListener('mousemove', move);
  el.addEventListener('touchmove', move, { passive: true });
  el.addEventListener('mouseup', stop);
  el.addEventListener('mouseleave', stop);
  el.addEventListener('touchend', stop);
};

// Initialize the drag-to-scroll when the component mounts
onMounted(() => {
  if (scrollRef.value) setupDragScroll(scrollRef.value);
  categoryStore.fetchCategories();
});
</script>

<template>
  <div class="py-12">
    <!-- Categories -->
    <div v-if="isCategoryView">
      <div ref="scrollRef" class="overflow-x-auto pb-2 cursor-grab">
        <div class="flex flex-nowrap gap-0 lg:gap-24 w-max px-0 lg:px-6 xl:px-32 2xl:px-64">
          <template v-if="categoryStore.categories.length">
            <!-- Show categories once loaded -->
            <div v-for="(group, index) in chunkedCategories" :key="index">
              <div v-for="category in group" :key="category.id" class="w-25 flex-shrink-0">
                <RoundImage
                  :src="category.image"
                  :alt="category.name"
                  :label="category.name"
                />
              </div>
            </div>
          </template>

          <template v-else>
             <!-- Show skeletons if loading -->
             <div
              v-for="index in 6"
              :key="'cat-skeleton-group-' + index"
            >
              <div
                v-for="i in 2"
                :key="'cat-skeleton-' + index + '-' + i"
                class="w-25 flex-shrink-0"
              >
                <RoundImageSkeleton />
              </div>
            </div>
          </template>
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
          <!-- Products -->
          <template v-if="productStore.products.length">
            <div
              v-for="product in products"
              :key="product.id"
              class="w-90 flex-shrink-0"
            >
              <ProductCard :product="product" />
            </div>
          </template>

          <!-- Card Skeleton -->
          <template v-else>
            <div
              v-for="index in 6"
              :key="'product-skeleton-' + index"
              class="w-90 flex-shrink-0"
            >
              <CardSkeleton />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

  
