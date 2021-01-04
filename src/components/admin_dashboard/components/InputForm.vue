<template>
  <el-form ref="form" :model="formData" label-width="s80px">
    <el-form-item label="姓名" class="input-form-item">
      <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别" class="input-form-item">
      <el-radio label="1" v-model="formData.sex">男</el-radio>
      <el-radio label="0" v-model="formData.sex">女</el-radio>
    </el-form-item>
    <el-form-item label="籍贯" class="input-select-item">
      <!-- <el-cascader :options="pcaData" v-model="formData.origin"></el-cascader> -->
      <el-select v-model="formData.province" placeholder="请选择所在省份" @change="handleProvinceChange">
        <el-option v-for="(item, i) in province" :label="item.name" :value="i" :key="i"></el-option>
      </el-select>
      <el-select v-if="hasCityData" v-model="formData.city" placeholder="请选择所在市" @change="handleCityChange">
        <el-option v-for="(item, i) in city" :label="item.name" :value="i" :key="i"></el-option>
      </el-select>
      <el-select v-if="hasCountyData" v-model="formData.county" placeholder="请选择所在县">
        <el-option v-for="(item, i) in county" :label="item.name" :value="i" :key="i"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主题颜色" class="input-form-item">
      <el-color-picker v-model="formData.color"></el-color-picker>
    </el-form-item>
    <el-form-item label="s公司员工" class="input-form-item">
      <el-switch v-model="formData.isStaff"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue'
import pca from '../../../../public/data/pca-code.json'
export default {
  setup() {
    // console.log(pca.province)
    const formData = reactive({})
    const province = ref(pca.province)
    const city = ref([])
    const hasCityData = ref(false)
    const handleProvinceChange = function(value) {
      city.value = province.value[value].children
      formData.city = ''
      formData.county = ''
      if (city.value && city.value.length > 0) {
        hasCityData.value = true
      }
    }
    const county = ref([])
    const hasCountyData = ref(false)
    const handleCityChange = function(value) {
      county.value = city.value[value].children
      formData.county = ''
      if (county.value && county.value.length > 0) {
        hasCountyData.value = true
      }
    }
    return {
      formData,
      province,
      city,
      handleProvinceChange,
      hasCityData,
      hasCountyData,
      handleCityChange,
      county
    }
  }
}
</script>

<style lang='scss'>
.input-form-item {
  padding-top: 15px;
  width: 50%;
}
.input-select-item {
  padding-top: 10px;
  width: 100%;
  .el-select {
    width: 30%;
    padding-left: 5px;
  }
}
</style>
