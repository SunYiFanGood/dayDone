<template>
  <el-card class="card">
    <el-button type="primary" icon="el-icon-plus" @click="showForm(false)"
      >添加</el-button
    >
    <el-table
      v-loading="loading"
      :data="trademarkList"
      border
      class="table"
    >
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <template v-slot="{ row }">
          <img class="trademark-img" :src="row.logoUrl" :alt="row.tmName" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="showForm(true, row)"
          >
            修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del(row)"
            >删除</el-button
          >
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

    <!-- 添加品牌弹框 -->
    <el-dialog
      :title="`${isUpdateForm ? '修改' : '添加'}品牌`"
      :visible.sync="visible"
      @closed="resetFields"
    >
      <el-form
        ref="trademark"
        label-width="100px"
        :model="trademark"
        :rules="trademarkRules"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademark.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!--
            action 上传服务器地址
              完整服务器地址：http://39.98.123.211/admin/product/fileUpload
              走代理服务器: /dev-api/admin/product/fileUpload
            show-file-list 显示多张图片
            on-success 上传成功的回调
            before-upload 上传之前触发回调
           -->
          <el-upload
            class="avatar-uploader"
            :action="`${api}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademark.logoUrl"
              :src="trademark.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  reqGetTrademarkList,
  reqSaveTrademark,
  reqUpdateTrademark,
  reqRemoveTrademark
} from '@api/trademark'

export default {
  name: 'Trademark',
  data() {
    return {
      api: process.env.VUE_APP_BASE_API,
      trademarkList: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,
      loading: false,
      visible: false,
      trademark: {
        tmName: '',
        logoUrl: ''
      },
      trademarkRules: {
        tmName: [{ required: true, message: '请输入品牌名称' }],
        logoUrl: [{ required: true, message: '请上传品牌LOGO' }]
      },
      isUpdateForm: false
    }
  },
  mounted() {
    const { currentPage, pageSize } = this
    this.getTrademarkList(currentPage, pageSize)
  },
  methods: {
    // 当pageSize发生变化时触发
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTrademarkList(this.currentPage, pageSize)
    },
    // 当currentPage发生变化时触发
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getTrademarkList(currentPage, this.pageSize)
    },
    // 复用获取分页列表方法
    async getTrademarkList(currentPage, pageSize) {
      this.loading = true
      const res = await reqGetTrademarkList(currentPage, pageSize)
      this.trademarkList = res.data.records
      this.total = res.data.total
      this.loading = false
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res, file);
      this.trademark.logoUrl = res.data
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isValidImage =
        file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt = file.size <= 500 * 1024

      if (!isValidImage) {
        this.$message({
          type: 'error',
          message: '上传头像图片只能是 JPG 或 PNG 格式!'
        })
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      // 返回值true 就会继续上传图片
      // 返回值false，就会终止上传
      return isValidImage && isLt
    },
    submitForm() {
      // 表单校验
      this.$refs.trademark.validate(async (valid) => {
        if (valid) {
          // 校验通过
          const { tmName, logoUrl, id } = this.trademark

          if (this.isUpdateForm) {
            // 修改品牌
            await reqUpdateTrademark({ tmName, logoUrl, id })
          } else {
            // 添加品牌
            await reqSaveTrademark(tmName, logoUrl)
          }

          // 刷新数据
          await this.getTrademarkList(this.currentPage, this.pageSize)

          this.$message({
            type: 'success',
            message: '数据更新成功~'
          })

          this.visible = false
        }
      })
    },
    resetFields() {
      this.$refs.trademark.resetFields()
      // this.visible = false
    },
    // 显示品牌表单
    showForm(isUpdateForm, row = {}) {
      this.isUpdateForm = isUpdateForm
      this.visible = true
      this.trademark.tmName = row.tmName
      this.trademark.logoUrl = row.logoUrl
      this.trademark.id = row.id
    },
    del(row) {
      this.$confirm(
        `您确认要删除 <strong style="color: red;">${row.tmName}</strong> 品牌数据吗?`,
        '提示',
        {
          dangerouslyUseHTMLString: true, // 可以使用html片段
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        await reqRemoveTrademark(row.id)
        let { currentPage, pageSize } = this
        if (this.trademarkList.length === 1 && currentPage > 1) {
          currentPage--
        }
        await this.getTrademarkList(currentPage, pageSize)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.card
  min-height: calc(100vh - 70px)
.trademark-table
  margin: 20px 0
.trademark-img
  width: 150px
  height: 100px
</style>
