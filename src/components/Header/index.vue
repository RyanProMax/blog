<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import Sun from '~icon/sun.svg';
import Moon from '~icon/moon.svg';
import Github from '~icon/github.svg';

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
  <div class="inline-flex">
    <Sun v-if="!isDark" class="icon icon-red" @click="toggleDark()" />
    <Moon v-else class="icon icon-red" @click="toggleDark()" />
    <a href="https://github.com/RyanProMax/vue-vite-starter" target="__blank">
      <Github class="icon icon-red" w:m="l-4" />
    </a>
  </div>
</template>
