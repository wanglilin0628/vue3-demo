<template>
  <el-row class="collapse-wrapper">
    <el-col :span="24">
      <el-collapse class="collapse-main" v-model="activeNames">
        <el-collapse-item name="search" title="查询区域" class="collapse-item">
          <el-row :gutter="20" class="search-item">
            <!-- 查询区域 -->
            <el-col :span="8">
              <span style="padding-right:30px;">所属部门</span>
              <el-select v-model="data.searchForm.department" placeholder="请选择部门" size="small" clearable @change="departmentChange">
                <el-option v-for="department in departments" :label="department.name" :value="department.id" :key="'department_' + department.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span style="padding-right:30px;">所属团队</span>
              <el-select v-model="data.searchForm.group" placeholder="请选择团队" size="small" clearable>
                <el-option v-for="group in groups" :label="group.name" :value="group.id" :key="'group_' + group.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span style="padding-right:43px;">负责人</span>
              <el-select v-model="data.searchForm.user" placeholder="请选择负责人" size="small" clearable style="width:40%;">
                <el-option v-for="user in users" :label="user.name" :value="user.id" :key="'user_' + user.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="search-item">
            <el-col :span="8">
              <span style="padding-right:56px;">版本</span>
              <el-select v-model="data.searchForm.version" placeholder="请选择版本" size="small" clearable @change="versionChange">
                <el-option v-for="version in versions" :label="version.name" :value="version.id" :key="'version_' + version.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span style="padding-right:30px;">需求条目</span>
              <el-autocomplete
                v-model="data.searchForm.item"
                placeholder="请输入需求条目"
                @change="handleItemChange"
                :fetch-suggestions="queryItem"
                select-when-unmatched="true"
                class="autocomplete-item"
                clearable
                size="small"
              ></el-autocomplete>
            </el-col>
            <el-col :span="8">
              <span style="padding-right:17px;">需求子条目</span>
              <el-autocomplete
                v-model="data.searchForm.subItem"
                placeholder="请输入需求子条目"
                :fetch-suggestions="querySubItem"
                select-when-unmatched="false"
                class="autocomplete-subItem"
                clearable
                size="small"
              ></el-autocomplete>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="search-item">
            <el-col :span="8">
              <span style="padding-right:30px;">开始时间</span>
              <el-date-picker
                v-model="data.searchForm.dateStart"
                type="date"
                placeholder="选择开始时间"
                size="small"
                :disabledDate="disableDate1"
                format="YYYY-MM-DD"
              >
              </el-date-picker>
              <span style="padding-left: 40px;">至</span>
            </el-col>
            <el-col :span="8">
              <span style="padding-right:30px;">结束时间</span>
              <el-date-picker
                v-model="data.searchForm.dateEnd"
                type="date"
                placeholder="选择结束时间"
                size="small"
                :disabledDate="disableDate2"
                format="YYYY-MM-DD"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <span style="padding-right:30px;">任务状态</span>
              <el-select v-model="data.searchForm.status" placeholder="请选择状态" size="small" clearable style="width:40%;">
                <el-option label="未开始" value="0"></el-option>
                <el-option label="进行中" value="1"></el-option>
                <el-option label="已完成" value="2"></el-option>
                <el-option label="已逾期" value="3"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="search-item">
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">
              <el-button type="primary" :loading="waitLoading" size="small" @click="submitForm" icon="el-icon-search">搜索</el-button>
              <el-button type="info" @click="resetForm" size="small" icon="el-icon-refresh-left">重置</el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="operation" title="操作区域" class="collapse-item">
          <el-row :gutter="20" class="operation-item">
            <!-- 操作区域 -->
            <el-col :span="6">操作1</el-col>
            <el-col :span="6">操作2</el-col>
            <el-col :span="6">操作3</el-col>
            <el-col :span="6">操作4</el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item name="result" title="结果区域" class="collapse-item">
          <el-table :data="list">
            <el-table-column label=""></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
  <el-row class="table-wrapper">
    <el-col :span="24">
    </el-col>
  </el-row>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
