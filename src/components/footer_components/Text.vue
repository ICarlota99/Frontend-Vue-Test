<script setup lang="ts">
    defineProps<{
        text: string
    }>()
</script>

<template>
    <p class="text-gray-300 font-bold text-sm m-0">{{ text }}</p>
</template>