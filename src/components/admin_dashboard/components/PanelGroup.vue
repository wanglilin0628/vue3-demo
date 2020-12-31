<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('VISIT')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-user card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Visitors</div>
          <count-to :start-val="0" :end-val="102400" :duraction="2600" class="card-panel-num"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('MESSAGE')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-message card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Messages</div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('TASK')">
        <div class="card-panel-icon-wrapper icon-task">
          <i class="el-icon-s-order card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Task</div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('RECORD')">
        <div class="card-panel-icon-wrapper icon-record">
          <i class="el-icon-s-data card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Record</div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from '../../vue_count/vue-countTo.vue'
export default {
  components: {
    CountTo
  },
  setup(props, { emit }) {
    const handleSetLineChartData = function(type) {
      emit('handleSetLineChartData', type)
    }
    return {
      handleSetLineChartData
    }
  }
}
</script>

<style lang='scss'>
.panel-group {
  margin: 12px 0 0 0;
  .card-panel-col {
    margin-bottom: 12px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #ffffff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-task {
        background: #f4516c;
      }
      .icon-record {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-task {
      color: #f4516c;
    }
    .icon-record {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, .45);
        font-size: 16px;
        margin-bottom: 12px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none!important;
    width: 100%;
    height: 100%;
    margin: 0!important;
    .card-panel-icon {
      display: block;
      margin: 14px auto !important;
      float: none!important;
    }
  }
}
</style>
