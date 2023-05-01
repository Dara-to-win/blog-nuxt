<template>
  <div class="icon">
    <!-- <i class="iconfont icon-todo_list todo"></i> -->
    <img :src="imgPath" alt="" class="todo">
    <i class="name">{{ name }}</i>
  </div>
</template>

<script setup lang='ts'>
import {} from 'vue'
const props = defineProps<{
    name: String,
    imgPath: String
}>()
</script>

<style scoped lang='less'>
.icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    text-align: center;
    // width: 50px;
    height: 40px;
    padding: 0 5px;
    .todo {
        width: 24px;
        height: 24px;
        // color: skyblue;
    }
    .name {
        font-size: 8px;
    }
}
</style>