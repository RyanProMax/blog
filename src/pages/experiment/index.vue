<script setup lang="ts">
import { Starport } from 'vue-starport';
import ExperimentTitle from '~/components/ExperimentTitle.vue';
import type { Experiment } from '~/types';

const { list } = defineProps<{
  list: Readonly<Experiment[]>
}>();
</script>

<template>
  <div class="w-full max-w-720px px-12 py-8 grid grid-cols-3 <lg:grid-cols-2 <sm:grid-cols-1 gap-2">
    <template v-for="item in list" :key="item.index">
      <Starport :port="item.index" class="h-6">
        <ExperimentTitle v-bind="item" />
      </Starport>
    </template>
  </div>
</template>
