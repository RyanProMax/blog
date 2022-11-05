<script setup lang="ts">
import Joker from '~icon/joker.svg?component';

const { content } = defineProps<{
  content: string
}>();
</script>

<template>
  <p class="flex flex-col items-center text-red-500 italic text-xl <sm:text-sm">
    <Joker class="w-36 h-36 cursor-auto fill-red-900 <sm:(w-28 h-28)" />
    <span class="mt-8">Oh, no!</span>
    <span>{{ content }}</span>
  </p>
</template>
