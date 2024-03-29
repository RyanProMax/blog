<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Example } from '~/types';
import ExampleTitle from '~/components/ExampleTitle.vue';
import { Starport } from 'vue-starport';

const { list } = defineProps<{
  list: Example[]
}>();

const route = useRoute();
const id = computed(() => {
  return route.params?.id || '';
});

const router = useRouter();
const exampleComponent = computed(() => {
  console.log('id', id.value);
  return defineAsyncComponent({
    loader: () => import(`../../examples/${id.value}.vue`),
    onError: () => router.replace('/404')
  })
});

const label = computed(() => {
  const index = (<string>id.value).split('-').shift();
  const currIndex = list.findIndex(x => x.index === index);

  return {
    prev: currIndex > 0 ? list[currIndex - 1] : null,
    curr: list[currIndex],
    next: currIndex < list.length - 1 ? list[currIndex + 1] : null
  }
});
</script>

<template>
  <div class="w-full max-w-720px flex flex-col items-center">
    <div v-if="label.prev" class="w-full flex">
      <Starport :port="label.prev.index" class="w-full min-w-200px h-6">
        <ExampleTitle v-bind="label.prev" class="transition-all duration-800 text-gray-300 hover:text-gray-500 <sm:justify-center" />
      </Starport>
    </div>
    <div v-if="label.curr" class="w-full">
      <Starport :port="label.curr.index" class="w-full min-w-200px h-12 <sm:h-8">
        <ExampleTitle v-bind="label.curr"
          class="transition-all duration-800 text-red-500 text-3xl leading-12 <sm:(justify-center text-2xl leading-8)" />
      </Starport>
    </div>
    <div v-if="label.next" class="w-full flex">
      <Starport :port="label.next.index" class="w-full min-w-200px h-6">
        <ExampleTitle v-bind="label.next" class="transition-all duration-800 text-gray-300 hover:text-gray-500 <sm:justify-center" />
      </Starport>
    </div>

    <!-- divider -->
    <div class="my-8 w-full h-1px bg-gray-200" />

    <!-- component -->
    <component :is="exampleComponent" :key="id" v-bind="{ list }" />

    <!-- footer -->
    <footer class="w-full h-8" />
  </div>
</template>
