<template>
  <div class="container">
    <Search></Search>
    <List></List>
  </div>
</template>

<script>
import Search from './views/Search'
import List from './views/List'

export default {
  name: "App",
  components: {
    List,
    Search
  }
};
</script>

<style>
</style>