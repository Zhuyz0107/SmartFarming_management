<!--
 * @Description: 出单记录
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 21:34:34
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

        <!-- 销售人员 -->
        <el-form-item v-if="roles.includes('admin')">
          <el-select v-model="param.isrSaleId" clearable placeholder="销售人员">
            <el-option v-for="item in recordMData" :key="item.accountId" :label="item.username" :value="item.accountId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.isrStatus" clearable placeholder="状态">
            <el-option label="申请中" value="申请中" />
            <el-option label="已出库" value="已出库" />
            <el-option label="已完成" value="已完成" />
          </el-select>
        </el-form-item>
        <div style="margin-top:10px;" />
        <!-- 出单时间 -->
        <el-form-item>
          <el-date-picker
            v-model="param.times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="出单开始日期"
            end-placeholder="出单结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <!-- 交付时间 -->
        <el-form-item>
          <el-date-picker
            v-model="param.times2"
            type="datetimerange"
            range-separator="至"
            start-placeholder="交付开始日期"
            end-placeholder="交付结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
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
        prop="isrId"
        label="订单编号"
        width="140"
        fixed
      />

      <el-table-column
        prop="managerCustomer.cCompany"
        label="客户名称"
        width="160"
      />

      <el-table-column
        label="销售人员"
        width="120"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>销售人员编号: {{ scope.row.account.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.account.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="isrNum"
        label="购买数量"
      >
        <template slot-scope="scope">
          {{ scope.row.isrNum }} 头
        </template>
      </el-table-column>

      <el-table-column
        prop="isrPrice"
        label="购买单价"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.isrPrice }} 元/斤
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="isrStatus"
      />
      <el-table-column
        prop="isrTime"
        label="出单时间"
        width="160"
      />
      <el-table-column
        prop="isrDeliver"
        label="预计交付时间"
        width="160"
      />
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms===perms.delete;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.isrId)"
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
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms === perms.finish;
              }).length > 0
            "
            type="text"
            size="mini"
            :disabled="scope.row.isrStatus!=='已出库'"
            @click.prevent="toFinish(scope.row.isrId)"
          >完成</el-button>
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

    <!-- 抽屉 添加和修改出单记录信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="isr_record_form" :model="form" :rules="rules">
          <el-form-item label="购买客户" :label-width="formLabelWidth" prop="isrCustomerId">
            <el-select v-model="form.isrCustomerId" placeholder="请选择客户">
              <el-option v-for="item in customerData" :key="item.cId" :label="item.cCompany" :value="item.cId" />
            </el-select>
          </el-form-item>
          <el-form-item label="购买数量(头)" :label-width="formLabelWidth" prop="isrNum">
            <el-input
              v-model.number="form.isrNum"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="购买单价(元)" :label-width="formLabelWidth" prop="isrPrice">
            <el-input
              v-model.number="form.isrPrice"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="出单时间" :label-width="formLabelWidth" prop="isrTime">
            <el-date-picker
              v-model="form.isrTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="预计交付时间" :label-width="formLabelWidth" prop="isrDeliver">
            <el-date-picker
              v-model="form.isrDeliver"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <div v-if="roles.includes('admin')">
            <el-form-item label="角色(销售人员)" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择角色" @change="loadRecordMByRoleId">
                <el-option v-for="item in rolesData" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
            <el-form-item label="出单销售人员" :label-width="formLabelWidth" prop="isrSaleId">
              <el-select v-model="form.isrSaleId" placeholder="请选择出单销售人员">
                <el-option v-for="item in recordMDataAll" :key="item.accountId" :label="item.username" :value="item.accountId" />
              </el-select>
            </el-form-item>
          </div>
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
import { findByOption, saveOrUpdate, delById, deleteByIdAll, findAllRecordAccount, updateStatusById } from '@/api/ptsOperational/issueRecord'
import { queryAll as findAllCustomer } from '@/api/ptsBase/customer'
import { findAll as findAllRoles } from '@/api/base/role'
import { findByRole } from '@/api/base/account'
import { mapGetters } from 'vuex'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.issueRecord,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 出单记录数据
      recordListData: [],
      // 所有出单记录现有销售人员数据
      recordMData: [],
      // 所有角色数据
      rolesData: [],
      // 所有的出单记录管理人员
      recordMDataAll: [],
      // 所有客户数据
      customerData: [],
      // 新增和修改模态框
      visible: false,
      // 标题
      title: '添加出单记录信息',
      // 新增和修改出单记录的数据
      form: {
        isrSaleId: ''
      },
      // 表单标签宽度
      formLabelWidth: '140px',
      // 批量删除的数据
      ids: [],
      // 搜索的数据
      param: {
        page: 1,
        pageSize: 10,
        times: [],
        times2: []
      },
      rules: {
        isrCustomerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        isrNum: [
          { required: true, message: '请输入购买数量', trigger: 'blur' },
          { type: 'number', message: '购买数量要求为数值', trigger: 'blur' }
        ],

        isrPrice: [
          { required: true, message: '请输入购买单价', trigger: 'blur' },
          { type: 'number', message: '购买单价要求为数值', trigger: 'blur' }
        ],
        isrTime: [
          { type: 'string', required: true, message: '请选择出单时间', trigger: 'change' }
        ],
        isrDeliver: [
          { type: 'string', required: true, message: '请选择预计交付时间', trigger: 'change' }
        ],

        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        isrSaleId: [
          { required: true, message: '请选择出单销售人员', trigger: 'change' }
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
     * @description: 加载出单记录信息
     * @param {*}
     * @return {*}
     */
    async loadRecord(page) {
      this.loadRecordM()
      if (page) {
        this.param.page = page
      }
      // 如果当前用户不是管理员角色，那么使用当前用户的id
      if (!this.roles.includes('admin')) {
        this.param.isrSaleId = this.user.accountId
      }
      // 处理时间问题
      const obj = {
        ...this.param,
        startTime: this.param.times ? this.param.times[0] : '',
        endTime: this.param.times ? this.param.times[1] : '',
        startDeliver: this.param.times2 ? this.param.times2[0] : '',
        endDeliver: this.param.times2 ? this.param.times2[1] : ''
      }
      delete obj.times
      delete obj.times2
      this.loading = true
      const res = await findByOption(obj)
      this.recordListData = res.data
      this.loading = false
    },
    /**
     * @description: 加载现有出单记录销售人员信息
     * @param {*}
     * @return {*}
     */
    async loadRecordM() {
      const res = await findAllRecordAccount()
      this.recordMData = res.data
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
     * @description: 加载所有的出单记录人员角色的人员
     * @param {*}
     * @return {*}
     */
    async loadRecordMByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId)
      this.recordMDataAll = res.data
      if (this.recordMDataAll.length > 0) {
        this.form.isrSaleId = accountId || this.recordMDataAll[0].accountId
      }
    },
    /**
     * @description: 加载所有的客户信息
     * @param {*}
     * @return {*}
     */
    async loadCustomer() {
      const res = await findAllCustomer()
      this.customerData = res.data
    },

    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.loadAllRoles()
      this.loadCustomer()
      this.form = {
        isrSaleId: ''
      }
      this.title = '添加出单记录信息'
      this.visible = true
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.loadCustomer()
      this.loadAllRoles()
      this.loadRecordMByRoleId(record.account.roles[0].roleId, record.account.accountId)
      this.form = {
        ...record,
        isrNum: +record.isrNum,
        isrPrice: +record.isrPrice,
        roleId: record.account.roles[0].roleId
      }
      this.title = '修改出单记录信息'
      this.visible = true
    },
    /**
     * @description: 完成按钮
     * @param {*} id
     * @return {*}
     */
    toFinish(isrId) {
      this.$confirm('此操作将将此订单状态改为完成状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await updateStatusById({ isrId, isrStatus: '已完成' })
        this.$message({ type: 'success', message: res.message })
        this.loadRecord()
      })
    },
    /**
     * @description: 保存出单记录信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['isr_record_form'].validate(async(valid) => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          if (!this.roles.includes('admin')) {
            this.form.isrSaleId = this.user.accountId
          }
          if (this.title === '添加出单记录信息') {
            this.form.isrStatus = '申请中'
          }
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          if (this.title === '添加出单记录信息') {
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
     * @description: 删除出单记录
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
     * @description: 批量删除出单记录
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
      this.ids = val.map(item => item.isrId)
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['isr_record_form'].resetFields()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
