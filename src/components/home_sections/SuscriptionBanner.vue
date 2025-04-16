<script setup lang="ts"></script>
<template>
  <!-- Suscription email form  -->
    <section class="bg-gradient-to-r from-gray-200 via-white to-amber-200 py-20 flex justify-center items-center">
      <div class="bg-white p-8 rounded shadow-md text-center max-w-3xl w-full">
        <h2 class="text-4xl font-bold text-amber-600 mb-2">Suscríbete a nuestro boletín</h2>
        <p class="text-gray-600 mb-6 text-xl">
          Mantente al tanto de todas las novedades, ofertas y descuentos. ¡Suscríbete!
        </p>
        <form class="flex flex-col sm:flex-row items-center gap-4 pt-8">
          <input
            type="email"
            placeholder="Correo electrónico"
            class="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300 text-lg"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition text-lg"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  </template>