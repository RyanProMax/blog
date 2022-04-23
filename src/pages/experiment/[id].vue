<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { params: { id }, path } = useRoute();
const router = useRouter();
const experimentComponent = defineAsyncComponent({
  loader: () => import(`../../experiments/${id}.vue`),
  onError: () => router.replace('/404')
});

</script>

<template>
  <component :is="experimentComponent" :key="path" />
</template>
