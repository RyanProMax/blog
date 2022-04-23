<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Experiment } from '~/types';
import ExperimentTitle from '~/components/ExperimentTitle.vue';
import { Starport } from 'vue-starport';

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
      <Starport v-if="label.prev" :port="label.prev.index" class="min-w-200px h-6 absolute -left-30">
        <ExperimentTitle v-bind="label.prev" onlyIndex
          class=" text-gray-300 hover:text-gray-500 justify-center" />
      </Starport>
      <Starport :port="label.curr.index" class="min-w-200px h-6">
        <ExperimentTitle v-bind="label.curr" class="text-red-500 justify-center" />
      </Starport>
      <Starport v-if="label.next"  :port="label.next.index" class="min-w-200px h-6 absolute -right-30 ">
        <ExperimentTitle v-bind="label.next" onlyIndex
          class="text-gray-300 hover:text-gray-500 justify-center" />
      </Starport>
    </div>
    <component :is="experimentComponent" :key="id" v-bind="{ list }" class="mt-8" />
  </div>
</template>
