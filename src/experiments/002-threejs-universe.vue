<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { throttle } from 'lodash-es';
import { useResizeObserver } from '@vueuse/core';
import Description from '~/components/Description.vue';
import { initialUniverse } from '~/utils/useThreeJS';

const container = ref<HTMLElement | undefined>();
const loading = ref(false);
const controller = ref();

// resize
const handleResize = throttle((entries) => {
  if (controller.value) {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    const { camera, renderer } = controller.value;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
}, 500);

onMounted(async() => {
  loading.value = true;
  controller.value = await initialUniverse(container);
  useResizeObserver(container.value, handleResize);
  loading.value = false;
});
</script>

<template>
  <div class="w-full">
    <Description class="mb-10" :content="['基于 Three.js 渲染的小宇宙⭐']" />
    <div class="w-full px-4">
      <div ref="container" v-loading="loading" class="box-border border border-gray-300 w-full max-w-720px  h-480px" />
    </div>
  </div>
</template>
