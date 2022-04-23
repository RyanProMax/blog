<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const imageUrl = ref('');
</script>

<template>
  <div>
    <el-upload class="w-64 avatar-uploader" action="#" :show-file-list="false">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>

<style>
.avatar-uploader .el-upload {
  @apply border border-dashed border-gray-500 rounded cursor-pointer relative overflow-hidden transition duration-500;
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
