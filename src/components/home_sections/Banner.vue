<script setup lang="ts">
    import banner from "/banner_middle.png";
</script>

<template>
      <div class="relative w-full overflow-hidden">
        <div class="flex w-full h-auto transition-transform duration-500">
            <!-- Banner -->
                <img
                :src="banner"
                class="w-full h-full object-cover"
                alt="banner"
                />
        </div>
      </div>
</template>