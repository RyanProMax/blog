<script setup lang="ts">
import Joker from '~icon/joker.svg';
import Header from '~/components/Header.vue';
</script>

<template>
  <main class="flex flex-col items-center font-sans font-thin dark:text-gray-300">
    <Header />
    <Joker class="mt-30px w-80px h-80px fill-red-500" />
    <router-view />
  </main>
</template>
