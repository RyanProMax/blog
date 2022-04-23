<script setup lang="ts">
import { StarportCarrier } from 'vue-starport';
import Header from '~/components/Header.vue';
</script>

<template>
  <main class="flex flex-col items-center font-sans font-thin dark:text-gray-300">
    <Header />
    <router-view />
    <StarportCarrier />
  </main>
</template>
