<template>
  <div>
    <CategorySelector />
    <SpuList v-show="isShow === 1" />
    <AddOrUpdateSpu v-show="isShow === 2" />
    <AddSku v-show="isShow === 3" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CategorySelector from '@comps/CategorySelector'
import SpuList from './components/SpuList'
import AddOrUpdateSpu from './components/AddOrUpdateSpu'
import AddSku from './components/AddSku'

export default {
  name: 'Spu',
  components: {
    CategorySelector,
    SpuList,
    AddOrUpdateSpu,
    AddSku
  },
  computed: {
    ...mapState({
      isShow: (state) => state.spu.isShow
    })
  }
}
</script>

<style lang="sass" scoped>
</style>
