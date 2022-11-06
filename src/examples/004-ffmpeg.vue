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
const time = ref<number>(0);

onMounted(async() => {
  loading.value = true;
  const _ffmpeg = createFFmpeg({ log: true });
  await _ffmpeg.load();
  ffmpeg.value = _ffmpeg;
  loading.value = false;
});

const handleChange = async(file: UploadFile) => {
  time.value = 0;
  if (!ffmpeg.value)
    return;

  const start = Date.now();
  currentFile.value = file;
  const { name } = file;
  ffmpeg.value.FS('writeFile', name, await fetchFile(file.raw as File));
  await ffmpeg.value?.run('-i', name, 'output.mp4');
  const data = ffmpeg.value.FS('readFile', 'output.mp4');
  src.value = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  time.value = Date.now() - start;
};
</script>

<template>
  <div class="w-full flex flex-col items-start">
    <Description
      class="mb-10" :content="['Use ffmpeg in browser 💿']"
      :tips="['Powered by ffmpeg.wasm', 'https://github.com/ffmpegwasm/ffmpeg.wasm']"
    />

    <div v-loading="loading" class="w-full flex flex-col items-center">
      <el-upload
        action="#" :show-file-list="false" :auto-upload="false" accept="video/*, audio/*"
        :on-change="handleChange"
      >
        <el-button type="danger">
          UPLOAD A VIDEO/AUDIO FILE
        </el-button>
      </el-upload>
      <video v-if="src" :src="src" controls class="mt-4" />
      <p v-if="time" class="mt-4">
        Done in {{ time }} ms
      </p>
    </div>
  </div>
</template>
