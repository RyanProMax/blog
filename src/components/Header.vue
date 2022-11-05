<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { computed } from 'vue';
import Joker from '~icon/joker.svg';
import Sun from '~icon/sun.svg';
import Moon from '~icon/moon.svg';
import Github from '~icon/github.svg';
import ExampleIcon from '~icon/example.svg';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const navList = computed(() => ([
  {
    name: 'Examples',
    icon: ExampleIcon,
    showText: true,
    path: '/examples',
    external: false
  },
  {
    name: 'Github',
    icon: Github,
    showText: false,
    path: 'https://github.com/RyanProMax/',
    external: true
  },
  {
    name: 'Toggle Color Scheme',
    icon: isDark.value ? Moon : Sun,
    showText: false,
    external: false,
    clickEvent: toggleDark
  }
]));
</script>

<template>
  <div class="w-full p-8 flex flex-row justify-between items-center">
    <router-link to="/" class="inline-flex" active-class="svg:fill-red-500 dark:svg:fill-red-500">
      <Joker class="icon icon-red" />
    </router-link>
    <div class="flex flex-row items-center text-gray-400">
      <template v-for="item in navList" :key="item.name">
        <router-link
          v-if="!item.external && !item.clickEvent" :to="item.path" :title="item.name"
          class="inline-flex not-last:mr-4" active-class="text-red-500 svg:fill-red-500 dark:svg:fill-red-500"
        >
          <span class="hidden md:inline-block text-hover text-hover-red">{{ item.name }}</span>
          <component :is="item.icon" class="icon icon-red md:hidden" />
        </router-link>
        <a v-else-if="item.clickEvent" :title="item.name" class="inline-flex not-last:mr-4" @click="item.clickEvent()">
          <component :is="item.icon" class="icon icon-red" />
        </a>
        <a v-else :href="item.path" target="__blank" :title="item.name" class="inline-flex not-last:mr-4">
          <component :is="item.icon" class="icon icon-red" />
        </a>
      </template>
    </div>
  </div>
</template>