export default {
  setup() {
    const activeNames = ref(['result'])
    const data = reactive({
      searchForm: {}
    })
    /** 数据查询处理逻辑 */
    const waitLoading = ref(false)
    // 1. 重置
    const resetForm = () => {
      data.searchForm = {}
    }
    // 2. 搜索
    const submitForm = () => {
      waitLoading.value = true
      console.log()
      waitLoading.value = false
    }
    /** 时间选择器处理逻辑 */
    const disableDate1 = (time) => {
      if (data.searchForm.dateEnd) {
        return time.getTime() > data.searchForm.dateEnd.getTime()
      }
    }
    const disableDate2 = (time) => {
      if (data.searchForm.dateStart) {
        return time.getTime() < data.searchForm.dateStart.getTime()
      }
    }
    /** 部门处理逻辑 */
    const departments = ref([
      {id: '1001', name: 'xxx实验室'},
      {id: '1002', name: 'xxx技术部'}
    ])
    /** 团队处理逻辑 */
    const groupList = [
      {id: '100011', name: '开发组1', department: '1001'},
      {id: '100012', name: '开发组2', department: '1001'},
      {id: '100021', name: '开发组3', department: '1002'},
      {id: '100022', name: '开发组4', department: '1002'}
    ]
    const groups = ref([])
    const departmentChange = function(val) {
      // 根据部门筛选团队
      groups.value = groupList.filter((group) => {
        return group.department === val
      })
    }
    /** 负责人处理逻辑 */
    const users = ref([
      {id: '00122xxxx', name: '王立林1'},
      {id: '00122xxxx', name: '王立林2'}
    ])
    /** 版本处理逻辑 */
    const versions = ref([
      {id: '202101', name: '2021年1月版本'},
      {id: '202102', name: '2021年2月版本'}
    ])
    /** 需求条目处理逻辑 */
    let itemList = []
    onMounted(() => {
      itemList = loadAll()
      items.value = itemList
    })
    const loadAll = () => {
      return [
        {id: 'S1001', value: 'S1001', name: '1月版', version: '202101'},
        {id: 'S1002', value: 'S1002', name: '2月版', version: '202102'}
      ]
    }
    const items = ref([])
    /** 根据版本筛选需求条目 */
    const versionChange = (val) => {
      items.value = itemList.filter((item) => {
        return item.version === val
      })
      data.searchForm.item = ''
    }
    /** 需求条目模糊查询逻辑 */
    const queryItem = (queryString, cb) => {
      const results = queryString ? items.value.filter(createFilter(queryString)) : items.value
      cb(results)
    }
    const createFilter = (queryString) => {
      return (item) => {
        return (
          item.id.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }
    /** 需求子条目逻辑 */
    const subItemList = [
      {id: 'SI10001', value: 'SI10001', name: '1月版需求1', item: 'S1001'},
      {id: 'SI10002', value: 'SI10002', name: '1月版需求2', item: 'S1001'},
      {id: 'SI20001', value: 'SI20001', name: '2月版需求1', item: 'S1002'},
      {id: 'SI20002', value: 'SI20002', name: '2月版需求2', item: 'S1002'}
    ]
    const subItems = ref(subItemList)
    // TODO 完善需求条目与需求子条目逻辑
    /** 1. 根据选中的需求条目筛选需求子条目 */
    // const handleItemSelect = (val) => {
    //   console.log(val)
    //   subItems.value = useDataFilter(subItemList, 'item', val.id)
    //   console.log(subItems.value)
    //   data.searchForm.subItem = ''
    // }
    const handleItemChange = (val) => {
      subItems.value = useDataFilter(subItemList, 'item', val)
      data.searchForm.subItem = ''
      console.log(subItems.value)
    }
    /** 2. 需求子条目模糊查询逻辑 */
    const querySubItem = (queryString, cb) => {
      const results = queryString ? subItems.value.filter(createFilter(queryString)) : subItems.value
      cb(results)
    }
    return {
      activeNames,
      data,
      waitLoading,
      resetForm,
      submitForm,
      disableDate1,
      disableDate2,
      departments,
      departmentChange,
      groups,
      users,
      versions,
      versionChange,
      queryItem,
      items,
      handleItemChange,
      subItems,
      querySubItem
    }
  }
}
/**
 * 数据筛选逻辑
 * @param Array arr 原始数组
 * @param String keyName 需要筛选的属性名称
 * @param Any 需要匹配的属性值
 */
function useDataFilter(arr, keyName, val) {
  return arr.filter((item) => {
    return item[keyName] === val
  })
}
</script>

<style lang="scss">
.collapse-wrapper {
  background-color: #FFFFFF;
  .collapse-main {
    padding: 21px;
    .collapse-item {
      .el-collapse-item__header {
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
        padding-left: 12px;
        background-color: transparent!important;
        &:hover {
          color: red;
        }
        .el-collapse-item__arrow {
          margin-left: 12px;
        }
      }
      .search-item {
        padding: 14px 36px;
        align: middle;
      }
    }
  }
}
.table-wrapper {
  background-color: rgb(255, 245, 245);
  padding: 0px 12px;
}
</style>
