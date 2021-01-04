<template>
  <!-- <div></div> -->
  <el-table :data="list">
    <el-table-column label="Order_No">
      <template #default={row}>
        {{row.no}}
      </template>
    </el-table-column>
    <el-table-column label="Order_Price">
      <template #default={row}>
        {{row.price}}
      </template>
    </el-table-column> -->
    <el-table-column label="Order_Status">
      <template #default={row}>
        <el-tag :type="row.status.type">
          {{row.status.text}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  setup() {
    const list = ref([
      {no: '1001', price: '2000.00', status: {type: 'success', text: '成功'}},
      {no: '1002', price: '2021.00', status: {type: 'danger', text: '失败'}},
      {no: '1003', price: '2032.92', status: {type: 'warning', text: '异常'}},
      // {no: '1005', price: '2032.23', status: {type: 'success', text: '成功'}},
      // {no: '1006', price: '2030.23', status: {type: 'success', text: '成功'}},
      // {no: '1007', price: '2031.23', status: {type: 'success', text: '成功'}},
      // {no: '1008', price: '2033.23', status: {type: 'success', text: '成功'}},
      // {no: '1009', price: '2034.23', status: {type: 'success', text: '成功'}},
      // {no: '1010', price: '2035.23', status: {type: 'success', text: '成功'}},
      {no: '1011', price: '2036.23', status: {type: 'success', text: '成功'}},
      {no: '1012', price: '2037.23', status: {type: 'success', text: '成功'}},
      {no: '1013', price: '2039.23', status: {type: 'success', text: '成功'}},
      {no: '1014', price: '2038.23', status: {type: 'success', text: '成功'}}
    ])
    const total = computed(() => list.value.length)
    const currentPage = ref(1)
    const pageSize = ref(5)
    const handleSizeChange = (val) => {
      pageSize.value = val
      currentPage.value = 1
    }
    const handleCurrentChange = (val) => {
      currentPage.value = val
    }
    return {
      list,
      total,
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style>

</style>
