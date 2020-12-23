<template>
  <div class="user-wrapper page-wrapper">
    <div class="user-list-wrapper">
      <el-card>
        <el-table :data="userList">
          <template #empty>
            <div class="no-data">
              <img src="../../assets/icbc.png" :alt="noData" />
              <div class="no-data-text">{{noData}}</div>
            </div>
          </template>
          <el-table-column prop="username" label="用户名" width="140px"></el-table-column>
          <el-table-column prop="name" label="姓名" width="140px"></el-table-column>
          <el-table-column prop="department" label="部门" width="140px"></el-table-column>
          <el-table-column prop="group" label="团队" width="140px"></el-table-column>
          <el-table-column fixed="right" label="操作" width="160px">
            <template #scope>
              <el-button type="text"></el-button>
              <el-button type="text"></el-button>
              <el-button type="text"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>