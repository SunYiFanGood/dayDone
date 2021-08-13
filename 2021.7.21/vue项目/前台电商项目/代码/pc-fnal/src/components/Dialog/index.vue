<template>
  <div class="dialog-wrapper" v-show="visible" @click="close">
    <!-- 
      @click.stop 
      阻止事件冒泡，防止触发父元素的点击事件 
    -->
    <div class="dialog" :style="{ width }" @click.stop>
      <div class="dialog-header">
        <span class="dialog-header-title">{{ title }}</span>
        <button class="dialog-header-close" @click="close">X</button>
      </div>
      <div class="dialog-body">
        <!-- 显示默认插槽数据 -->
        <slot />
      </div>
      <div class="dialog-footer">
        <!-- 显示footer命名插槽数据 -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    // 头部标题
    title: {
      type: String,
      default: "",
    },
    // 宽度
    width: {
      type: String,
      default: "50%",
    },
    // 显示&隐藏
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      // 使用.sync更新数据
      this.$emit("update:visible", false);
    },
  },
  watch: {
    visible: {
      handler(visible) {
        if (visible) {
          // 此时dialog是显示，禁用滚动条
          // 直接干掉滚动条
          document.documentElement.style.overflow = "hidden";
          return;
        }
        // 启动滚动条
        document.documentElement.style.overflow = "auto";
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    // 启动滚动条
    document.documentElement.style.overflow = "auto";
  },
};
</script>

<style lang="less" scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 2009;
  background-color: rgba(0, 0, 0, 0.3);
}
.dialog {
  position: relative;
  margin: 15vh auto 50px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
}
.dialog-header {
  padding: 20px 20px 10px;
  font-size: 20px;
}
.dialog-header-close {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #909399;
}
.dialog-body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.dialog-footer {
  padding: 10px 20px 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>