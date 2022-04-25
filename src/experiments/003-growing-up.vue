<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Description from '~/components/Description.vue';
import { useGrowingUp } from '~/utils/useGrowingUp';

const loading = ref(false);
const canvasRef = ref<HTMLCanvasElement | undefined>();

onMounted(async() => {
  loading.value = true;
  const ctx = canvasRef.value!.getContext('2d')!;
  ctx.scale(2, 2);
  useGrowingUp({ canvas: canvasRef.value! });
  loading.value = false;
});

</script>

<template>
  <div class="w-full flex flex-col items-start">
    <Description class="mb-10" :content="['生长🍃']" />
    <canvas
      ref="canvasRef" :width="600" :height="600"
      class="w-300px h-300px border border-solid border-gray-300 self-center"
    />
  </div>
</template>
