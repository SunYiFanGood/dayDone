<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" :checked="hasDoneNum===todos.length" @click="change"/>
    </label>
    <span> <span>已完成{{hasDoneNum}}</span> / 全部{{todos.length}} </span>
    <button class="btn btn-danger" @click="del">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props:{
    todos:Array,
    isAllDone:Function,
    delAllDone:Function
  },
  computed:{
    hasDoneNum(){
      return this.todos.filter((item)=>{
        return item.isDone;
      }).length
    }
  },
  methods:{
    change() {
      this.isAllDone(!(this.hasDoneNum===this.todos.length))
    },
    del(){
      this.delAllDone()
    }
  },
};
</script>

<style>
/*footer*/
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