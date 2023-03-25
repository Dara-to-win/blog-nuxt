<template>
  <li class="item">
    <label>
        <!-- change和click事件都可以 -->
        <input type="checkbox" :checked="todo.completed" @change="handleCheck(todo.id)"/>
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
        <!-- <input type="checkbox" v-model="todo.done"> -->
        <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
  </li>
</template>

<script setup lang="ts">
interface ToDo {
  id: String,
  title: String,
  completed: Boolean
}

const props = defineProps<{
  todo: ToDo,
  checkTodo: Function,
  deleteTodo: Function
}>()

function handleCheck(id){
    // 通知App组件将对应的id的completed的值取反
    props.checkTodo(id)
}
function handleDelete(id){
    if(confirm('确定删除吗？')){
        props.deleteTodo(id)
    }
}
</script>

<style scoped lang="less">
  /*item*/
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid #ddd;
    label {
      cursor: pointer;
      input {
        vertical-align: middle;
        margin-right: 10px;
        position: relative;
        top: -1px;
      }
    }
    button {
      display: none;
    }
    .btn {
      
      padding: 4px 12px;
      margin-bottom: 0;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }
    .btn-danger {
      color: #fff;
      background-color: #da4f49;
      border: 1px solid #bd362f;
    }

    .btn-danger:hover {
      color: #fff;
      background-color: #bd362f;
    }

    .btn:focus {
      outline: none;
    }
  }

  &:before {
    content: initial;
  }
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #ddd;
  }
  li:hover button {
    display: block;
  }
</style>