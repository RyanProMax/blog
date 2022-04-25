<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Description from '~/components/Description.vue';
import { useGrowingUp } from '~/utils/useGrowingUp';

const loading = ref(false);
const canvasRef = ref<HTMLCanvasElement | undefined>();

onMounted(async() => {
  loading.value = true;
  useGrowingUp({ canvas: canvasRef.value! });
  loading.value = false;
});

</script>

<template>
  <div class="w-full flex flex-col items-start">
    <Description class="mb-10" :content="['生长🍃']" />
    <canvas ref="canvasRef" :width="300" :height="300" class="border border-solid border-gray-300 self-center" />
  </div>
</template>
