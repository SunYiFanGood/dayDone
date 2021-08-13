<template>
  <el-card class="card">
    <div class="bar-chart" ref="bar"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import resize from '@/mixins/resize'

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  BarChart,
  CanvasRenderer
])

export default {
  name: 'BarChart',
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '广告',
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ],
        color: ['#ff4d4f', '#40a9ff', '#73d13d']
      }
    }
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.bar)
    this.myEcharts.setOption(this.options)
  },
  mixins: [resize]
}
</script>

<style lang="sass" scoped>
.bar-chart
  width: 100%
  height: 400px
</style>
