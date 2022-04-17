<script setup lang="ts">
import { useRouter } from 'vue-router';
import { capitalize } from 'lodash-es';

const router = useRouter();

const files = import.meta.globEager('../../experiments/*.vue');
const list = Object.keys(files).map((path) => {
  const fileName = path.split('\/').pop()!.replace('.vue', '');
  const fileNameArr = fileName.split('.');
  return {
    index: fileNameArr[0],
    label: fileNameArr.slice(1).map(capitalize).join(' '),
    fileName
  };
});

const handleJump = (fileName: string) => {
  router.push(`/experiment/${fileName}`);
};
</script>

<template>
  <div class="w-full max-w-720px px-12 py-8 grid grid-cols-3 <lg:grid-cols-2 <sm:grid-cols-1 gap-2">
    <p v-for="({ index, label, fileName }) in list" :key="index" class="flex cursor-pointer text-gray-400 hover:text-red-500 transition duration-250" @click="handleJump(fileName)">
      <span class="mr-2 font-mono">{{ index }}</span>
      <span class="text-oh-ellipsis">{{ label }}</span>
    </p>
  </div>
</template>
