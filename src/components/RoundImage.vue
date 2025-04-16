<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  label: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-2">
    <!-- Responsive sizes with valid Tailwind width/height -->
    <div class="w-[120px] h-[120px] lg:w-60 lg:h-60 md:w-40 md:h-40 sm:w-2 sm:h-2">
      <img
        :src="src"
        :alt="alt"
        class="rounded-full object-cover w-full h-full border border-gray-600"
      />
    </div>
    <span class="text-sm font-semibold text-center mt-1 uppercase pt-1">{{ label }}</span>
  </div>
</template>
