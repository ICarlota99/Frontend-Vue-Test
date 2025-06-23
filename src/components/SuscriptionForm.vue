<script setup lang="ts"></script>

<template>
  <form class="w-full flex flex-row gap-2">
    <input
      type="email"
      placeholder="Correo electrónico"
      class="flex-1 min-w-0 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 text-base bg-white"
    />
    <button
      type="submit"
      class="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-base font-medium whitespace-nowrap cursor-pointer"
    >
      Suscribirse
    </button>
  </form>
</template>