<!--
 * @Description: 角色管理
 * @Author: Ronda
 * @Date: 2022-03-07 10:15:05
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-19 15:10:29
-->
<template>
  <!-- 角色管理 -->
  <div class="role_list">
    <!-- {{ authsButton }} -->
    <div class="btns">
      <!--  按钮权限 -->
      <el-button
        v-if="
          authsButton.filter((item) => {
            return item.perms.indexOf(perms.saveOrUpdate) > -1;
          }).length > 0
        "
        type="primary"
        size="small"
        @click="toAdd"
      >添加</el-button>
    </div>
    <el-table v-loading="loading" border stripe :data="rolesData" size="small">
      <el-table-column type="index" :index="1" label="序号" />
      <el-table-column prop="roleId" label="角色Id" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="remark" label="角色描述" />
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms.indexOf(perms.delete) > -1;
              }).length > 0
            "
            :disabled="scope.row.roleName==='admin'"
            type="text"
            size="mini"
            @click.prevent="deleteHandler(scope.row.roleId)"
          >移除</el-button>
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms.indexOf(perms.saveOrUpdate) > -1;
              }).length > 0
            "
            :disabled="scope.row.roleName==='admin'"
            type="text"
            size="mini"
            @click.prevent="toEdit(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="60%"
      class="customer_modal"
      :before-close="toCancel"
    >
      <el-form ref="role_form" :model="role" :rules="rules">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="role.roleName" disabled="title==='修改角色信息'" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="remark">
          <el-input v-model="role.remark" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限" label-width="80px">
          <el-cascader
            v-model="role.authorities"
            :options="auths"
            :props="props"
            clearable
            filterable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="toCancel">取 消</el-button>
        <el-button type="primary" size="small" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>
<script>
import { findAll, saveOrUpdate, deleteById } from '@/api/base/role'
import { findAll as findAllAuth, findByRoleId } from '@/api/base/auth'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.role,
      // 当前页面的按钮权限
      authsButton: [],
      // 提交的角色信息
      form: {},
      // 加载中
      loading: false,
      // 模态框是否可见
      visible: false,
      // 模态框标题
      title: '添加角色',
      // 当前角色
      role: {},
      // 角色列表
      rolesData: [],
      // 级联选择配置
      props: {
        multiple: true,
        value: 'id',
        label: 'name',
        children: 'subs'
      },
      // 权限树
      auths: [],
      // 表单验证规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入角色描述', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    // 加载角色
    this.loadRoles()
  },
  methods: {
    /**
     * @description: 获取角色数据
     * @param {*}
     * @return {*}
     */
    async loadRoles() {
      const res = await findAll()
      this.rolesData = res.data
    },
    /**
     * @description: 加载所有的权限，供角色授权使用
     * @param {*}
     * @return {*}
     */
    async loadPrivileges() {
      this.loading = true
      const res = await findAllAuth()
      this.foo(res.data)
      this.auths = res.data
      this.loading = false
      this.visible = true
    },
    /**
     * @description: 新增按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.role = { authorities: [] }
      this.loadPrivileges()
      this.title = '添加角色信息'
      this.visible = true
    },
    /**
     * @description: 修改按钮
     * @param {*} record 角色基本信息
     * @return {*}
     */
    async toEdit(record) {
      this.role = { ...record }
      this.title = '修改角色信息'
      // 通过角色id查找权限信息
      const res = await findByRoleId(this.role.roleId)
      const temp = this.changeParseArr(res.data)
      this.role.authorities = temp
      this.loadPrivileges()
    },
    /**
     * @description: 保存角色信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['role_form'].validate(async(valid) => {
        if (valid) {
          const temp = {
            ...this.role
          }
          // 处理权限数据，将二维数组转为1维数组
          temp.authorities = this.changeArr(this.role.authorities)
          // return;
          const res = await saveOrUpdate(temp)
          this.toCancel()
          this.$message({ message: res.message, type: 'success' })
          this.loadRoles()
        } else {
          return false
        }
      })
    },

    /**
     * @description: 删除角色
     * @param {*} id
     * @return {*}
     */
    deleteHandler(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteById(id)
        this.$message({ type: 'success', message: res.message })
        this.loadRoles()
      })
    },
    /**
     * @description: 递归处理数据匹配组件的使用
     * @param {*} auths  权限树
     * @return {*}
     */
    foo(auths) {
      for (const auth of auths) {
        if (auth.subs && auth.subs.length === 0) {
          delete auth.subs
        } else {
          this.foo(auth.subs)
        }
      }
    },
    /**
     * @description: 将二维数组转为1维数组并去重
     * @param {*} arr 二维数组
     * @return {*}
     */
    changeArr(arr) {
      let temp = []
      arr.forEach((item) => {
        temp = temp.concat(item)
      })
      return [...new Set(temp)]
    },
    /**
     * @description: 将树形转为二维数组
     * @param {*} temp
     * @return {*}
     */
    changeParseArr(temp) {
      const arr = []
      // 目录
      temp.forEach((item) => {
        // 二级菜单
        if (item.subs.length > 0) {
          item.subs.forEach((it) => {
            // 按钮
            if (it.subs.length > 0) {
              it.subs.forEach((i) => {
                arr.push([item.id, it.id, i.id])
              })
            } else {
              arr.push([item.id, it.id])
            }
          })
        } else {
          arr.push([item.id])
        }
      })
      return arr
    },
    /**
     * @description: 关闭模态框
     * @param {*}
     * @return {*}
     */
    toCancel() {
      this.$refs['role_form'].resetFields()
      setTimeout(() => {
        this.visible = false
      }, 100)
    }
  }
}
</script>
