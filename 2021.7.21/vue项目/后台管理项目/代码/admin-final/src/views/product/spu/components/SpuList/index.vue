<template>
  <el-card class="card">
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!category3Id"
      @click="SET_IS_SHOW(2)"
    >
      添加SPU
    </el-button>
    <el-table v-loading="loading" :data="spuList" border class="table">
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column prop="spuName" label="SPU名称" />
      <el-table-column prop="description" label="SPU描述" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip effect="dark" content="添加SKU" placement="top">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="showAddSku(row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="修改SPU" placement="top">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="showUpdateSpu(row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="查看SKU列表" placement="top">
            <el-button type="info" icon="el-icon-info" size="mini" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除SPU" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { reqGetSpuList } from '@api/spu'

export default {
  name: 'SpuList',
  data() {
    return {
      spuList: [],
      loading: false,
      currentPage: 1,
      pageSize: 3,
      total: 0
    }
  },
  computed: {
    ...mapState({
      category3Id: (state) => state.category.category3Id,
      isShow: (state) => state.spu.isShow
    })
  },
  watch: {
    category3Id(category3Id) {
      if (!category3Id) {
        this.spuList = []
        return
      }

      this.getSpuList(this.currentPage, this.pageSize)
    },
    isShow(isShow) {
      if (isShow) {
        this.getSpuList(this.currentPage, this.pageSize)
      }
    }
  },
  methods: {
    ...mapMutations('spu', ['SET_IS_SHOW', 'SET_SPU']),
    // 当pageSize发生变化时触发
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getSpuList(this.currentPage, pageSize)
    },
    // 当currentPage发生变化时触发
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getSpuList(currentPage, this.pageSize)
    },
    // 复用获取分页列表方法
    async getSpuList(currentPage, pageSize) {
      this.loading = true
      const res = await reqGetSpuList({
        page: currentPage,
        limit: pageSize,
        category3Id: this.category3Id
      })
      this.spuList = res.data.records
      this.total = res.data.total
      this.loading = false
    },
    showUpdateSpu(row) {
      this.SET_IS_SHOW(2)
      this.SET_SPU(row)
    },
    showAddSku(row) {
      this.SET_IS_SHOW(3)
      this.SET_SPU(row)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>

