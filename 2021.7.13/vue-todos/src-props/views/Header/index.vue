<template>
  <div class="todo-header">
    <input v-model="name" placeholder="请输入你的任务名称，按回车键确认" type="text" @keyup.enter="add"/>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      name: "",
    }
  },
  methods: {
    add() {
      if (this.name === "") return;
      this.$emit("addTodo",this.name)
      this.name = "";
    }
  }
};
</script>

<style>
/*header*/
.todo-header input {
  width: 100%;
  height: 40px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  margin-bottom: 10px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
  0 0 8px rgba(82, 168, 236, 0.6);
}
</style>