<!--
 * @Description: 生猪出栏
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-12 15:45:22
-->

<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div v-loading="loading">
          <h3 style="color:red">提示：如果有动物要出栏请务必勾选批次。以下数据展示是批次下有动物。</h3>
          <!-- {{ outCircleData }} -->
          <el-tree
            :data="outCircleData"
            :props="props"
            node-key="aAnimalId"
            show-checkbox
            :default-expanded-keys="outCircleData.length>0?[outCircleData[0].aAnimalId]:[]"
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
          <el-form-item label="出栏时间" :label-width="formLabelWidth" prop="recordTime">
            <el-date-picker
              v-model="form.recordTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <div v-if="roles.includes('admin')">
            <el-form-item label="角色(养殖人员)" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择角色" @change="loadOutCircleMByRoleId">
                <el-option v-for="item in rolesData" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
            <el-form-item label="出栏人" :label-width="formLabelWidth" prop="accountId">
              <el-select v-model="form.accountId" placeholder="请选择出栏人">
                <el-option v-for="item in outCircleMData" :key="item.accountId" :label="item.username" :value="item.accountId" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>

        <div style="text-align:center"><el-button size="medium" type="primary" @click="toSave">出栏</el-button></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { findByOption, saveOrUpdate } from '@/api/ptsOperational/outCircle'
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
      // 待出栏的猪和批次的信息
      outCircleData: [],
      // 已选择的待出栏的动物
      checkedData: [],
      // 所有角色
      rolesData: [],
      // 所有出栏人员，养殖人员
      outCircleMData: [],
      formLabelWidth: '120px',
      rules: {
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        accountId: [
          { required: true, message: '请选择出栏人', trigger: 'change' }
        ],
        recordTime: [
          { type: 'string', required: true, message: '请选择出栏时间', trigger: 'change' }
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
  },
  mounted() {},
  methods: {
    /**
     * @description: 加载待出栏的猪的信息
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
      this.outCircleData = res.data
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
     * @description: 加载所有的养殖人员角色的人员
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
     * @description: 出栏按钮
     * @param {*}
     * @return {*}
     */
    toSave() {
      if (this.checkedData.length === 0) {
        this.$message({ message: '请选择要出栏的猪', type: 'warning' })
        return
      }
      this.$refs['out_form'].validate(async(valid) => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          if (!this.roles.includes('admin')) {
            this.form.accountId = this.user.accountId
          }
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
          this.loadOutCircle()
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
      const temp = JSON.parse(JSON.stringify(this.outCircleData))
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
