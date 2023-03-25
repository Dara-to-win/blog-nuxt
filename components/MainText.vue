<template>
  <div class="main-text">
    <h1 class="title">{{contentText.title}}</h1>
    <div class="author">
        <el-avatar :size="40" fit="cover" :src="contentText.authorImg" style="margin-left: 15px"></el-avatar>
        <div class="right">
            <h5>{{contentText.authorName}}</h5>
            <p>{{contentText.time}}</p>
        </div>
    </div>
    <img :src="contentText.cover" alt="" class="cover">
    <div id="editor-content-view" class="editor-content-view" v-html="contentText.content"></div>
  </div>
</template>

<script setup lang='ts'>
import {} from 'vue'
const props = defineProps<{
    contentText
}>()
</script>

<style scoped lang='less'>
:deep(.el-avatar) {
    margin-left: 0px!important;
}
.main-text {
    .author {
        margin: 20px 0;
        display: flex;
        .right {
            margin-left: 10px;
            h5 {
                font-weight: 400;
            }
        }
    }
    .cover {
        width: 100%;
        object-fit: contain;
    }
}
</style>