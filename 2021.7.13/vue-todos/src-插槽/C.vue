<template>
  <div>
    <!-- 传递name属性，会传递给父组件 -->
    <slot name="header" :sex="sex" />
    <p>CCCC</p>
    <slot :age="age" />
  </div>
</template>

<script>
export default {
  name: "C",
  data() {
    return {
      sex: "男",
      age: 18,
    };
  },
};
</script>

<style>
</style>