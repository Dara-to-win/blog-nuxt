<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <MyHeader :addTodo="addTodo"/>
            <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo"/>
            <MyFooter :todos="todos" :checkAllTodo="checkAllTodo" :clearAllCompleted="clearAllCompleted"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import  {reactive} from 'vue'
const todos = reactive([
    {id: '001', title: '吃饭', completed: true},
    {id: '002', title: '睡觉', completed: false},
    {id: '003', title: '打代码', completed: true}
])
// 添加一个todo
function addTodo(todoObj){
    // console.log('我是App组件，我收到了数据：', todoObj)
    todos.unshift(todoObj)
}
// 勾选or取消勾选一个todo
function checkTodo(id){
    todos.forEach((todo) => {
        if(todo.id === id)  
            todo.completed = !todo.completed
    })
}
// 删除一个todo
function deleteTodo(id){
    // todos = todos.filter( todo => todo.id !== id)
    todos.forEach((todo, index) => {
        if(todo.id === id){
            todos.splice(index, 1)
        } 
    })
}
// 全选or全不选
function checkAllTodo(done){
    todos.forEach(todo => {
        todo.completed = done
    })
}
// 清除所有已完成的任务
function clearAllCompleted() {
    // const afterTodo = todos.filter(todo => !todo.completed)
    
    // todos.forEach((todo, index) => {
    //     if(todo.completed){
    //         todos.splice(index, 1)
    //     } 
    // })
    for(let i=0; i<todos.length; i++){
        if(todos[i].completed){
            todos.splice(i, 1);
            i -= 1
        }
    }
}
</script>

<style scoped lang="less">
/*base*/
.todo-container {
    width: 100%;
    background: #fff;
    margin: 0 auto;
    margin-top: 74px;
    padding: 20px;
    .todo-wrap {
        border-radius: 5px;
    }
}
@media screen and (min-width: 768px){
    .todo-container {
        width: 750px;
        transition: all 0.3s;
    }
}
@media screen and (min-width: 992px){
    .todo-container {
      width: 850px;
      transition: all 0.3s;
    }
    
}
@media screen and (min-width: 1400px){
    .todo-container {
      width: 1100px;
      transition: all 0.3s;
    }
}

</style>