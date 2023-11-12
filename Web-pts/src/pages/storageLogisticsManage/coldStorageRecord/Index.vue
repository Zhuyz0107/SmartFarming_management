<!--
 * @Description: 入库登记
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-13 16:50:49
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div v-loading="loading">
          <h3 style="color:red">提示：如果有动物要入库可不勾选批次，也可通过批次勾选该批次下的所有动物。以下数据展示是批次下的动物。</h3>
          <!-- {{ coldAnimalData }} -->
          <el-tree
            :data="coldAnimalData"
            :props="props"
            node-key="aAnimalId"
            show-checkbox
            :default-expanded-keys="coldAnimalData.length>0?[coldAnimalData[0].aAnimalId]:[]"
            @check-change="handleCheckChange"
          />
        </div>
      </el-col>
      <el-col style="border:1px solid #ccc; padding:10px;" :span="12">
        <div>已选择的动物：
          <span v-if="checkedData.length===0">暂无数据</span>
          <br>
          <br>
          <el-tag v-for="it in checkedData" :key="it.aAnimalId" style="margin:10px;">{{ it.aAnimalId }}</el-tag>
        </div>
        <el-form ref="cold_form" :model="form" :rules="rules">
          <el-form-item label="入库时间" :label-width="formLabelWidth" prop="recordTime">
            <el-date-picker
              v-model="form.recordTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="冷库" :label-width="formLabelWidth" prop="fzId">
            <el-select v-model="form.fzId" placeholder="请选择冷库">
              <el-option v-for="item in freezerData" :key="item.fzId" :label="item.fzName+'-'+item.fzId" :value="item.fzId" />
            </el-select>
          </el-form-item>
          <div v-if="roles.includes('admin')">
            <el-form-item label="角色(冷库人员)" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择角色" @change="loadOutCircleMByRoleId">
                <el-option v-for="item in rolesData" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
            <el-form-item label="入库人" :label-width="formLabelWidth" prop="accountId">
              <el-select v-model="form.accountId" placeholder="请选择入库人">
                <el-option v-for="item in outCircleMData" :key="item.accountId" :label="item.username" :value="item.accountId" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>

        <div style="text-align:center"><el-button size="medium" type="primary" @click="toSave">入库</el-button></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { findByOption, saveOrUpdate } from '@/api/ptsOperational/coldStorageRecord'
import { findAll as findAllFreezer } from '@/api/ptsBase/freezer'
import { findAll as findAllRoles } from '@/api/base/role'
import { findByRole } from '@/api/base/account'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      props: {
        label: 'aAnimalId',
        children: 'managerAnimals'
      },
      count: 1,
      form: {
        accountId: ''
      },
      // 待入库的猪和批次的信息
      coldAnimalData: [],
      // 已选择的待入库的动物
      checkedData: [],
      // 所有角色
      rolesData: [],
      // 所有入库人员，冷库人员
      outCircleMData: [],
      // 所有冷库
      freezerData: [],
      formLabelWidth: '120px',
      rules: {
        fzId: [
          { required: true, message: '请选择冷库', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        accountId: [
          { required: true, message: '请选择入库人', trigger: 'change' }
        ],
        recordTime: [
          { type: 'string', required: true, message: '请选择入库时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['roles', 'user'])
  },
  created() {
    this.loadOutCircle()
    this.loadAllRoles()
    this.loadFreezer()
  },
  mounted() {},
  methods: {
    /**
     * @description: 查找所有的冷库的数据
     * @param {*}
     * @return {*}
     */
    async loadFreezer() {
      const res = await findAllFreezer()
      this.freezerData = res.data
    },

    /**
     * @description: 加载待入库的猪的信息
     * @param {*}
     * @return {*}
     */
    async loadOutCircle() {
      this.loading = true
      const res = await findByOption()
      res.data.forEach(item => {
        item.aAnimalId = item.bSerialId
        item.checked = false
        item.managerAnimals.forEach(it => { it.checked = false })
      })
      this.coldAnimalData = res.data
      this.loading = false
    },
    /**
     * @description: 加载所有的角色信息
     * @param {*}
     * @return {*}
     */
    async loadAllRoles() {
      const res = await findAllRoles()
      this.rolesData = res.data
    },
    /**
     * @description: 加载所有的冷库人员角色的人员
     * @param {*}
     * @return {*}
     */
    async loadOutCircleMByRoleId(roleId) {
      const res = await findByRole(roleId || this.form.roleId)
      this.outCircleMData = res.data
      if (this.outCircleMData.length > 0) {
        this.form.accountId = this.outCircleMData[0].accountId
      }
    },
    /**
     * @description: 入库按钮
     * @param {*}
     * @return {*}
     */
    toSave() {
      if (this.checkedData.length === 0) {
        this.$message({ message: '请选择要入库的动物', type: 'warning' })
        return
      }
      this.$refs['cold_form'].validate(async(valid) => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          if (!this.roles.includes('admin')) {
            this.form.accountId = this.user.accountId
          }
          const obj = {
            ...this.form,
            animals: [{
              animalId: this.checkedData.map(item => item.aAnimalId),
              ocId: this.form.fzId
            }]
          }
          const res = await saveOrUpdate(obj)
          this.$message({ message: res.message, type: 'success' })
          this.loadOutCircle()
          this.checkedData = []
          this.form = {
            accountId: ''
          }
          this.$refs['cold_form'].resetFields()
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
      const temp = JSON.parse(JSON.stringify(this.coldAnimalData))
      /* this.checkedData = temp.filter(item => {
        item.managerAnimals = item.managerAnimals.filter(it => it.checked)
        return item.checked
      }) */
      this.checkedData = []
      temp.forEach(item => {
        this.checkedData = this.checkedData.concat(item.managerAnimals.filter(it => it.checked))
      })
    }
  }
}
</script>
<style scoped>
</style>
