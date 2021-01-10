<template>
  <div class="dashboard-wrapper">
    <!-- <admin-dashboard></admin-dashboard> -->
    <home-page></home-page>
  </div>
</template>

<script>
// import adminDashboard from '../components/admin_dashboard'
import HomePage from '../components/home_page'
export default {
  name: 'home',
  components: {
    // adminDashboard
    HomePage
  }
}
</script>

<style lang="scss">
.dashboard-wrapper {
  padding: 17px 17px 17px 17px;
  min-height: calc(100% - 96px)!important;
}
</style>
