<template>
  <div class="dashboard-editor-wrapper">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <el-row class="line-chart">
      <line-chart></line-chart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <radar-chart></radar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <scatter-chart></scatter-chart>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" class="transaction-table"></el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from 'vue'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RadarChart from './components/RadarChart'
import PieChart from './components/PieChart'
import ScatterChart from './components/ScatterChart'

export default {
  name: 'adminDashboard',
  components: {
    PanelGroup,
    LineChart,
    RadarChart,
    PieChart,
    ScatterChart
  },
  setup() {
    const { data } = useData()
    const state = reactive({
      lineChartData: {}
    })
    const handleSetLineChartData = (type) => {
      state.lineChartData = data[type]
    }
    return {
      state,
      handleSetLineChartData
    }
  }
}
function useData() {
  const data = reactive({
    VISIT: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    MESSAGE: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    TASK: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    RECORD: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  })
  return {
    data
  }
}
</script>

<style lang="scss">
.dashboard-editor-wrapper {
  padding: 2px;
  background-color: rgb(216, 216, 216);
  position: relative;
  .line-chart {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .transaction-table {
    padding-right: 8px;
    margin-bottom: 30px;
  }
}
</style>
