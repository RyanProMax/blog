<script setup lang="ts">
import type { Experiment } from '~/types';
import ExperimentTitle from '~/components/ExperimentTitle.vue';

const { list } = defineProps<{
  list: Readonly<Experiment[]>
}>();
</script>

<template>
  <div class="w-full max-w-720px px-12 py-8 grid grid-cols-3 <lg:grid-cols-2 <sm:grid-cols-1 gap-2">
    <ExperimentTitle v-for="item in list" :key="item.index" v-bind="item" />
  </div>
</template>
