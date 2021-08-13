<template>
  <div>
    <!-- 命名插槽 -->
    <slot name="header" />
    <p>------</p>
    <!-- 默认插槽的使用 -->
    <slot />
    <p>------</p>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: "B",
};
</script>

<style>
</style>