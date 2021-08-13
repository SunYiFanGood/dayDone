<template>
  <div>
    <p>count的值为{{$store.state.count}}，类型为{{!!($store.state.count&1)?'奇数':'偶数'}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">偶数加</button>
    <button @click="incrementAsync">异步加</button>
  </div>
</template>
<script>
export default {
  name: "App",
  methods:{
    increment(){
      this.$store.dispatch('increment')
    },
    decrement(){
      this.$store.dispatch('decrement')
    },
    incrementIfOdd(){
      this.$store.dispatch('incrementIfOdd')
    },
    incrementAsync(){
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style lang="less">
</style>
