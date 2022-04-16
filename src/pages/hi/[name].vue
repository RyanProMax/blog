<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { name } = route.params;
</script>

<template>
  <p w:m="t-25px" w:text="xl center">
    Welcome
  </p>
  <p w:m="t-10px" w:text="gray-400 center">
    {{ name }}
  </p>

  <button w:m="t-20px" class="btn btn-red" @click="router.back()">
    back
  </button>
</template>
