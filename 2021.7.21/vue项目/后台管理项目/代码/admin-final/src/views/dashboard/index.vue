<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <LineChart />
    <el-row>
      <el-col :lg="12" :md="24">
        <BarChart />
      </el-col>
      <el-col :lg="12" :md="24">
        <PieChart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  components: {
    LineChart,
    BarChart,
    PieChart
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
