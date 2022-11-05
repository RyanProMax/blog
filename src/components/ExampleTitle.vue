<script setup lang="ts">
import { useRouter } from 'vue-router';

const { index, label, onlyIndex } = defineProps<{
  index: string
  label: string
  fileName: string
  onlyIndex?: boolean
}>();

const router = useRouter();
const handleJump = (fileName: string) => {
  router.push(`/examples/${fileName}`);
};
</script>

<template>
  <p class="flex cursor-pointer text-gray-400 hover:text-red-500 transition duration-800" @click="handleJump(fileName)">
    <span class="font-mono">{{ index }}</span>
    <span v-show="!onlyIndex" class="ml-2 text-oh-ellipsis">{{ label }}</span>
  </p>
</template>
