<template>
  <div>
    <!-- 
      插槽：用于父子组件通信，通信内容是带数据的标签
      1. 默认插槽
      2. 命名插槽（具名插槽）
        父给子传递标签数据
      3. 作用域插槽
        子给父传递数据
     -->
    <!-- 
       默认插槽
       给A组件传递标签数据
      -->
    <A>
      <p>{{ count }}</p>
      <button @click="count++">update</button>
    </A>
    <!-- 
      命名插槽（具名插槽）
     -->
    <B>
      <!-- template标签不会生成DOM元素 -->
      <template #header>
        <header>BBBB header</header>
      </template>

      <section>BBBB section</section>

      <template v-slot:footer>
        <footer>BBBB footer</footer>
      </template>
    </B>

    <!-- 作用域插槽 -->
    <C>
      <template #header="slotScoped">
        <header>CCCC header {{ slotScoped.sex }}</header>
      </template>

      <template v-slot="{ age }">
        <footer>CCCC footer {{ age }}</footer>
      </template>
    </C>
  </div>
</template>

<script>
import A from "./A";
import B from "./B";
import C from "./C";

export default {
  name: "App",
  data() {
    return {
      count: 0,
    };
  },
  components: {
    A,
    B,
    C,
  },
};
</script>

<style>
</style>