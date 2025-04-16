<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  label: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-2 p-2">
    <!-- Responsive sizes with valid Tailwind width/height -->
    <div class="w-20 h-20 lg:w-60 lg:h-60 md:w-40 md:h-40">
      <img
        :src="src"
        :alt="alt"
        class="rounded-full object-cover w-full h-full border border-gray-600"
      />
    </div>
    <span class="text-xs font-semibold text-center mt-1 uppercase pt-1">{{ label }}</span>
  </div>
</template>
