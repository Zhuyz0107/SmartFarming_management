<!--
 * @Description: 饲料更换
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 21:27:27
-->
<template>
  <div>
    <!-- {{ authsButton }} -->
    <!-- 表格和分页 -->
    <div class="btns">
      <el-form :inline="true" size="small">
        <el-button
          v-if="
            authsButton.filter((item) => {
              return item.perms===perms.saveOrUpdate;
            }).length > 0
          "
          type="primary"
          size="small"
          @click="toAdd"
        >添加</el-button>
        <!--  -->
        <el-button
          v-if="
            authsButton.filter((item) => {
              return item.perms===perms.deleteAll;
            }).length > 0
          "
          type="danger"
          size="small"
          style="margin-right: 10px"
          @click="toBatchDelete"
        >批量删除</el-button>
        <el-form-item>
          <el-input
            v-model="param.frBatchId"
            placeholder="请输入批次编号"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.feedName"
            placeholder="请输入饲料名称"
            clearable
          />
        </el-form-item>
        <el-button type="text" size="mini" @click="loadRecord(1)">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="recordListData.list"
      size="small"
      @selection-change="handleSelectionChange"
    >

      <el-table-column
        type="selection"
        width="55"
        align="center"
        fixed
      />
      <el-table-column fixed align="center" type="index" :index="1" label="序号" />
      <el-table-column
        prop="frBatchId"
        label="批次编号"
        width="260"
      />
      <el-table-column
        prop="managerFeed.fName"
        label="饲料名称"
        width="160"
      />
      <el-table-column
        prop="frReason"
        label="更换原因"
      />
      <el-table-column
        prop="frTime"
        label="更换时间"
        width="160"
      />

      <el-table-column
        label="更换人员"
        width="120"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>更换人员编号: {{ scope.row.baseAccount.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.baseAccount.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms===perms.delete;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.frId)"
          >移除</el-button>
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms === perms.saveOrUpdate;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toEdit(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <!-- :hide-on-single-page="true" -->
      <el-pagination
        background
        layout="total,prev, pager, next,sizes"
        small
        :total="recordListData.total"
        :page-size="param.pageSize"
        :current-page="param.page"
        :page-sizes="[2,10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->

    <!-- 抽屉 添加和修改饲料更换信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="feedRecord_form" :model="form" :rules="rules">
          <el-form-item label="批次编号" :label-width="formLabelWidth" prop="frBatchId">
            <el-select v-model="form.frBatchId" :disabled="title==='修改饲料更换信息'" placeholder="请选择批次">
              <el-option v-for="item in batchData" :key="item.bSerialId" :label="item.bSerialId" :value="item.bSerialId" />
            </el-select>
          </el-form-item>
          <el-form-item label="饲料名称" :label-width="formLabelWidth" prop="frFeedId">
            <el-select v-model="form.frFeedId" placeholder="请选择饲料">
              <el-option v-for="item in feedData" :key="item.fId" :label="item.fName" :value="item.fId" />
            </el-select>
          </el-form-item>

          <el-form-item label="更换时间" :label-width="formLabelWidth" prop="frTime">
            <el-date-picker
              v-model="form.frTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <div v-if="roles.includes('admin')">
            <el-form-item label="角色(养殖人员)" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择角色" @change="loadRecordMByRoleId">
                <el-option v-for="item in rolesData" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
            <el-form-item label="饲料更换人员" :label-width="formLabelWidth" prop="frUbreedId">
              <el-select v-model="form.frUbreedId" placeholder="请选择饲料更换人员">
                <el-option v-for="item in recordMDataAll" :key="item.accountId" :label="item.username" :value="item.accountId" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="更换原因" :label-width="formLabelWidth" prop="frReason">
            <el-input
              v-model="form.frReason"
              type="textarea"
              :rows="2"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange(false)">取 消</el-button>
        <el-button type="primary" size="small" @click="toSave">确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
  </div>
</template>
<script>
import { findByOption, saveOrUpdate, delById, deleteByIdAll } from '@/api/ptsOperational/feedRecord'
import { findAll as findAllBatch } from '@/api/ptsBase/batch'
import { findAll as findAllFeed } from '@/api/ptsBase/feed'
import { findAll as findAllRoles } from '@/api/base/role'
import { findByRole } from '@/api/base/account'
import { mapGetters } from 'vuex'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.feedRecord,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 饲料更换数据
      recordListData: [],
      // 所有饲料更换现有检测人员数据
      recordMData: [],
      // 所有批次数据
      batchData: [],
      // 所有饲料数据
      feedData: [],
      // 所有角色数据
      rolesData: [],
      // 所有的饲料更换管理人员
      recordMDataAll: [],
      // 新增和修改模态框
      visible: false,
      // 标题
      title: '添加饲料更换信息',
      // 新增和修改饲料更换的数据
      form: { frUbreedId: '' },
      // 表单标签宽度
      formLabelWidth: '140px',
      // 批量删除的数据
      ids: [],
      // 搜索的数据
      param: {
        page: 1,
        pageSize: 10,
        times: []
      },
      rules: {
        frBatchId: [
          { required: true, message: '请选择批次', trigger: 'change' }
        ],
        frFeedId: [
          { required: true, message: '请选择饲料', trigger: 'change' }
        ],
        frTime: [
          { type: 'string', required: true, message: '请选择更换时间', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        frUbreedId: [
          { required: true, message: '请选择饲料更换人员', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['roles', 'user'])
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    // 加载数据
    this.loadRecord()
  },
  methods: {
    /**
     * @description: 加载饲料更换信息
     * @param {*}
     * @return {*}
     */
    async loadRecord(page) {
      if (page) {
        this.param.page = page
      }
      this.loading = true
      const res = await findByOption(this.param)
      this.recordListData = res.data
      this.loading = false
    },
    /**
     * @description: 加载所有的批次信息
     * @param {*}
     * @return {*}
     */
    async loadAllBatch() {
      const res = await findAllBatch()
      this.batchData = res.data
    },
    /**
     * @description: 加载所有的饲料信息
     * @param {*}
     * @return {*}
     */
    async loadAllFeed() {
      const res = await findAllFeed()
      this.feedData = res.data
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
     * @description: 加载所有的饲料更换人员角色的人员
     * @param {*}
     * @return {*}
     */
    async loadRecordMByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId)
      this.recordMDataAll = res.data
      if (this.recordMDataAll.length > 0) {
        this.form.frUbreedId = accountId || this.recordMDataAll[0].accountId
      }
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.loadAllBatch()
      this.loadAllFeed()
      this.loadAllRoles()
      this.form = { frUbreedId: '' }
      this.title = '添加饲料更换信息'
      this.visible = true
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.loadAllBatch()
      this.loadAllFeed()
      this.loadAllRoles()
      this.loadRecordMByRoleId(record.baseAccount.baseRole.roleId, record.baseAccount.accountId)
      this.form = {
        frBatchId: record.frBatchId,
        frFeedId: record.frFeedId,
        frId: record.frId,
        frReason: record.frReason,
        frTime: record.frTime,
        roleId: record.baseAccount.baseRole.roleId,
        frUbreedId: record.frUbreedId
      }
      this.title = '修改饲料更换信息'
      this.visible = true
    },
    /**
     * @description: 保存饲料更换信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['feedRecord_form'].validate(async(valid) => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          if (!this.roles.includes('admin')) {
            this.form.frUbreedId = this.user.accountId
          }
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          if (this.title === '添加饲料更换信息') {
            // 处理分页bug
            this.loadRecord(1)
          } else {
            this.loadRecord()
          }
        } else {
          return false
        }
      })
    },
    /**
     * @description: 删除饲料更换
     * @param {*} id 账户id
     * @return {*}
     */
    toDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delById(id)
        this.$message({ type: 'success', message: res.message })
        this.loadRecord()
      })
    },
    /**
     * @description: 批量删除饲料更换
     * @param {*}
     * @return {*}
     */
    toBatchDelete() {
      if (this.ids.length > 0) {
        this.$confirm('此操作将批量删除选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await deleteByIdAll(this.ids)
          this.$message({ type: 'success', message: res.message })
          this.loadRecord()
        })
      } else {
        this.$message({ type: 'warning', message: '请选择要批量删除的数据' })
      }
    },
    /**
     * @description: 当前页发生改变
     * @param {*} page
     * @return {*}
     */
    currentChangeHandler(page) {
      this.param.page = page
      this.loadRecord()
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.page = 1
      this.param.pageSize = pageSize
      this.loadRecord()
    },
    /**
     * @description: 表格多选切换
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.ids = val.map(item => item.frId)
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['feedRecord_form'].resetFields()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
