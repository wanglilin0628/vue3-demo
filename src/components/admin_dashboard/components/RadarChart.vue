<template>
  <div id="radar" style="height:350px;width:100%;"></div>
</template>

<script>
import { init } from 'echarts'
import { onMounted } from 'vue'

export default {
  name: 'LineChart',
  setup() {
    const myCharts = function() {
      const myChart = init(document.getElementById('radar'))
      const option = {
        title: {
          text: '雷达图'
        },
        tooltip: {},
        legend: {
          data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
        // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '销售', max: 6500},
            { name: '管理', max: 16000},
            { name: '信息技术', max: 30000},
            { name: '客服', max: 38000},
            { name: '研发', max: 52000},
            { name: '市场', max: 25000}
          ],
          radius: 80
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算分配（Allocated Budget）'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '实际开销（Actual Spending）'
            }
          ]
        }]
      }

      myChart.setOption(option)
    }
    onMounted(() => {
      myCharts()
    })
  }
}
</script>

<style>

</style>
