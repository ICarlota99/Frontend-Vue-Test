<script setup lang="ts"></script>
<template>
    <!-- Skeleton Loading State -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-row md:flex-col gap-4 h-full relative">
      <!-- Skeleton for Product Image -->
      <div class="w-full aspect-square mb-3 relative bg-gray-200 rounded-lg animate-pulse"></div>

      <!-- Skeleton for Product Content -->
      <div class="flex flex-col flex-1">
        <div class="h-4 bg-gray-200 rounded-full animate-pulse mb-2 w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded-full animate-pulse mb-4 w-1/2"></div>

        <!-- Price Skeleton -->
        <div class="flex items-center gap-2 mt-1">
          <div class="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
          <div class="h-4 bg-gray-200 rounded-full animate-pulse w-12"></div>
          <div class="ml-auto h-5 bg-gray-200 rounded-full animate-pulse w-20"></div>
        </div>

        <!-- Quantity Selector + Add to Cart Skeleton -->
        <div class="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100">
          <div class="flex items-center border rounded-md text-sm w-24 h-8 bg-gray-200 animate-pulse"></div>
          <div class="flex-1 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
</template>