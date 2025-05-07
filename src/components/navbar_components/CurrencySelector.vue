<script setup lang="ts">
    import { ref } from "vue";

    const selectedCurrency = ref('USD');
</script>

<template>
    <!-- Currency selector -->
    <div>
        <select v-model="selectedCurrency" class="bg-gray-100 rounded p-2" aria-label="currency selector">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
        </select>
    </div>
</template>