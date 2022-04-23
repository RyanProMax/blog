<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Experiment } from '~/types';
import ExperimentTitle from '~/components/ExperimentTitle.vue';

const { list } = defineProps<{
  list: Experiment[]
}>();

const route = useRoute();
const id = computed(() => {
  return route.params?.id || '';
});

const router = useRouter();
const experimentComponent = computed(() => {
  console.log('id', id.value)
  return defineAsyncComponent({
    loader: () => import(`../../experiments/${id.value}.vue`),
    onError: () => router.replace('/404')
  })
});

const label = computed(() => {
  const index = (<string>id.value).split('-').shift();
  const currIndex = list.findIndex((x) => x.index === index);

  return {
    prev: currIndex > 0 ? list[currIndex - 1] : null,
    curr: list[currIndex],
    next: currIndex < list.length - 1 ? list[currIndex + 1] : null
  }
});
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex relative items-center">
      <ExperimentTitle v-if="label.prev" v-bind="label.prev" onlyIndex
        class="absolute -left-20 text-gray-300 hover:text-gray-500" />
      <ExperimentTitle v-bind="label.curr" class="text-red-500" />
      <ExperimentTitle v-if="label.next" v-bind="label.next" onlyIndex
        class="absolute -right-20 text-gray-300 hover:text-gray-500" />
    </div>
    <component :is="experimentComponent" :key="id" v-bind="{ list }" class="mt-8" />
  </div>
</template>
