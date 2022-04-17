<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { params: { name } } = useRoute();
const router = useRouter();
const experimentComponent = defineAsyncComponent({
  loader: () => import(`../../experiments/${name}.vue`),
  onError: () => router.replace('/404')
});

</script>

<template>
  <component :is="experimentComponent" />
</template>
