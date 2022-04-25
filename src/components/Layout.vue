<script setup lang="ts">
import { StarportCarrier } from 'vue-starport';
import PageBackground from './PageBackground.vue';
import Header from '~/components/Header.vue';
</script>

<template>
  <main class="flex flex-col items-center font-sans font-thin dark:text-gray-300">
    <Header />
    <router-view />
    <PageBackground />
    <StarportCarrier />
  </main>
</template>
