<template>
    <div>
        <span>点击次数：{{ props.num }}</span><br/>
        <span>双倍次数：{{ props.doubleNum }}</span><br/>
        <el-button @click="handelClick">点击</el-button>
    </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // 声明组件要触发的事件
  const emits = defineEmits(['increase']);
  // 声明接收参数
  const props = defineProps({
    num: Number,
    doubleNum: Number
  });
  //  点击事件
  const handelClick = () => {
    console.log('触发子组件点击')
    // 触发父组件事件
    emits('increase')
  };
</script>
<style scoped lang="less">
    div {
        margin: 100px auto;
    }
</style>
