<script setup lang="ts"></script>
<template>
    <div class="space-y-4 animate-pulse px-64">
        <!-- Skeleton Loader -->
        <div class="flex space-x-6 animate-pulse flex-col lg:flex-row gap-6 p-6 lg:px-12 xl:px-20 2xl:px-24 max-w-6xl mx-auto">
            <!-- Skeleton for Product Image -->
            <div class="w-full object-contain bg-gray-300 rounded-lg"></div>

            <!-- Skeleton for Product Content (name, price, quantity) -->
            <div class="flex-1 space-y-4">
                <!-- Skeleton for Product Name -->
                <div class="w-2/5 h-4 bg-gray-300 rounded-md"></div>
                <div class="flex-1 bg-gray-300 h-15 w-3/4 rounded-md"></div>

                <!-- Skeleton for Prices -->
                <div class="w-1/3 h-5 bg-gray-300 rounded-md"></div>
                <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>
                <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>

                <!-- Skeleton for Quantity Selector -->
                <div class="flex items-center gap-2 mt-4 pt-2 border-t border-gray-100">
                <div class="w-1/10 h-3 bg-gray-300 rounded-md"></div>
                <div class="flex items-center border rounded-md overflow-hidden text-sm">
                    <div class="w-6 h-8 bg-gray-300"></div>
                    <div class="w-10 h-8 bg-gray-300 mx-2"></div>
                    <div class="w-6 h-8 bg-gray-300"></div>
                </div>
                </div>
                <!-- Skeleton for buttons -->
                <div class="flex gap-2 mt-4 animate-pulse">
                <div class="bg-gray-200 h-8 w-32 rounded"></div>
                <div class="bg-gray-200 h-8 w-32 rounded"></div>
                </div>
                <!-- Text  -->
                <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>
                <div class="w-1/3 h-3 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    </div>
</template>

