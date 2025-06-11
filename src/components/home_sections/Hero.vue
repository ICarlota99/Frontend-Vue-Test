<script setup lang="ts">
import { computed, ref } from 'vue';
import { useKeenSlider } from 'keen-slider/vue';
import 'keen-slider/keen-slider.min.css';

import banner1 from "/banner1.png";
import banner2 from "/banner2.png";

const banners = [banner1, banner2];
const current = ref(0);
const [container, slider] = useKeenSlider({
  initial: current.value,
  slideChanged: (s) => {
    current.value = s.track.details.rel;
  },
});

const dotHelper = computed(() => 
  slider.value ? [...Array(slider.value.track.details.slides.length).keys()] : []
);
</script>

<template>
  <div class="navigation-wrapper">
    <!-- Slider Container -->
    <div ref="container" class="keen-slider">
      <!-- Slides -->
      <div 
        v-for="(banner, index) in banners"
        :key="index"
        class="keen-slider__slide"
      >
        <img :src="banner" alt="banner" />
      </div>
    </div>

    <!-- Navigation Arrows -->
    <svg
      v-if="slider"
      @click="slider.prev()"
      :class="{
        'arrow': true,
        'arrow--left': true,
        'arrow--disabled': current === 0,
      }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
    </svg>
    
    <svg
      v-if="slider"
      @click="slider.next()"
      :class="{
        'arrow': true,
        'arrow--right': true,
        'arrow--disabled': current === slider.track.details.slides.length - 1,
      }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
    </svg>

    <!-- Dots Navigation -->
    <div v-if="slider" class="dots">
      <button
        v-for="(_, idx) in dotHelper"
        @click="slider.moveToIdx(idx)"
        :class="{ 'dot': true, 'active': current === idx }"
        :key="idx"
      ></button>
    </div>
  </div>
</template>

<style>
  .navigation-wrapper {
    position: relative;
  }
  .dots {
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }
  .dot {
    border: none;
    width: 10px;
    height: 10px;
    background: #c5c5c5;
    border-radius: 50%;
    margin: 0 5px;
    padding: 5px;
    cursor: pointer;
  }
  .dot:focus {
    outline: none;
  }
  .dot.active {
    background: #000;
  }
  .arrow {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    fill: #fff;
    cursor: pointer;
  }
  .arrow--left {
    left: 5px;
  }
  .arrow--right {
    left: auto;
    right: 5px;
  }
  .arrow--disabled {
    fill: rgba(255, 255, 255, 0.5);
  }
</style>