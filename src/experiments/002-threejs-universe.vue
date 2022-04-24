<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import Description from '~/components/Description.vue';
import { initialUniverse } from '~/utils/useThreeJS';

const container = ref<HTMLElement | undefined>();
const loading = ref(false);
const controller = ref();

// resize
const handleResize = () => {
  if (container.value && controller.value) {
    const { clientWidth, clientHeight } = container.value;
    const { camera, renderer } = controller.value;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }
};

onMounted(async() => {
  controller.value = await initialUniverse(container);
  window.addEventListener('resize', handleResize);
});

onBeforeMount(() => {
  window.removeEventListener('resize', handleResize);
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
