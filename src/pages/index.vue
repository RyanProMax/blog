<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');

const handleNavigate = () => name.value.trim() && router.push(`/hi/${name.value}`);
</script>

<template>
  <p w:m="t-25px" w:text="xl">
    Vue Vite Starter
  </p>
  <p w:m="t-10px" w:text="sm gray-400 center" w:font="italic">
    A Vue 3.x + Vite 2.x + TypeScript + WindiCSS template starter 🚀
  </p>
  <p w:m="t-10px" w:text="sm gray-400 center" w:font="italic">
    一个极简的快速启动模板 💪
  </p>

  <input v-model="name" placeholder="Please input your name" w:w="250px" w:m="t-20px" class="input" @keyup.enter="handleNavigate()">

  <button w:m="t-20px" class="btn btn-red" @click="handleNavigate()">
    Jump
  </button>
</template>
