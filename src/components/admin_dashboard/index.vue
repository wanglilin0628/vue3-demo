<template>
  <div class="dashboard-editor-wrapper">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
export default {
  name: 'adminDashboard',
  components: {
    PanelGroup
  },
  setup() {}
}
</script>

<style lang="scss">
.dashboard-editor-wrapper {
  padding: 2px;
  background-color: rgb(216, 216, 216);
  position: relative;
}
</style>
