<template>
  <div class="dashboard-wrapper">
    <admin-dashboard></admin-dashboard>
  </div>
</template>

<script>
import adminDashboard from '../components/admin_dashboard'
export default {
  name: 'home',
  components: {
    adminDashboard
  }
}
</script>

<style lang="scss">
.dashboard-wrapper {
  padding: 17px 17px 17px 17px;
  min-height: calc(100% - 96px)!important;
}
</style>
