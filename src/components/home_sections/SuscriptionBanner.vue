<script setup lang="ts">
  import SuscriptionForm from '../SuscriptionForm.vue'
</script>
<template>
  <!-- Suscription email form  -->
    <section class="bg-gradient-to-r from-gray-200 via-white to-amber-200 py-20 flex justify-center items-center">
      <div class="bg-white p-8 rounded shadow-md text-center max-w-3xl w-full">
        <h2 class="text-4xl font-bold text-amber-600 mb-2">Suscríbete a nuestro boletín</h2>
        <p class="text-gray-600 mb-6 text-xl">
          Mantente al tanto de todas las novedades, ofertas y descuentos. ¡Suscríbete!
        </p>
        <SuscriptionForm />
      </div>
    </section>
  </template>