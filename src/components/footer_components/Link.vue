<script setup lang="ts">
    defineProps<{
        text: string
        link: string
    }>()
</script>

<template>
    <a href="{{ link }}" class="text-gray-300 text-xs hover:underline m-0">{{ text }}</a>
</template>