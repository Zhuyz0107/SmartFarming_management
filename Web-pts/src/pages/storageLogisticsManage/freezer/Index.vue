<!--
 * @Description:  冷库管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 20:05:56
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
        >批量禁用</el-button>
        <el-form-item>
          <el-input
            v-model="param.fzName"
            placeholder="请输入冷库名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.fzNum"
            placeholder="请输入容量"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="roles.includes('admin')">
          <el-select v-model="param.fzUcoldId" clearable placeholder="负责人">
            <el-option v-for="item in freezerMData" :key="item.accountId" :label="item.username" :value="item.accountId" />
          </el-select>
        </el-form-item>
        <el-button type="text" size="mini" @click="loadFreezer(1)">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="freezerListData.list"
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
        prop="fzName"
        label="名称"
        width="100"
        fixed
      />
      <el-table-column
        label="容量/已存量"
      >
        <template slot-scope="scope">
          {{ scope.row.fzNum }}/{{ scope.row.fzQuantity }}
        </template>
      </el-table-column>
      <el-table-column
        label="面积"
      >
        <template slot-scope="scope">
          {{ scope.row.fzArea }} ㎡
        </template>
      </el-table-column>
      <el-table-column
        label="最佳温度"
      >
        <template slot-scope="scope">
          {{ scope.row.fzTemperature }} ℃
        </template>
      </el-table-column>
      <el-table-column
        label="最佳湿度"
      >
        <template slot-scope="scope">
          {{ scope.row.fzHumidity }} RH
        </template>
      </el-table-column>
      <el-table-column
        prop="fzDelete"
        label="状态"
        width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.fzDelete==0" size="mini">启用</el-tag>
          <el-tag v-else size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="负责人"
        width="120"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>负责人编号: {{ scope.row.baseAccount.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.baseAccount.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.fzDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.delete;
            }).length > 0"
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.fzId)"
          >禁用</el-button>
          <el-button
            v-if="scope.row.fzDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.saveOrUpdate;
            }).length > 0"
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
        :total="freezerListData.total"
        :page-size="param.pageSize"
        :current-page="param.page"
        :page-sizes="[2,10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->

    <!-- 抽屉 添加和修改冷库信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="freezer_form" :model="form" :rules="rules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="fzName">
            <el-input
              v-model="form.fzName"
              autocomplete="off"
              clearable
            />
          </el-form-item>
          <el-form-item label="容量" :label-width="formLabelWidth" prop="fzNum">
            <el-input
              v-model.number="form.fzNum"
              oninput="value=value.replace(/[^0-9]/g,'')"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="面积" :label-width="formLabelWidth" prop="fzArea">
            <el-input
              v-model.number="form.fzArea"
              oninput="value=value.replace(/[^0-9]/g,'')"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="最佳温度" :label-width="formLabelWidth" prop="fzTemperature">
            <el-input
              v-model.number="form.fzTemperature"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="最佳湿度" :label-width="formLabelWidth" prop="fzHumidity">
            <el-input
              v-model.number="form.fzHumidity"
              autocomplete="off"
            />
          </el-form-item>
          <div v-if="roles.includes('admin')">
            <el-form-item label="角色(冷库人员)" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择角色" @change="loadFreezerMByRoleId">
                <el-option v-for="item in rolesData" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
            <el-form-item label="冷库负责人" :label-width="formLabelWidth" prop="fzUcoldId">
              <el-select v-model="form.fzUcoldId" placeholder="请选择冷库负责人">
                <el-option v-for="item in freezerMDataAll" :key="item.accountId" :label="item.username" :value="item.accountId" />
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
import { findByOption, saveOrUpdate, delById, deleteByIdAll, findAllFreezerAccount } from '@/api/ptsBase/freezer'
import { findAll as findAllRoles } from '@/api/base/role'
import { findByRole } from '@/api/base/account'
import { mapGetters } from 'vuex'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.freezer,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 冷库数据
      freezerListData: [],
      // 所有冷库现有负责人数据
      freezerMData: [],
      // 所有角色数据
      rolesData: [],
      // 所有的冷库管理人员
      freezerMDataAll: [],
      // 新增和修改模态框
      visible: false,
      // 标题
      title: '添加冷库信息',
      // 新增和修改冷库的数据
      form: {
        fzUcoldId: ''
      },
      // 表单标签宽度
      formLabelWidth: '120px',
      // 批量禁用的数据
      ids: [],
      // 搜索的数据
      param: {
        page: 1,
        pageSize: 10
      },
      rules: {
        fzName: [
          { required: true, message: '请输入名称', trigger: 'blur' }

        ],
        fzNum: [
          { required: true, message: '请输入容量', trigger: 'blur' },
          { type: 'number', message: '容量要求为数值', trigger: 'blur' }
        ],
        fzArea: [
          { required: true, message: '请输入面积', trigger: 'blur' },
          { type: 'number', message: '面积要求为数值', trigger: 'blur' }
        ],
        fzTemperature: [
          { required: true, message: '请输入最佳温度', trigger: 'blur' },
          { type: 'number', message: '最佳温度要求为数值', trigger: 'blur' }
        ],
        fzHumidity: [
          { required: true, message: '请输入最佳湿度', trigger: 'blur' },
          { type: 'number', message: '最佳湿度要求为数值', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        fzUcoldId: [
          { required: true, message: '请选择冷库负责人', trigger: 'change' }
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
    this.loadFreezer()
  },
  methods: {
    /**
     * @description: 加载冷库信息
     * @param {*}
     * @return {*}
     */
    async loadFreezer(page) {
      this.loadFreezerM()
      if (page) {
        this.param.page = page
      }
      // 如果不是管理员，那么就搜索当前用户的表格数据
      if (!this.roles.includes('admin')) {
        this.param.fzUcoldId = this.user.accountId
      }
      this.loading = true
      const res = await findByOption(this.param)
      this.freezerListData = res.data
      this.loading = false
    },
    /**
     * @description: 加载现有冷库负责人信息
     * @param {*}
     * @return {*}
     */
    async loadFreezerM() {
      const res = await findAllFreezerAccount()
      this.freezerMData = res.data
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
    async loadFreezerMByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId)
      this.freezerMDataAll = res.data
      if (this.freezerMDataAll.length > 0) {
        this.form.fzUcoldId = accountId || this.freezerMDataAll[0].accountId
      }
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.loadAllRoles()
      this.form = { fzUcoldId: '' }
      this.title = '添加冷库信息'
      this.visible = true
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.loadAllRoles()
      this.loadFreezerMByRoleId(record.baseAccount.baseRole.roleId, record.baseAccount.accountId)
      this.form = {
        ...record,
        fzNum: +record.fzNum,
        fzArea: +record.fzArea,
        fzTemperature: +record.fzTemperature,
        fzHumidity: +record.fzHumidity,
        roleId: record.baseAccount.baseRole.roleId
      }
      this.title = '修改冷库信息'
      this.visible = true
    },
    /**
     * @description: 保存冷库信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['freezer_form'].validate(async(valid) => {
        if (valid) {
          if (!this.roles.includes('admin')) {
            this.form.fzUcoldId = this.user.accountId
          }
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          if (this.title === '添加冷库信息') {
            // 处理分页bug
            this.loadFreezer(1)
          } else {
            this.loadFreezer()
          }
        } else {
          return false
        }
      })
    },
    /**
     * @description: 禁用冷库
     * @param {*} id 账户id
     * @return {*}
     */
    toDelete(id) {
      this.$confirm('此操作将永久禁用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delById(id)
        this.$message({ type: 'success', message: res.message })
        this.loadFreezer()
      })
    },
    /**
     * @description: 批量禁用冷库
     * @param {*}
     * @return {*}
     */
    toBatchDelete() {
      if (this.ids.length > 0) {
        this.$confirm('此操作将批量禁用选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await deleteByIdAll(this.ids)
          this.$message({ type: 'success', message: res.message })
          this.loadFreezer()
        })
      } else {
        this.$message({ type: 'warning', message: '请选择要批量禁用的数据' })
      }
    },
    /**
     * @description: 当前页发生改变
     * @param {*} page
     * @return {*}
     */
    currentChangeHandler(page) {
      this.param.page = page
      this.loadFreezer()
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.page = 1
      this.param.pageSize = pageSize
      this.loadFreezer()
    },
    /**
     * @description: 表格多选切换
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.ids = val.map(item => item.fzId)
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['freezer_form'].resetFields()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
