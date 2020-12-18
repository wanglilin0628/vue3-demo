<template>
  <div class="main-detail-wrap page-wrapper">
    <div class="main-detail-title">
      <h3>Vue3-demo</h3>
    </div>
    <div class="main-detail-content">
      <p>Vue3 One Piece</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.main-detail-wrap {
  padding: 28px 0 32px 0;
  min-height: calc(100% - 124px)!important;
  .main-detail-title {
    text-align: center;
    padding-bottom: 10px;
    h3 {
      font-size: 24px;
      color: #333333;
      margin: 0px;
      font-weight: normal;
    }
  }
  .main-detail-content {
    p {
      font-size: 14px;
      color: #333333;
      line-height: 24px;
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
