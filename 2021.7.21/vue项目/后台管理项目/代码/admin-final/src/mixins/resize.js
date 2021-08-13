// import debounce from 'lodash/debounce'

// 复用的代码
export default {
  // 和vue组件实例对象一样定义内容 data computed methods mounted...
  // 代码最终会合并到某个组件中
  mounted() {
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    // 防抖处理
    resize: function() {
      this.myEcharts.resize() // 重新调整图表大小
    }
  }
}
