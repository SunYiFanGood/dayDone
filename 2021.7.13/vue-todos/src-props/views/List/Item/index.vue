<template>
  <li @mouseenter="isShow=true" @mouseleave="isShow=false">
    <label  >
      <input type="checkbox" :checked="todo.isDone" @click.stop="change" />
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" @click="del" v-show="isShow">删除</button>
  </li>
</template>

<script>
export default {
  name: "Item",
  props: {
    todo: Object,
    delOne:Function,
    isDone:Function
  },
  methods:{
    del(){
      this.delOne(this.todo.id)
    },
    change(){
      this.isDone(this.todo.id)
    }
  },
  data(){
    return {
      isShow:false
    }
  }
};
</script>

<style>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  /* float: left; */
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /*display: none;*/
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>