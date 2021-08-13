<template>
  <el-card class="card">
    <el-form ref="form" :model="sku" :rules="rules" label-width="80px">
      <el-form-item label="SPU名称">
        <span>{{ spu.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="请输入SKU名称" v-model="sku.skuName" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number
          class="sku-input-number"
          v-model="sku.price"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="重量">
        <el-input-number
          class="sku-input-number"
          v-model="sku.weight"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          type="textarea"
          v-model="sku.skuDesc"
          placeholder="请输入SKU描述"
        />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-row>
          <el-col
            :xs="24"
            :sm="12"
            :lg="8"
            v-for="(attr, index) in attrList"
            :key="attr.id"
          >
            <el-form-item :label="attr.attrName">
              <el-select v-model="sku.skuAttrValueList[index]">
                <el-option
                  v-for="attrValue in attr.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                  :value="`${attr.id}:${attr.attrName}:${attrValue.id}:${attrValue.valueName}`"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-row>
          <el-col
            :xs="24"
            :sm="12"
            :lg="8"
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-form-item :label="saleAttr.saleAttrName">
              <el-select v-model="sku.skuSaleAttrValueList[index]">
                <el-option
                  v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                  :key="saleAttrValue.id"
                  :label="saleAttrValue.saleAttrValueName"
                  :value="`${saleAttr.id}:${saleAttr.saleAttrName}:${saleAttrValue.id}:${saleAttrValue.saleAttrValueName}`"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="SKU图片">
        <el-table
          :data="spuImageList"
          border
          class="table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label="序号"
            type="selection"
            width="50"
            align="center"
          />
          <el-table-column label="图片">
            <template v-slot="{ row, $index }">
              <img :src="row.imgUrl" :alt="row.imgName" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" />
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                v-show="!row.isDefault"
                @click="setDefaultImg(row)"
                type="primary"
                size="mini"
              >
                设置默认图片
              </el-button>
              <el-button
                v-show="row.isDefault"
                type="success"
                size="mini"
                disabled
              >
                默认图片
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  reqGetSpuImageList,
  reqGetSpuSaleAttrList,
  reqSaveSkuInfo
} from '@api/spu'
import { reqGetAttrList } from '@api/attr'

export default {
  name: 'AddSku',
  data() {
    return {
      sku: {
        skuName: '',
        price: 0,
        weight: 0,
        skuDesc: '',
        skuAttrValueList: [
          // {
          //   attrName: '属性名',
          //   valueName: '属性值'
          // }
        ],
        skuSaleAttrValueList: [],
        skuImageList: []
      },
      rules: {},
      attrList: [],
      spuSaleAttrList: [],
      spuImageList: []
    }
  },
  computed: {
    ...mapState({
      spu: (state) => state.spu.spu,
      isShow: (state) => state.spu.isShow,
      category1Id: (state) => state.category.category1Id,
      category2Id: (state) => state.category.category2Id,
      category3Id: (state) => state.category.category3Id
    })
  },
  watch: {
    async isShow(isShow) {
      if (isShow !== 3) return
      const { category1Id, category2Id, category3Id, spu } = this
      // 发送请求
      const [attrList, spuSaleAttrList, spuImageList] = await Promise.all([
        reqGetAttrList({ category1Id, category2Id, category3Id }),
        reqGetSpuSaleAttrList(spu.id),
        reqGetSpuImageList(spu.id)
      ])
      this.attrList = attrList.data
      this.spuSaleAttrList = spuSaleAttrList.data
      this.spuImageList = spuImageList.data.map((img) => {
        return {
          isDefault: 0,
          ...img
        }
      })
    }
  },
  methods: {
    ...mapMutations('spu', ['SET_IS_SHOW']),
    handleSelectionChange(val) {
      this.sku.skuImageList = val
    },
    setDefaultImg(row) {
      this.spuImageList.forEach((img) => (img.isDefault = 0))
      row.isDefault = 1
    },
    async submit() {
      const { category3Id } = this
      const {
        price,
        skuAttrValueList,
        skuImageList,
        weight,
        skuName,
        skuSaleAttrValueList,
        skuDesc
      } = this.sku

      const skuDefaultImg = skuImageList.find((image) => image.isDefault).imgUrl

      const { id: spuId, tmId } = this.spu

      await reqSaveSkuInfo({
        category3Id,
        price,
        skuAttrValueList: skuAttrValueList.map((attr) => {
          const [attrId, attrName, valueId, valueName] = attr.split(':')
          return {
            attrId,
            attrName,
            valueId,
            valueName
          }
        }),
        skuDefaultImg,
        skuDesc,
        skuImageList,
        skuName,
        skuSaleAttrValueList: skuSaleAttrValueList.map((saleAttr) => {
          const [
            saleAttrId,
            saleAttrName,
            saleAttrValueId,
            saleAttrValueName
          ] = saleAttr.split(':')

          return {
            saleAttrId,
            saleAttrName,
            saleAttrValueId,
            saleAttrValueName,
            spuId
          }
        }),
        spuId,
        tmId,
        weight
      })

      this.$message({
        type: 'success',
        message: '添加SKU成功'
      })
      this.cancel()
    },
    cancel() {
      this.SET_IS_SHOW(1)
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="sass" scoped>
.sku-input-number
  width: 100%
</style>
