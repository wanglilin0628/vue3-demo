<template>
  <el-table :data="list" style="width:100%;padding-top:15px;">
    <el-table-column label="Order_No" min-width="200">
      <template #default={row}>
        {{ row.no }}
      </template>
    </el-table-column>
    <el-table-colunm label="Price" width="195" align="center">
      <template #default={row}>
        {{ row.price }}
      </template>
    </el-table-colunm>
    <el-table-column label="Status" width="100" align="center">
      <template #default={row}>
        <el-tag :type="row.status"></el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

}
</script>

<style>

</style>
