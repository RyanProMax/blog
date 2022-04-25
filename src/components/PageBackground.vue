<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useGrowingUp } from '~/utils/useGrowingUp';

const canvasRef = ref<HTMLCanvasElement | undefined>();
const ctxRef = computed(() => canvasRef.value!.getContext('2d'));

const depth = () => 100 + Math.random() * 60;
const minLevel = () => 5;

const generate = (tag: number) => {
  // 上下左右
  switch (tag) {
    case 0: {
      const start = {
        x: Math.random() * window.innerWidth,
        y: 0
      };
      return { start, startAngle: Math.PI / 2, depth: depth(), minLevel: minLevel() };
    }
    case 1: {
      const start = {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight
      };
      return { start, startAngle: -Math.PI / 2, depth: depth(), minLevel: minLevel() };
    }
    case 2: {
      const start = {
        x: 0,
        y: Math.random() * window.innerHeight
      };
      return { start, startAngle: 0, depth: depth(), minLevel: minLevel() };
    }
    case 3: {
      const start = {
        x: window.innerWidth,
        y: Math.random() * window.innerHeight
      };
      return { start, startAngle: Math.PI, depth: depth(), minLevel: minLevel() };
    }
  }
};

const route = useRoute();

onUpdated(() => {
  const canvas = canvasRef.value!;
  [canvas.width, canvas.height] = [window.innerWidth * 2, window.innerHeight * 2];
  ctxRef.value!.scale(2, 2);
  new Array(4).fill(0).forEach((_, idx) => useGrowingUp({ canvas: canvasRef.value!, ctx: ctxRef.value!, ...generate(idx) }));
});

</script>

<template>
  <canvas ref="canvasRef" :key="route.path" class="fixed w-full h-full opacity-30 pointer-events-none -z-1" />
</template>
