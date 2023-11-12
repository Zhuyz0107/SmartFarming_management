<!--
 * @Description: 权限管理，菜单+功能
 * @Author: Ronda
 * @Date: 2022-03-07 10:15:51
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-12 15:22:07
-->
<template>
  <!-- 权限管理 -->
  <div class="privilege_list">
    <div class="btns">
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
    <el-table
      v-loading="loading"
      border
      :data="auths"
      size="small"
      row-key="id"
      :tree-props="{ children: 'subs', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="150" />
      <el-table-column prop="url" label="前端路径" />
      <el-table-column prop="type" label="类型" width="80" align="center">
        <template v-slot="scope">
          <el-tag v-if="scope.row.type == 0" size="mini">目录</el-tag>
          <el-tag v-else-if="scope.row.type == 1" size="mini">菜单</el-tag>
          <el-tag v-else type="info" size="mini">按钮</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="orderNum" label="序号" width="80" align="center" />
      <el-table-column prop="icon" label="图标" width="100" align="center" />
      <el-table-column prop="hidden" label="状态" align="center" width="100">
        <template v-slot="scope">
          <el-tag
            v-if="scope.row.hidden == 0 && scope.row.type != 2"
            size="mini"
          >隐藏</el-tag>
          <el-tag
            v-else-if="scope.row.hidden == 1 && scope.row.type != 2"
            size="mini"
          >显示</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms.indexOf(perms.delete) > -1;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="deleteHandler(scope.row.id)"
          >移除</el-button>
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms.indexOf(perms.saveOrUpdate) > -1;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toEdit(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="70%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="privilege_form" :model="form" :rules="rules">
          <el-form-item label="类型" label-width="80px" prop="type">
            <el-select v-model="form.type" clearable placeholder="请选择">
              <el-option label="目录" :value="0" />
              <el-option label="菜单" :value="1" />
              <el-option label="按钮" :value="2" />
            </el-select>
            <el-popover
              placement="top-start"
              title="提示"
              width="300"
              trigger="hover"
              content="目录和菜单控制着用户登录后可以动态显示的菜单树；按钮为某个页面具体的操作权限，控制着是否可以使用某些按钮"
            >
              <el-button
                slot="reference"
                type="text"
              ><i
                class="el-icon-location-information"
              /></el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="名称" label-width="80px" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>

          <el-form-item
            v-if="form.type != 2"
            label="前端路径"
            label-width="80px"
            prop="url"
          >
            <el-input v-model="form.url" autocomplete="off" />
          </el-form-item>
          <el-form-item v-if="form.type != 0" label="父权限" label-width="80px">
            <el-cascader-panel
              v-model="form.parentId"
              filterable
              clearable
              :options="auths"
              :props="{
                expandTrigger: 'hover',
                value: 'id',
                label: 'name',
                children: 'subs',
                checkStrictly: true,
                emitPath: false,
              }"
            />
          </el-form-item>
          <el-form-item
            v-if="form.type != 2"
            label="图标"
            label-width="80px"
            prop="icon"
          >
            <el-input v-model="form.icon" autocomplete="off" />
          </el-form-item>
          <el-form-item label="序号" label-width="80px" prop="orderNum">
            <el-input v-model="form.orderNum" autocomplete="off" />
          </el-form-item>
          <el-form-item
            v-if="form.type != 2"
            label="状态"
            label-width="80px"
            prop="hidden"
          >
            <el-switch
              v-model="form.hidden"
              active-text="显示"
              inactive-text="隐藏"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange(false)">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submitHandler"
        >确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
  </div>
</template>
<script>
import _ from 'lodash'
import { deleteById, findAll, saveOrUpdate } from '@/api/base/auth'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.auth,
      // 当前页面的按钮权限
      authsButton: [],
      form: {},
      visible: false,
      title: '添加权限',
      auths: [],
      rules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'change' }
        ],
        url: [{ required: true, message: '请输入前端路径', trigger: 'change' }],
        type: [
          { required: true, message: '请选择权限类型', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    this.loadAuths()
  },
  methods: {
    /**
     * @description: 获取权限信息
     * @param {*}
     * @return {*}
     */
    async loadAuths() {
      this.loading = true
      const res = await findAll()
      this.foo(res.data)
      this.auths = res.data
      this.loading = false
    },
    /**
     * @description: 提交权限信息
     * @param {*}
     * @return {*}
     */
    submitHandler() {
      this.$refs['privilege_form'].validate(async(valid) => {
        if (valid) {
          const res = await saveOrUpdate(this.form)
          // this.visible = false
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          this.loadAuths()
        } else {
          return false
        }
      })
    },
    /**
     * @description: 处理权限数据
     * @param {*} auths
     * @return {*}
     */
    foo(auths) {
      for (const p of auths) {
        if (p.subs && p.subs.length === 0) {
          delete p.subs
        } else {
          this.foo(p.subs)
        }
      }
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.form = { }
      this.visible = true
    },
    /**
     * @description: 删除权限信息
     * @param {*} id
     * @return {*}
     */
    deleteHandler(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteById(id)
        this.$message({ type: 'success', message: res.message })
        this.loadAuths()
      })
    },
    /**
     * @description: 编辑按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.form = _.clone(record)
      this.visible = true
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['privilege_form'].resetFields()
    }
  }
}
</script>
