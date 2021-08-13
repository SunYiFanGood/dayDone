<template>
  <div>
    <CategorySelector :disabled="!isShowAttrList" />
    <AttrList
      v-show="isShowAttrList"
      :set-is-show-attr-list="setIsShowAttrList"
    />
    <AddOrUpdateAttr
      v-show="!isShowAttrList"
      :set-is-show-attr-list="setIsShowAttrList"
    />
  </div>
</template>

<script>
import CategorySelector from '@comps/CategorySelector'
import AttrList from './components/AttrList'
import AddOrUpdateAttr from './components/AddOrUpdateAttr'

export default {
  name: 'Attr',
  components: {
    CategorySelector,
    AttrList,
    AddOrUpdateAttr
  },
  data() {
    return {
      isShowAttrList: true
    }
  },
  methods: {
    setIsShowAttrList(isShowAttrList) {
      this.isShowAttrList = isShowAttrList
    }
  }
}
</script>

<style lang="sass" scoped>
</style>

