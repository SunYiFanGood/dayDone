<template>
  <el-card class="card">
    <div class="line-chart" ref="line"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/mixins/resize'

export default {
  name: 'LineChart',
  data() {
    return {
      options: {
        // 标题
        // title: {
        //   // 标题文本
        //   text: '折线图堆叠'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: 'blue'
            },
            lineStyle: {
              color: 'blue'
            },
            crossStyle: {
              color: 'blue'
            }
          }
        },
        legend: {
          data: ['预期', '实际']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // 右上角，保存图片
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            lineStyle: {
              color: 'blue'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '销售金额(万元)', // y轴坐标名称
          axisLine: {
            lineStyle: {
              color: 'blue'
            }
          }
        },
        series: [
          {
            name: '预期',
            type: 'line',
            // stack: '总量',
            data: [120, 222, 101, 134, 90, 230, 210],
            smooth: true, // 曲线
            // lineStyle: {
            //   color: 'red'
            // },
            itemStyle: {
              color: 'red'
            },
            areaStyle: {
              color: 'pink',
              opacity: 0.5
            }
          },
          {
            name: '实际',
            type: 'line',
            // stack: '总量',
            data: [110, 162, 111, 124, 70, 290, 110],
            smooth: true,

            itemStyle: {
              color: 'blue'
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.line)
    this.myEcharts.setOption(this.options)
  },
  // 混合resize代码到组件中
  // 将resize代码合并到组件中（组件代码和resize代码都会保留）
  mixins: [resize]
}
</script>

<style lang="sass" scoped>
.line-chart
  width: 100%
  height: 400px
</style>
