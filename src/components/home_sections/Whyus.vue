<script setup lang="ts">
    import FeatureItem from '@/components/Feature.vue' 
</script>

<template>
  <section class="bg-white py-24">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-yellow-600 font-semibold text-3xl">Más de 1500 productos en almacén</p>
        <h2 class="lg:text-8xl md:text-5xl sm:text-xl font-extrabold text-gray-900 m-4 pb-12">Envíos hacia toda Cuba</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-24">
        <FeatureItem
          icon="pi-truck"
          title="Entrega rápida"
          description="Nos aseguramos de que su entrega llegue en el menor tiempo posible. Nos distingue la rapidez y eficiencia."
        />
        <FeatureItem
          icon="pi-shopping-bag"
          title="Variedad de productos"
          description="Contamos con una amplia y completa variedad de productos para satisfacer todos sus gustos e intereses."
        />
        <FeatureItem
          icon="pi-check-circle"
          title="Envíos a toda Cuba"
          description="Contamos con servicios de entrega a lo largo y ancho de la isla. Nuestro interés es que tu gente reciba las compras."
        />
      </div>
    </div>
  </section>
</template>
