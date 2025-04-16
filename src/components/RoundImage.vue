<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  label: string;
}>();
</script>

<template>
  <div class="w-32 md:w-36 lg:w-40 flex flex-col items-center gap-2 p-2">
    <!-- Rounded image-->
    <div class="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
      <img
        :src="src"
        :alt="alt"
        class="rounded-full object-cover w-full h-full border border-gray-600"
      />
    </div>
    
    <!-- Label -->
    <span class="text-xs font-semibold text-center mt-1 uppercase pt-1 line-clamp-2">
      {{ label.slice(0, 15) + '…'}}
    </span>
  </div>
</template>
