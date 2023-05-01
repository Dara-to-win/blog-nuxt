<template>
  <div>
    <ul class="todo-main">
        <MyItem 
            v-for="todoObj in todos" 
            :key="todoObj.id" 
            :todo="todoObj" 
            :checkTodo="checkTodo"
            :deleteTodo="deleteTodo"/>
    </ul>
    <el-empty description="本日无记录" v-if="todos.length === 0"></el-empty>
  </div>
</template>

<script setup lang="ts">
interface ToDo {
  id: String,
  title: String,
  completed: Boolean
}
const props = defineProps<{
  todos: Array<ToDo>,
  checkTodo: Function,
  deleteTodo: Function, 
}>()

</script>

<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>