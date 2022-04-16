<script setup lang="ts">
import Joker from '~icon/joker.svg';
import Header from '~/components/Header/index.vue';
</script>

<template>
  <main w:p="x-20px y-30px" w:flex="~ col" w:align="items-center" w:font="sans thin" w:text="dark:gray-300">
    <Header />
    <Joker w:m="t-30px" w:w="80px" w:h="80px" w:fill="red-500" />
    <router-view />
  </main>
</template>
