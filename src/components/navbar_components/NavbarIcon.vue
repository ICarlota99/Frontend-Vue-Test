<script setup lang="ts">
defineProps<{
  name: string
  icon: string
}>()
</script>

<template>
  <div class="flex flex-col items-center">
    <i :class="`pi pi-${icon}`"></i>
    <!-- Hidden on lg screens -->
    <span class="lg:hidden">{{ name }}</span>
  </div>
</template>
