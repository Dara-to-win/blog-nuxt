<template>
  <div class="icon">
    <i class="iconfont icon-todo_list todo"></i>
    <i class="name">{{ name }}</i>
  </div>
</template>

<script setup lang='ts'>
import {} from 'vue'
const props = defineProps<{
    name: String
}>()
</script>

<style scoped lang='less'>
.icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    .todo {
        width: 24px;
        height: 24px;
        color: skyblue;
    }
    .name {
        font-size: 8px;
    }
}
</style>