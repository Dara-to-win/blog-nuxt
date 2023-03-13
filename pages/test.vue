<template>
    <div>
        <!-- 子组件 参数：num 、nums -->
        <Child :num="nums.num" :doubleNum="nums.doubleNum" @increase="handleIncrease"></Child>
        <div>num: {{nums.num}}</div>
        <div>doubleNum: {{nums.doubleNum}}</div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
  // 对象默认
  const nums = reactive({
    num: 0,
    doubleNum: 0
  });
  // 点击事件
  const handleIncrease = () => {
    // 每次+1
    nums.num++
    // 每次+2
    nums.doubleNum += 2
  };
</script>
