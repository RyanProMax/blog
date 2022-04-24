<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus/es';
import Description from '~/components/Description.vue';
import { useKmeans, vectorsToBase64 } from '~/utils/useKmeans';
import photo from '~/assets/images/01.png';

const imageUrl = ref(photo);
const previewUrl = ref('');
const bgColor = ref<string | null>(null);
const loading = ref(false);
const store = ref<{
  width: number
  height: number
  kmeansResult: any
  vectors: number[][]
  targetIndex: number[]
} | null>(null);

const handleChange = (file: UploadFile) => {
  imageUrl.value = window.URL.createObjectURL(file.raw!);
  previewUrl.value = '';
};

watch(imageUrl, async(url) => {
  loading.value = true;
  const result = await useKmeans(url);
  const targetCentroidIndex = result.kmeansResult.clusters[0];
  const target = result.kmeansResult.centroids[targetCentroidIndex];
  const [r, g, b, a] = target.centroid;
  bgColor.value = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
  const targetIndex = ((result.kmeansResult.clusters as number[]).map((x, idx) => x === targetCentroidIndex ? idx : null).filter(x => x !== null));
  store.value = { ...result, targetIndex: (targetIndex as number[]) };
  loading.value = false;
}, { immediate: true });

watch(bgColor, (color) => {
  nextTick(() => {
    loading.value = true;
    const { targetIndex, vectors, width, height } = store.value!;
    if (color) {
      const [r, g, b, a] = (color.match(/(\d(\.\d+)?)+/g) as string[]).map(Number);
      targetIndex.forEach((idx) => {
        vectors[idx] = [~~r, ~~g, ~~b, ~~(a * 255)];
      });
    }
    else {
      // 透明背景
      targetIndex.forEach((idx) => {
        vectors[idx] = [0, 0, 0, 0];
      });
    }
    previewUrl.value = vectorsToBase64(vectors, width, height);
    loading.value = false;
  });
});
</script>

<template>
  <div v-loading="loading" class="w-full">
    <!-- description -->
    <Description class="mb-10" :content="['证件照换底色🎨']" :tips="['基于 k-means 算法', '纯在线转换，无需上传至后台，请放心使用']" />

    <!-- main -->
    <div class="w-full flex flex-col items-center">
      <el-upload
        class="w-64 mb-8 avatar-uploader" action="#" :show-file-list="false" :auto-upload="false"
        accept="image/*" :on-change="handleChange"
      >
        <img v-if="imageUrl || previewUrl" :src="previewUrl || imageUrl" class="avatar">
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <el-color-picker v-if="imageUrl" v-model="bgColor" :show-alpha="true" color-format="rgb" />
    </div>
  </div>
</template>

<style>
.avatar-uploader .el-upload {
  @apply border border-dashed border-gray-500 rounded cursor-pointer relative overflow-hidden transition duration-250;
}

.avatar-uploader:hover .el-upload {
  @apply border-red-500;
}

.el-icon.avatar-uploader-icon {
  @apply text-4xl w-64 h-64 text-gray-500 transition duration-250;
  text-align: center;
}

.avatar-uploader:hover .avatar-uploader-icon {
  @apply text-red-500;
}
</style>
