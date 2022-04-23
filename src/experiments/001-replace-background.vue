<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus/es';

const imageUrl = ref('');

const handleChange = (file: UploadFile) => {
  imageUrl.value = window.URL.createObjectURL(file.raw!);
};
</script>

<template>
  <div>
    <el-upload
      class="w-64 avatar-uploader" action="#" :show-file-list="false" :auto-upload="false" accept="image/*"
      :on-change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
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
