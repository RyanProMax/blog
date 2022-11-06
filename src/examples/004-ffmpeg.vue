<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import type { UploadFile } from 'element-plus/es';
import Description from '~/components/Description.vue';

const loading = ref(false);
const ffmpeg = ref<FFmpeg>();
const currentFile = ref<UploadFile>();
/* const config = ref({
  args: ['-i', 'video.avi', '-c:v', 'libx264', 'video.mp4']
}); */
const src = ref<string>('');
const progress = ref({ ratio: 0, time: 0 });
const logger = ref<string>('');

onMounted(async() => {
  loading.value = true;
  const _ffmpeg = createFFmpeg({
    log: true,
    progress: ({ ratio }) => {
      progress.value.ratio = ratio;
    }
  });
  _ffmpeg.setLogger(({ type, message }) => { logger.value = `[${type}] ${message}`; });
  await _ffmpeg.load();
  ffmpeg.value = _ffmpeg;
  loading.value = false;
});

const handleChange = async(file: UploadFile) => {
  progress.value = { ratio: 0, time: 0 };
  if (!ffmpeg.value)
    return;

  const start = Date.now();
  currentFile.value = file;
  const { name } = file;
  ffmpeg.value.FS('writeFile', name, await fetchFile(file.raw as File));
  await ffmpeg.value?.run('-i', name, 'output.mp4');
  const data = ffmpeg.value.FS('readFile', 'output.mp4');
  src.value = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  progress.value = { ratio: 0, time: Date.now() - start };
};
</script>

<template>
  <div class="w-full flex flex-col items-start">
    <Description
      class="mb-10" :content="['Use ffmpeg in browser 💿']"
      :tips="['Powered by ffmpeg.wasm', 'https://github.com/ffmpegwasm/ffmpeg.wasm']"
    />

    <div v-loading="loading" class="w-full flex flex-col items-center">
      <p v-if="logger" class="mb-4">
        log: {{ logger }}
      </p>
      <el-upload
        action="#" :show-file-list="false" :auto-upload="false" accept="video/*, audio/*"
        :on-change="handleChange"
      >
        <el-button type="danger">
          UPLOAD A VIDEO/AUDIO FILE
        </el-button>
      </el-upload>
      <video v-if="src" :src="src" controls class="mt-4" />
      <p v-if="progress.ratio || progress.time" class="mt-4">
        <template v-if="progress.ratio">
          {{ (progress.ratio * 100).toFixed(2) }} %
        </template>
        <template v-if="progress.time">
          Done in {{ progress.time }} ms
        </template>
      </p>
    </div>
  </div>
</template>
