<script setup lang="ts">
  defineProps<{
    name: string
    icon: string
  }>()
</script>

<template>
  <div class="flex flex-col items-center sm:text-sm md:text-sm font-medium">
    <i :class="`pi pi-${icon}`"></i>
    <!-- Hidden on lg screens -->
    <span class="lg:hidden ">{{ name }}</span>
  </div>
</template>
