<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--vue自定义事件-->
      <Header @addTodo="addTodo"/>
      <List :todos="todos" :delOne="delOne" :isDone="isDone"/>
      <Footer :todos="todos" :isAllDone="isAllDone" :delAllDone="delAllDone" v-if="todos.length!==0"/>
      <h1 v-if="todos.length===0">恭喜你没有未完成的任务！</h1>
    </div>
  </div>
</template>

<script>
import Header from "./views/Header";
import List from "./views/List";
import Footer from "./views/Footer";

export default {
  name: "App",
  data() {
    return {
      todos: [
        {id: 1, name: "吃饭", isDone: false},
        {id: 2, name: "睡觉", isDone: true},
        {id: 3, name: "敲代码", isDone: false},
        {id: 4, name: "打游戏", isDone: false},
      ],
    };
  },
  components: {
    Header,
    List,
    Footer,
  },
  methods: {
    addTodo(name) {
      const id = this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1;
      this.todos.push({
        id,
        name,
        isDone: false
      })
    },
    delOne(id) {
      this.todos = this.todos.filter((item) => {
        return item.id !== id;
      })
    },
    isDone(id) {
      this.todos.map((item) => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }
      })
    },
    isAllDone(isDone) {
      this.todos.map((item) => {
        if (item.isDone !== isDone) {
          item.isDone = isDone;
        }
      })
    },
    delAllDone() {
      this.todos = this.todos.filter((item) => {
        return !item.isDone;
      })
    }
  },
};
</script>

<style>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>