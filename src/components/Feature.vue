<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>();
</script>

<template>
  <div class="flex flex-col items-center text-center px-4">
    <div class="bg-yellow-100 rounded-full w-24 h-24 flex items-center justify-center mb-4">
      <i :class="`pi ${icon} text-amber-700 text-5xl`" />
    </div>
    <h3 class="font-bold text-3xl mb-1 py-2">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>
