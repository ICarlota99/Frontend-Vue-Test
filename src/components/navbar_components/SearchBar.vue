<script setup lang="ts">
</script>
<template>
    <!-- Search bar -->
    <div class="flex-1 lg:max-w-2xl lg:order-2 lg:mx-auto lg:px-2">
        <div class="flex items-center gap-2 w-full">
            <input
            type="text"
            placeholder="Busca chuleta de cerdo"
            class="flex-1 px-4 py-2 border border-gray-300 rounded shadow-xs"
            />
            <button class="text-amber-950 bg-amber-200 hover:bg-amber-300 px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap">
                <i class="pi pi-search"></i>
                <span class="hidden lg:block">Buscar</span>
            </button>
        </div>
    </div>
</template>