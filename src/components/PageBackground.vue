<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGrowingUp } from '~/utils/useGrowingUp';

const loading = ref(false);
const canvasRef = ref<HTMLCanvasElement | undefined>();

const deep = () => 50 + Math.random() * 100;
const minLevel = () => 4 + Math.random() * 2;

const generate = (tag: number) => {
  // 上下左右
  switch (tag) {
    case 0: {
      const start = {
        x: Math.random() * window.innerWidth,
        y: 0
      };
      return { start, startAngle: Math.PI / 2, deep: deep(), minLevel: minLevel() };
    }
    case 1: {
      const start = {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight
      };
      return { start, startAngle: -Math.PI / 2, deep: deep(), minLevel: minLevel() };
    }
    case 2: {
      const start = {
        x: 0,
        y: Math.random() * window.innerHeight
      };
      return { start, startAngle: 0, deep: deep(), minLevel: minLevel() };
    }
    case 3: {
      const start = {
        x: window.innerWidth,
        y: Math.random() * window.innerHeight
      };
      return { start, startAngle: Math.PI, deep: deep(), minLevel: minLevel() };
    }
    default:
  }
};

onMounted(async() => {
  loading.value = true;
  const canvas = canvasRef.value!;
  [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
  new Array(4).fill(0).forEach((_, idx) => useGrowingUp({ canvas: canvasRef.value!, ...generate(idx) }));
  loading.value = false;
});

</script>

<template>
  <canvas ref="canvasRef" class="fixed w-full h-full opacity-30 pointer-events-none -z-1" />
</template>
