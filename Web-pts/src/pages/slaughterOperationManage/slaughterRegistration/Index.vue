<!--
 * @Description: 屠宰登记
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-07 15:27:58
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div v-loading="loading">
          <h3 style="color:red">提示：如果有动物要屠宰请务必勾选批次。以下数据展示是批次下有动物。</h3>
          <!-- {{ slaReData }} -->
          <el-tree
            :data="slaReData"
            :props="props"
            node-key="aAnimalId"
            show-checkbox
            :default-expanded-keys="slaReData.length>0?[slaReData[0].aAnimalId]:[]"
            :check-strictly="true"
            @check-change="handleCheckChange"
          />
        </div>
      </el-col>
      <el-col style="border:1px solid #ccc; padding:10px;" :span="12">
        <div>已选择的动物：
          <span v-if="checkedData.length===0">暂无数据</span>
          <br>
          <br>
          <div v-for="item in checkedData" :key="item.bSerialId">
            批次【{{ item.bSerialId }}】下的动物：
            <el-tag v-for="it in item.managerAnimals" :key="it.aAnimalId" style="margin:10px;">{{ it.aAnimalId }}</el-tag>
          </div>
        </div>
        <el-form ref="out_form" :model="form" :rules="rules">
          <el-form-item label="屠宰时间" :label-width="formLabelWidth" prop="recordTime">
            <el-date-picker
              v-model="form.recordTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="屠宰组" :label-width="formLabelWidth" prop="accountId">
            <el-select v-model="form.accountId" placeholder="请选择屠宰组">
              <el-option v-for="item in groupData" :key="item.sgId" :label="item.sgName" :value="item.sgId" />
            </el-select>
          </el-form-item>
        </el-form>

        <div style="text-align:center"><el-button size="medium" type="primary" @click="toSave">屠宰</el-button></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { findByOption, saveOrUpdate } from '@/api/ptsOperational/slaughterRegistration'
import { findAll } from '@/api/ptsBase/slaughteringGroup'
export default {
  data() {
    return {
      props: {
        label: 'aAnimalId',
        children: 'managerAnimals'
      },
      form: {},
      // 已出栏的猪和批次的信息
      slaReData: [],
      // 已选择的已出栏的动物
      checkedData: [],
      // 屠宰组数据
      groupData: [],
      formLabelWidth: '120px',
      rules: {
        accountId: [
          { required: true, message: '请选择屠宰组', trigger: 'change' }
        ],
        recordTime: [
          { type: 'string', required: true, message: '请选择屠宰时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  created() {
    this.loadRecord()
    this.loadGroupData()
  },
  mounted() {},
  methods: {
    /**
     * @description: 加载已屠宰的猪的信息
     * @param {*}
     * @return {*}
     */
    async loadRecord() {
      this.loading = true
      const res = await findByOption()
      res.data.forEach(item => {
        item.aAnimalId = item.bSerialId
        item.checked = false
        item.managerAnimals.forEach(it => { it.checked = false })
      })
      this.slaReData = res.data
      this.loading = false
    },
    /**
     * @description: 加载所有的屠宰组
     * @param {*}
     * @return {*}
     */
    async loadGroupData() {
      const res = await findAll()
      this.groupData = res.data
    },
    /**
     * @description: 屠宰按钮
     * @param {*}
     * @return {*}
     */
    toSave() {
      if (this.checkedData.length === 0) {
        this.$message({ message: '请选择要屠宰的猪', type: 'warning' })
        return
      }
      this.$refs['out_form'].validate(async(valid) => {
        if (valid) {
          const obj = {
            ...this.form,
            animals: this.checkedData.map(item => {
              return {
                ocId: item.bSerialId,
                animalId: item.managerAnimals.map(it => it.aAnimalId)
              }
            })
          }
          const res = await saveOrUpdate(obj)
          this.$message({ message: res.message, type: 'success' })
          this.loadRecord()
          this.checkedData = []
          // this.form = {}
          this.$refs['out_form'].resetFields()
        } else {
          return false
        }
      })
    },

    /**
     * @description: 选择猪
     * @param {*} data
     * @param {*} checked
     * @param {*} indeterminate
     * @return {*}
     */
    handleCheckChange(data, checked, indeterminate) {
      // console.log(JSON.stringify(data), checked, indeterminate)
      data.checked = checked
      const temp = JSON.parse(JSON.stringify(this.slaReData))
      this.checkedData = temp.filter(item => {
        item.managerAnimals = item.managerAnimals.filter(it => it.checked)
        return item.checked
      })
    }
  }
}
</script>
<style scoped>
</style>
