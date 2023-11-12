<!--
 * @Description: 特殊情况上报
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 21:29:08
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
        >上报</el-button>
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
            v-model="param.srAnimalId"
            placeholder="请输入动物编号"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.srStatus" clearable placeholder="处理状态">
            <el-option label="已上报" value="已上报" />
            <el-option label="处理中" value="处理中" />
            <el-option label="生病中" value="生病中" />
            <el-option label="未生病" value="未生病" />
            <el-option label="已治愈" value="已治愈" />
            <el-option label="未治愈" value="未治愈" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="param.times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
      />
      <el-table-column align="center" type="index" :index="1" label="序号" />
      <el-table-column
        prop="srAnimalId"
        label="动物编号"
        width="260"
      />
      <el-table-column
        prop="srTime"
        label="上报时间"
        width="160"
      />
      <el-table-column
        prop="srStatus"
        label="处理状态"
        width="70"
      />

      <el-table-column
        label="上报人员"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>上报人员编号: {{ scope.row.reportUser.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.reportUser.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="处理人员"
      >
        <template slot-scope="scope">
          <div v-if="!scope.row.doctorUser">--</div>
          <el-popover v-else trigger="hover" placement="top">
            <p>处理人员编号: {{ scope.row.doctorUser.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.doctorUser.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="srDesc"
        label="情况描述"
        width="260"
      />

      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms===perms.solve;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toChange(scope.row)"
          >处理</el-button>
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms===perms.delete;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.srId)"
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

    <!-- 抽屉 添加和修改情况上报信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="record_form" :model="form" :rules="rules">
          <el-form-item label="动物编号" :label-width="formLabelWidth" prop="srAnimalId">
            <el-input
              v-model="form.srAnimalId"
              autocomplete="off"
              clearable
              :readonly="title==='修改情况上报信息'"
            />
          </el-form-item>

          <el-form-item label="上报时间" :label-width="formLabelWidth" prop="srTime">
            <el-date-picker
              v-model="form.srTime"
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
            <el-form-item label="情况上报人员" :label-width="formLabelWidth" prop="srUbreedId">
              <el-select v-model="form.srUbreedId" placeholder="请选择情况上报人员">
                <el-option v-for="item in recordMDataAll" :key="item.accountId" :label="item.username" :value="item.accountId" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="情况描述" :label-width="formLabelWidth" prop="srDesc">
            <el-input
              v-model="form.srDesc"
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

    <!-- 处理抽屉 -->
    <Briupdrawer
      :drawer-visible="statusVisible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange2"
    >
      <div slot="content">
        <el-form ref="status_form" :model="statusForm" :rules="statusRules">
          <el-form-item label="上报记录编号" :label-width="formLabelWidth" prop="srId">
            <el-input
              v-model="statusForm.srId"
              autocomplete="off"
              readonly
            />
          </el-form-item>
          <el-form-item label="动物编号" :label-width="formLabelWidth" prop="srAnimalId">
            <el-input
              v-model="statusForm.srAnimalId"
              autocomplete="off"
              readonly
            />
          </el-form-item>
          <el-form-item label="处理状态" :label-width="formLabelWidth" prop="srStatus">
            <el-select v-model="statusForm.srStatus" clearable placeholder="处理状态">
              <el-option label="处理中" value="处理中" />
              <el-option label="生病中" value="生病中" />
              <el-option label="未生病" value="未生病" />
              <el-option label="已治愈" value="已治愈" />
              <el-option label="未治愈" value="未治愈" />
            </el-select>
          </el-form-item>
          <div v-if="roles.includes('admin')">
            <el-form-item label="角色(医护人员)" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="statusForm.roleId" placeholder="请选择角色" @change="loadRecordMByRoleId">
                <el-option v-for="item in rolesData" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
            <el-form-item label="医护人员" :label-width="formLabelWidth" prop="srUdockerId">
              <el-select v-model="statusForm.srUdockerId" placeholder="请选择医护人员">
                <el-option v-for="item in recordMDataAll" :key="item.accountId" :label="item.username" :value="item.accountId" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange2(false)">取 消</el-button>
        <el-button type="primary" size="small" @click="toSaveChange">确 定</el-button>
      </span>
    </Briupdrawer>

  </div>
</template>
<script>
import { findByOption, saveOrUpdate, delById, deleteByIdAll, updateStatus } from '@/api/ptsOperational/situationReporting'
import { findAll as findAllRoles } from '@/api/base/role'
import { findByRole } from '@/api/base/account'
import { mapGetters } from 'vuex'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.situationReporting,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 情况上报数据
      recordListData: [],
      // 所有角色数据
      rolesData: [],
      // 所有的情况上报管理人员
      recordMDataAll: [],
      // 新增和修改模态框
      visible: false,
      statusVisible: false,
      // 标题
      title: '添加情况上报信息',
      // 新增和修改情况上报的数据
      form: { srUbreedId: '' },
      // 处理数据
      statusForm: {},
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
        srAnimalId: [
          { required: true, message: '请输入动物编号', trigger: 'blur' }
        ],
        srTime: [
          { type: 'string', required: true, message: '请选择上报时间', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        srUbreedId: [
          { required: true, message: '请选择情况上报人员', trigger: 'change' }
        ],
        srDesc: [
          { required: true, message: '请填写上报信息描述', trigger: 'change' }
        ]
      },
      statusRules: {
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        srUdockerId: [
          { required: true, message: '请选择医护人员人员', trigger: 'change' }
        ],
        srStatus: [
          { required: true, message: '请选择处理状态', trigger: 'change' }
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
     * @description: 加载情况上报信息
     * @param {*}
     * @return {*}
     */
    async loadRecord(page) {
      if (page) {
        this.param.page = page
      }
      // 处理时间问题
      const obj = {
        ...this.param,
        startTime: this.param.times ? this.param.times[0] : '',
        endTime: this.param.times ? this.param.times[1] : ''
      }
      delete obj.times
      this.loading = true
      const res = await findByOption(obj)
      this.recordListData = res.data
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
     * @description: 加载所有的情况上报人员角色的人员
     * @param {*}
     * @return {*}
     */
    async loadRecordMByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId)
      this.recordMDataAll = res.data
      if (this.recordMDataAll.length > 0) {
        this.form.srUbreedId = accountId || this.recordMDataAll[0].accountId
      }
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.loadAllRoles()
      this.form = { srUbreedId: '' }
      this.title = '添加情况上报信息'
      this.visible = true
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.loadAllRoles()
      this.loadRecordMByRoleId(record.reportUser.baseRole.roleId, record.reportUser.accountId)
      this.form = {
        ...record,
        irdWeight: +record.irdWeight,
        irdTemperature: +record.irdTemperature,
        irdBreathing: +record.irdBreathing,
        irdHeartRate: +record.irdHeartRate,
        roleId: record.reportUser.baseRole.roleId
      }
      this.title = '修改情况上报信息'
      this.visible = true
    },
    /**
     * @description: 保存情况上报信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['record_form'].validate(async(valid) => {
        if (valid) {
          if (this.title === '添加情况上报信息') {
            this.form.srStatus = '已上报'
          }
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          if (!this.roles.includes('admin')) {
            this.form.srUbreedId = this.user.accountId
          }
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          if (this.title === '添加情况上报信息') {
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
     * @description: 保存处理信息
     * @param {*}
     * @return {*}
     */
    toSaveChange() {
      this.$refs['status_form'].validate(async(valid) => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          if (!this.roles.includes('admin')) {
            this.statusForm.srUdockerId = this.user.accountId
          }
          const res = await updateStatus(this.statusForm)
          this.handlerVisibleChange2(false)
          this.$message({ message: res.message, type: 'success' })
          this.loadRecord()
        } else {
          return false
        }
      })
    },

    /**
     * @description: 处理按钮
     * @param {*}
     * @return {*}
     */
    toChange(record) {
      this.loadAllRoles()
      this.statusForm = {
        srId: record.srId,
        srAnimalId: record.srAnimalId
      }
      this.statusVisible = true
    },

    /**
     * @description: 删除情况上报
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
     * @description: 批量删除情况上报
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
      this.ids = val.map(item => item.srId)
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['record_form'].resetFields()
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange2(val) {
      this.statusVisible = val
      this.$refs['status_form'].resetFields()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
