<script setup lang="ts">
defineProps<{
  image: string
  alt: string
}>()
</script>

<template>
  <div class="inline-flex bg-gray-200 rounded-lg w-12 lg:w-18 cursor-pointer">
    <img 
      :src="image" 
      :alt="alt" 
      class="object-contain" 
    />
  </div>
</template>