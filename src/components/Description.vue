<script setup lang="ts">
const { content = [], tips = [] } = defineProps<{
  content?: string[]
  tips?: string[]
}>();
</script>

<template>
  <div class="w-full flex flex-col <sm:items-center">
    <p v-for="(item, idx) in content" :key="idx" class="not-first:mt-2">
      {{ item }}
    </p>
    <div v-if="tips.length" class="mt-4">
      <p v-for="(item, idx) in tips" :key="idx" class="text-sm not-first:mt-1 text-gray-400 italic">
        * {{ item }}
      </p>
    </div>
  </div>
</template>
