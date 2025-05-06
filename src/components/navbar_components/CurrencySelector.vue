<script setup lang="ts">
    import { ref } from "vue";

    const selectedCurrency = ref('USD');
</script>

<template>
    <!-- Currency selector -->
    <div>
        <select v-model="selectedCurrency" class="bg-transparent border rounded px-2 py-1">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
        </select>
    </div>
</template>