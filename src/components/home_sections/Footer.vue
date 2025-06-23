<script setup lang="ts">
import Text from '../footer_components/Text.vue';
import Link from '../footer_components/Link.vue';
import SuscriptionForm from '../SuscriptionForm.vue';
import CreditCard from '../footer_components/CreditCard.vue';

import mastercard from '/credit-cards/mastercard.svg';
// import americane from '/credit-cards/americane.svg';
import visa from '/credit-cards/visa.svg';
// import discover from '/credit-cards/discover.svg';
import paypal from '/credit-cards/paypal.svg';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-800 text-gray-300 lg:py-2 px-4 lg:px-16">
    <!-- Main Footer Content -->
    <div class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Contact Section -->
        <div class="space-y-3">
            <p class="text-sm text-gray-500 m-0">¿Cómo podemos ayudarte?</p>
            <p class="font-bold text-lg m-0">Ponte en contacto con nosotros en cualquier momento</p>
        </div>

        <div class="space-y-3">
            <Text text="Whatsapp" />
            <Link link="tel:+34624606770" text="+(34) 624 60 67 70" />

            <Text text="Envíanos un mensaje" class="mt-4" />
            <Link link="mailto:contacto@tsotienda.com" text="contacto@tsotienda.com" />
        </div>

        <!-- Newsletter Section -->
        <div class="space-y-3">
            <Text text="Suscríbase a nuestro boletín" class="mt-4 mb-2" />
            <SuscriptionForm />
        </div>
        <div class="space-y-3">
            <Text text="Síganos" class="mt-4 mb-2" />
            <div class="flex space-x-2">
                <a href="#" aria-label="Facebook" class="hover:text-white p-1">
                    <i class="pi pi-facebook text-xl"></i>
                </a>
                <a href="#" aria-label="Community" class="hover:text-white p-1">
                    <i class="pi pi-users text-xl"></i>
                </a>
                <a href="#" aria-label="Instagram" class="hover:text-white p-1">
                    <i class="pi pi-instagram text-xl"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="flex justify-center my-6">
        <hr class="border-gray-700 w-[80%]">
    </div>

    <!-- Lower Section -->
    <div class="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Links Section -->
        <div class="space-y-3">
            <Text text="Enlaces de interés" />
            <Link link="#" text="Inicio" /> <br>
            <Link link="#" text="Términos de los servicios" /> <br>
            <Link link="#" text="Conviértete en vendedor" /> <br>
        </div>

        <!-- Legal Section -->
        <div class="space-y-3">
            <Text text="Legal" />
            <Link link="#" text="Política de envíos" /> <br>
            <Link link="#" text="Política de privacidad" /> <br>
            <Link link="#" text="Política de garantía y devoluciones" /> <br>
        </div>

        <!-- Payment Methods -->
        <div class="md:col-span-2 space-y-3 lg:mx-auto">
            <p class="font-bold text-lg">Pago seguro</p>
            <div class="flex flex-wrap gap-1 lg:gap-2">
                <CreditCard :image="mastercard" alt="Mastercard" />
                <CreditCard :image="visa" alt="Visa" />
                <CreditCard :image="visa" alt="American Express" />
                <CreditCard :image="visa" alt="Discover" />
                <CreditCard :image="paypal" alt="Paypal" />
            </div>
        </div>
    </div>
  </footer>
    <!-- Copyright -->
    <div class="bg-gray-900 p-4 mb-20 lg:mb-0">
        <p class="text-gray-500 text-center text-sm">
            Copyright © TSO {{ currentYear }} - Madrid
        </p>
    </div>
</template>