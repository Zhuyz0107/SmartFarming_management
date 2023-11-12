<!--
 * @Description: 用户列表
 * @Author: Ronda
 * @Date: 2022-03-07 10:15:05
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-18 14:17:36
-->
<template>
  <!-- 用户管理 -->
  <div class="user_list">
    <!-- {{ authsButton }} -->
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
          style="margin-right: 10px"
          @click="toAdd"
        >添加</el-button>
        <el-form-item>
          <el-input
            v-model="param.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.mobile"
            placeholder="请输入电话号码"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.status" placeholder="请选择状态" clearable>
            <el-option label="禁用" :value="0" />
            <el-option label="启用" :value="1" />
          </el-select>
        </el-form-item>
        <el-button type="text" size="mini" @click="loadUsers">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="usersData.list"
      size="small"
    >
      <el-table-column type="index" :index="1" label="序号" />
      <el-table-column
        prop="username"
        label="用户名"
        width="200"
        align="center"
      />
      <el-table-column label="角色" width="200">
        <template slot-scope="scope">
          {{ scope.row.roles.map((item) => item.roleName).join(",") }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="角色描述" width="200">
        <template slot-scope="scope">
          {{ scope.row.roles.map((item) => item.remark).join(",") }}
        </template>
      </el-table-column> -->
      <el-table-column
        prop="mobile"
        label="电话号码"
        width="200"
        align="center"
      />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" size="mini" type="info">禁用</el-tag>
          <el-tag v-else-if="scope.row.status == 1" size="mini" type="success">启用</el-tag>
          <span v-else>--</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms===perms.setRole;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toSetRole(scope.row)"
          >设置角色</el-button>
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms===perms.delete;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.accountId)"
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
                return item.perms===perms.resetPassword;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toResetPassword(scope.row.accountId)"
          >重置密码</el-button>
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms===perms.toggleStatus;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toToggleStatus(scope.row.accountId,scope.row.status===0?1:0)"
          >
            {{ scope.row.status===1?'禁用':'启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      small
      :hide-on-single-page="true"
      :total="usersData.total"
      :page-size="param.pageSize"
      :current-page="param.pageNum"
      @current-change="currentChangeHandler"
    />
    <!-- 分页 -->
    <!-- 抽屉 添加和修改用户信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="user_form" :model="form" :rules="rules">
          <el-form-item label="用户名" label-width="80px" prop="username">
            <el-input
              v-if="form.id"
              v-model="form.username"
              autocomplete="off"
              disabled
            />
            <el-input v-else v-model="form.username" autocomplete="off" />
          </el-form-item>
          <el-form-item v-if="title=='添加用户信息'" label="密码" label-width="80px" prop="password">
            <el-input v-model="form.password" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange(false)">取 消</el-button>
        <el-button type="primary" size="small" @click="toSave">确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
    <!-- 角色模态框 -->
    <el-dialog
      title="设置角色"
      :visible.sync="role_visible"
      class="customer_modal"
    >
      <el-form :model="user">
        <el-form-item label="用户名" label-width="80px">
          {{ user.username }}
        </el-form-item>
        <el-form-item label="角色" label-width="80px">
          <el-cascader
            v-model="user.roles"
            filterable
            :options="roles"
            :props="props"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="role_visible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="setRolesHandler"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import { findByOption, saveOrUpdate, delById, resetPassword, toggleStatus } from '@/api/base/account'
import { findAll as findAllRole } from '@/api/base/role'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.user,
      // 当前页面的按钮权限
      authsButton: [],
      // 新增和修改用户的数据
      form: {},
      loading: false,
      // 新增和修改模态框
      visible: false,
      // 角色模态框
      role_visible: false,
      // 标题
      title: '添加用户信息',
      // 设置角色
      user: {},
      // 用户数据
      usersData: [],
      // 角色的数据
      roles: [],
      // 搜索的数据
      param: {
        pageNum: 1,
        pageSize: 13
      },
      props: {
        multiple: true,
        value: 'roleId',
        label: 'roleName',
        emitPath: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    this.loadUsers()
  },
  methods: {
    /**
     * @description: 获取所有角色信息
     * @param {*}
     * @return {*}
     */
    async loadRoles() {
      const res = await findAllRole()
      this.roles = res.data
    },
    /**
     * @description: 加载用户信息
     * @param {*}
     * @return {*}
     */
    async loadUsers() {
      this.loading = true
      const res = await findByOption(this.param)
      this.usersData = res.data
      this.loading = false
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.form = { status: 1 }
      this.title = '添加用户信息'
      this.visible = true
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.form = { ...record, password: '' }
      if (record.roles.length > 0) {
        this.form.roles = record.roles.map((item) => item.roleId)
      }
      this.title = '修改用户信息'
      this.visible = true
    },
    /**
     * @description: 重置按钮
     * @param {*}
     * @return {*}
     */
    toResetPassword(id) {
      this.$confirm('此操作将重置该账户密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await resetPassword(id)
        this.$message({ type: 'success', message: res.message + '，该用户密码重置为1234' })
        this.loadUsers()
      })
    },
    /**
     * @description: 启用和禁用账户
     * @param {*} id
     * @param {*} status
     * @return {*}
     */
    async toToggleStatus(id, status) {
      const res = await toggleStatus({
        accountId: id,
        status
      })
      this.$message({ type: 'success', message: res.message })
      this.loadUsers()
    },
    /**
     * @description: 保存用户信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['user_form'].validate(async(valid) => {
        if (valid) {
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          this.loadUsers()
        } else {
          return false
        }
      })
    },
    /**
     * @description: 删除用户
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
        this.loadUsers()
      })
    },
    /**
     * @description: 设置角色
     * @param {*} record 用户信息
     * @return {*}
     */
    toSetRole(record) {
      this.loadRoles()
      // 初始化角色
      this.user = { ...record }
      if (record.roles.length > 0) {
        this.user.roles = record.roles.map((item) => item.roleId)
      }
      this.role_visible = true
    },
    /**
     * @description: 保存用户的角色信息
     * @param {*}
     * @return {*}
     */
    async setRolesHandler() {
      const res = await saveOrUpdate(this.user)
      this.role_visible = false
      this.$message({ message: res.message, type: 'success' })
      this.loadUsers()
    },
    /**
     * @description: 当前页发生改变
     * @param {*} page
     * @return {*}
     */
    currentChangeHandler(page) {
      this.param.pageNum = page
      this.loadUsers()
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['user_form'].resetFields()
    }
  }
}
</script>
