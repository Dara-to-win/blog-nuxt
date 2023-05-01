<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <MyHeader :addTodo="addTodo" :setTimestamp="setTimestamp"/>
            <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo"/>
            <MyFooter :todos="todos" :checkAllTodo="checkAllTodo" :clearAllCompleted="clearAllCompleted"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from "element-plus";

const todo = useStore.todo();
let todoList = {};
let todos = ref([]);
let nowTimestamp = new Date(new Date().toLocaleDateString()).getTime();

// [
//     {id: '001', title: '吃饭', completed: false},
//     {id: '002', title: '睡觉', completed: false},
//     {id: '003', title: '打代码', completed: false}
// ]

onMounted(() => {
    todoList = localStorage.getItem("todoList");
    if(todoList) { // localStorage有这个字段
        todoList = JSON.parse(todoList);
        if(todoList[todo.timestamp]) { // 有 timestamp 的记录
            todos.value = todoList[todo.timestamp];
        }
    }else {
        todoList = {};
    }
});

watch(todos, () => {
    todoList[todo.timestamp] = todos.value;
    // console.log("watch: ", todo.timestamp, todos.value);
    // Reflect.set(todoList, todo.timestamp, todos);
    localStorage.setItem("todoList", JSON.stringify(todoList));
},{
    deep: true
});

// 添加一个todo
function addTodo(todoObj){
    if(nowTimestamp === todo.timestamp) {
        let flag = true;
        todos.value.forEach((item, index, arr) => {
            if(item.title === todoObj.title) {
                flag = false;
            }
        });
        if(flag) {
            todos.value.unshift(todoObj);
        }else{
            ElMessage({
                message: "不能设置重复的任务哦！",
                type: 'error',
            })
        }
    }else{
        ElMessage({
            message: "只能修改当日的任务记录哦！",
            type: 'error',
        })
    }
}

function setTimestamp(time) {
    todo.timestamp = time;
    // console.log("todo.timestamp: ", todo.timestamp);
    // let len = todos.value.length;
    // for(let i=0; i<len; i++) {
    //     todos.value.shift();
    //     console.log("todoList: ", todoList);
    // }
    todos.value = [];
    // console.log("todos: ", todos.value);
    // console.log("todoList[todo.timestamp]: ", todoList[todo.timestamp]);
    if(todoList[todo.timestamp]) {
        todos.value = todoList[todo.timestamp];
    }
    // console.log("todos: ", todos.value);
}

// 勾选or取消勾选一个todo
function checkTodo(id){
    if(nowTimestamp === todo.timestamp) {
        todos.value.forEach((todo) => {
            if(todo.id === id)  
                todo.completed = !todo.completed
        })
    }else{
        ElMessage({
            message: "不能修改以前的任务记录哦！",
            type: 'error',
        })
    }
}
// 删除一个todo
function deleteTodo(id){
    // todos = todos.filter( todo => todo.id !== id)
    if(nowTimestamp === todo.timestamp) {
        todos.value.forEach((todo, index) => {
            if(todo.id === id){
                todos.value.splice(index, 1)
            } 
        })
    }else{
        ElMessage({
            message: "不能修改以前的任务记录哦！",
            type: 'error',
        })
    }
}
// 全选or全不选
function checkAllTodo(done){
    if(nowTimestamp === todo.timestamp) {
        todos.value.forEach(todo => {
            todo.completed = done
        });
    }else{
        ElMessage({
            message: "不能修改以前的任务记录哦！",
            type: 'error',
        });
    }
}
// 清除所有已完成的任务
function clearAllCompleted() {
    // const afterTodo = todos.filter(todo => !todo.completed)
    
    // todos.forEach((todo, index) => {
    //     if(todo.completed){
    //         todos.splice(index, 1)
    //     } 
    // })
    let result = [];
    // for(let i=0; i<todos.value.length; i++){
    //     if(todos[i].completed){
    //         todos.value.splice(i, 1);
    //         i -= 1
    //     }
    // }
    todos.value.forEach((item, index, arr) => {
        if(!item.completed) {
            result.push(item);
        }
    });
    todos.value = result;

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