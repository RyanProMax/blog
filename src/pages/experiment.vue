<script setup lang="ts">
import { capitalize } from 'lodash-es';

const files = import.meta.globEager('../experiments/*.vue');
const list = Object.keys(files).map((path) => {
  const fileName = path.split('\/').pop()!.replace('.vue', '');
  const fileNameArr = fileName.split('-');
  return {
    index: fileNameArr[0],
    label: fileNameArr.slice(1).map(capitalize).join(' '),
    fileName
  };
});
</script>

<template>
  <router-view v-bind="{ list }" />
</template>
