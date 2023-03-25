<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称" v-model="title" @keyup.enter="add" class="text"/>
    <el-button type="primary" @click="add" class="add">添加</el-button>
  </div>
</template>

<script setup lang="ts">
import {nanoid} from 'nanoid'
import { ref } from 'vue'

const props = defineProps({
  addTodo: Function,
})

const title:String = ref('')
  
const add = (e) => {
    // console.log(e.target.value)
    // console.log(this.title)
    
    // 校验数据
    if(!title.value.trim())   return alert('输入不能为空！')
    // 将用户的输入包装成一个todo对象
    const todoObj = {id:nanoid(), title: title.value, completed: false}
    console.log(todoObj)
    // 通知App组件去添加一个todo对象
    props.addTodo(todoObj)
    // 清空输入
    title.value = ''
}
</script>

<style scoped lang="less">
  /*header*/
  .todo-header {
    margin: 10px 0;
    height: 32px;
    display: flex;
    align-items: center;
    .text {
      width: 50%;
      height: 32px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 4px 7px;
    }
    &:focus {
      outline: none;
      border-color: rgba(82, 168, 236, 0.8);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
    .add {
      margin-left: 10px;
    }
  }
</style>