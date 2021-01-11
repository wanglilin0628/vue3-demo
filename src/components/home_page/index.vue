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
                @select="handleItemSelect"
                :fetch-suggestions="queryItem"
                :select-when-unmatched="true"
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
                :select-when-unmatched="true"
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
          <el-table :data="currentList(currentPage, pageSize)" class="table-wrapper" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55px;"></el-table-column>
            <el-table-column label="问题类型" prop="type" width="110px;"></el-table-column>
            <el-table-column label="整体管理任务分类" prop="class"></el-table-column>
            <el-table-column label="工作小类" prop="subClass"></el-table-column>
            <el-table-column label="自动化测试类型" prop="testType"></el-table-column>
            <el-table-column label="工作分类(自动化测试用)" prop="workType"></el-table-column>
            <el-table-column label="主题" prop="theme" width="220px;"></el-table-column>
            <el-table-column label="描述" prop="description" width="220px;"></el-table-column>
            <el-table-column label="部门" prop="department" width="110px;"></el-table-column>
            <el-table-column label="团队" prop="group" width="110px;"></el-table-column>
            <el-table-column label="负责小组" prop="team" width="110px;"></el-table-column>
            <el-table-column label="版本计划" prop="version" width="110px;"></el-table-column>
            <el-table-column label="应用简称" prop="app"></el-table-column>
            <el-table-column label="中心项目编号" prop="appCode" width="110px;"></el-table-column>
            <el-table-column label="中心项目名称" prop="appName" width="220px;"></el-table-column>
            <el-table-column label="经办人" prop="operator"></el-table-column>
            <el-table-column label="负责人员" prop="user" fixed></el-table-column>
            <el-table-column label="计划开始时间" prop="timeStart" width="110px;" fixed></el-table-column>
            <el-table-column label="计划完成时间" prop="timeEnd" width="110px;" fixed></el-table-column>
            <el-table-column label="工作量" prop="workload" fixed></el-table-column>
            <el-table-column label="需求项编号" prop="item" width="110px;"></el-table-column>
            <el-table-column label="需求子条目编号" prop="subItem" width="110px"></el-table-column>
          </el-table>
          <el-pagination
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[5, 10, 15]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
          <el-table :data="selectedData" v-show="false">
            <el-table-column type="selection" width="55px;"></el-table-column>
            <el-table-column label="问题类型" prop="type" width="110px;"></el-table-column>
            <el-table-column label="整体管理任务分类" prop="class"></el-table-column>
            <el-table-column label="工作小类" prop="subClass"></el-table-column>
            <el-table-column label="自动化测试类型" prop="testType"></el-table-column>
            <el-table-column label="工作分类(自动化测试用)" prop="workType"></el-table-column>
            <el-table-column label="主题" prop="theme" width="220px;"></el-table-column>
            <el-table-column label="描述" prop="description" width="220px;"></el-table-column>
            <el-table-column label="部门" prop="department" width="110px;"></el-table-column>
            <el-table-column label="团队" prop="group" width="110px;"></el-table-column>
            <el-table-column label="负责小组" prop="team" width="110px;"></el-table-column>
            <el-table-column label="版本计划" prop="version" width="110px;"></el-table-column>
            <el-table-column label="应用简称" prop="app"></el-table-column>
            <el-table-column label="中心项目编号" prop="appCode" width="110px;"></el-table-column>
            <el-table-column label="中心项目名称" prop="appName" width="220px;"></el-table-column>
            <el-table-column label="经办人" prop="operator"></el-table-column>
            <el-table-column label="负责人员" prop="user"></el-table-column>
            <el-table-column label="计划开始时间" prop="timeStart" width="110px;"></el-table-column>
            <el-table-column label="计划完成时间" prop="timeEnd" width="110px;"></el-table-column>
            <el-table-column label="工作量" prop="workload"></el-table-column>
            <el-table-column label="需求项编号" prop="item" width="110px;"></el-table-column>
            <el-table-column label="需求子条目编号" prop="subItem" width="110px"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
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
    /** 1. 根据选中的需求条目筛选需求子条目 */
    const handleItemSelect = (val) => {
      // console.log('select:', val)
      subItems.value = useDataFilter(subItemList, 'item', val.id)
      data.searchForm.subItem = ''
    }
    const handleItemChange = (val) => {
      // console.log('change:', val)
      subItems.value = useDataFilter(subItemList, 'item', val)
      data.searchForm.subItem = ''
    }
    /** 2. 需求子条目模糊查询逻辑 */
    const querySubItem = (queryString, cb) => {
      const results = queryString ? subItems.value.filter(createFilter(queryString)) : subItems.value
      cb(results)
    }
    /** 表格数据 */
    const dataList = ref([
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''},
      {id: '100001', type: '整体管理任务', class: '问题修改', subClass: '问题修改', testType: '不涉及', workType: '不涉及', theme: 'vue3-demo', description: '描述1', department: 'xxx实验室', group: 'xxx团队', team: 'xxx团队', version: '2021年1月版', app: 'F-CTP', appCode: 'S100001', appName: 'xxx应用', operator: '王立林', user: '王立林', timeStart: '2021/01/11', timeEnd: '2021/01/12', workload: '1', item: 'S1002', subItem: 'S10101', module: ''}
    ])
    /** 分页数据 */
    const total = computed(() => dataList.value.length)
    const currentPage = ref(1)
    const pageSize = ref(5)
    /** 在挂载前获取数据 */
    const handleSizeChange = function(val) {
      pageSize.value = val
      currentPage.value = 1
    }
    const handleCurrentChange = function(val) {
      currentPage.value = val
    }
    const currentList = function(currentPage, pageSize) {
      return dataList.value.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    }
    /** 选中的数据 */
    const selectedData = ref([])
    const handleSelectionChange = (val) => {
      // console.log(val[0])
      for (let i = 0; i < val.length; i++) {
        // selectedData.value[i] = val[i]
      }
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
      handleItemSelect,
      subItems,
      querySubItem,
      dataList,
      total,
      currentList,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      pageSize,
      handleSelectionChange,
      selectedData
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
/**
 * 将数据导出为excel
 * @param Array data 原始数据
 * @param String path 保存路径
 *
*/
// function exportData(data, path) {

// }
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
      .table-wrapper {
        font-size: 12px;
      }
      .search-item {
        padding: 14px 36px;
      }
    }
  }
}
.table-wrapper {
  background-color: rgb(255, 245, 245);
  padding: 0px 12px;
}
.el-table th.gutter {
  display: table-cell!important;
}
</style>
