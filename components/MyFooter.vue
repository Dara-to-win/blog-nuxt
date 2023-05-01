<template>
  <div class="todo-footer" v-if="total">
    <label>
        <!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
        <!-- 这样写更加清晰，注意这儿可以用v-model，因为并没有改变props -->
        <input type="checkbox" v-model="isAll"/>
    </label>
    <span>
        <span>已完成{{doneTotal}}</span> / 全部{{total}}
    </span>
    <!-- <button class="btn btn-danger" @click="clearAll">清除已完成任务</button> -->
  </div>
</template>

<script setup lang="ts">
interface ToDo {
  id: String,
  title: String,
  completed: Boolean
}
const props = defineProps({
  todos: Array<ToDo>,
  checkAllTodo: Function,
  clearAllCompleted: Function,
})

const total:Number = computed(() => {
  return props.todos.length
})

const doneTotal:Number = computed(() => {
  return props.todos.reduce((pre, current) => pre + (current.completed? 1:0), 0)
})

const isAll = computed({
  get: () => {
    return doneTotal.value === total.value && total.value > 0
  },
  set: (value) => {
      props.checkAllTodo(value)
  }
})
function checkAll(e){
    props.checkAllTodo(e.target.checked)
}
function clearAll(){
    if(confirm('确定删除所有已完成的任务吗？'))
        props.clearAllCompleted()
}
</script>

<style scoped>
  /*footer*/
  .btn {
    display: inline-block;
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
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>