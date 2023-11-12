<!--
 * @Description: 权限挂载API
 * @Author: Ronda
 * @Date: 2022-03-10 17:28:28
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-16 14:23:36
-->
<template>
  <!-- API挂载 -->
  <div class="privilege_list">
    <el-table
      v-loading="loading"
      border
      :data="auths"
      size="small"
      row-key="id"
      :tree-props="{ children: 'subs', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="150" />
      <el-table-column prop="url" label="路径" />
      <el-table-column prop="type" label="类型" width="80" align="center">
        <template v-slot="scope">
          <el-tag v-if="scope.row.type == 0" size="mini">目录</el-tag>
          <el-tag v-else-if="scope.row.type == 1" size="mini">菜单</el-tag>
          <el-tag v-else type="info" size="mini">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="API标识" />
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter((item) => {
                return item.perms.indexOf(perms.toMount) > -1;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toAddAPI(scope.row)"
          >挂载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="60%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <div>当前权限信息：{{ currentAuth.name }}</div>
        <br>

        <div>
          当前选中的API：<el-tag
            v-for="mountApi in multipleSelection"
            :key="mountApi.apiUrl"
            style="margin: 5px"
            closable
            @close="handleClose2(mountApi)"
          >
            【{{ mountApi.requestMethod }}】{{ mountApi.apiUrl }}
          </el-tag>
          <el-button
            :disabled="multipleSelection.length == 0"
            type="primary"
            size="mini"
            @click="toConcatAPI"
          >汇总</el-button><el-button
            :disabled="multipleSelection.length == 0"
            type="primary"
            size="mini"
            @click="multipleSelection = []"
          >清空</el-button>
        </div>
        <br>
        <div>
          最终挂载的API：<el-tag
            v-for="mountApi in mountApis"
            :key="mountApi.apiUrl"
            style="margin: 5px"
            closable
            type="success"
            @close="handleClose(mountApi)"
          >
            【{{ mountApi.requestMethod }}】{{ mountApi.apiUrl }}
          </el-tag>
          <el-button
            :disabled="mountApis.length == 0"
            type="primary"
            size="mini"
            @click="mountApis = []"
          >清空</el-button>
        </div>
        <br>
        <el-form ref="api_form" size="mini" :inline="true" :model="form">
          <el-form-item
            label="API请求方式"
            label-width="100px"
            prop="requestMethod"
          >
            <el-select
              v-model="form.requestMethod"
              clearable
              placeholder="API请求方式"
            >
              <el-option label="GET" value="GET" />
              <el-option label="POST" value="POST" />
              <el-option label="DELETE" value="DELETE" />
              <el-option label="PUT" value="PUT" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="API请求路径"
            label-width="100px"
            prop="requestUrl"
          >
            <el-input v-model="form.requestUrl" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="loading"
          :data="apis"
          size="small"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="requestMethod" label="请求方式" />
          <el-table-column prop="apiUrl" label="请求路径" width="150" />
          <el-table-column prop="description" label="描述" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="toMount"
        >确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
  </div>
</template>
<script>
import { findAll, mountAPI } from '@/api/base/auth'
import { findByOption } from '@/api/base/api'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.api,
      // 当前页面的按钮权限
      authsButton: [],
      // 搜索条件
      form: { requestMethod: '', requestUrl: '' },
      // 当前需要挂载api的权限信息
      currentAuth: {},
      // 每次存储挂载的api的数据
      multipleSelection: [],
      // 挂载api的总数据
      mountApis: [],
      // 是否显示
      visible: false,
      // 加载数据中
      loading: false,
      // 模态框标题信息
      title: '权限挂载API',
      // 搜索出的api的结果
      apis: [],
      // 权限数据
      auths: []
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
     * @description: 删除tag
     * @param {*} tag
     * @return {*}
     */
    handleClose(tag) {
      this.mountApis.splice(this.mountApis.indexOf(tag), 1)
    },
    /**
     * @description: 删除tag
     * @param {*} tag
     * @return {*}
     */
    handleClose2(tag) {
      this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1)
    },
    /**
     * @description: 将最新选择的api数据追加到总数据中
     * @param {*}
     * @return {*}
     */
    toConcatAPI() {
      this.mountApis = this.mountApis.concat(this.multipleSelection)
      this.multipleSelection = []
    },
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
     * @description: 搜索API
     * @param {*}
     * @return {*}
     */
    async toSearch() {
      if (this.multipleSelection.length > 0) {
        this.mountApis = this.mountApis.concat(this.multipleSelection)
        this.multipleSelection = []
      }
      this.loading = true
      const res = await findByOption(this.form)
      this.apis = res.data
      this.loading = false
    },
    /**
     * @description: 挂载按钮
     * @param {*} record
     * @return {*}
     */
    toAddAPI(record) {
      this.currentAuth = { ...record }
      this.form = {}
      this.mountApis = []
      this.multipleSelection = []
      this.apis = []
      this.visible = true
    },
    /**
     * @description: 提交挂载信息
     * @param {*}
     * @return {*}
     */
    async toMount() {
      if (this.multipleSelection.length > 0) {
        this.mountApis = this.mountApis.concat(this.multipleSelection)
        this.multipleSelection = []
      }

      const temp = {
        autorityId: this.currentAuth.id,
        apiIds: this.mountApis.map((item) => item.id),
        perms: this.mountApis.map((item) => item.perms).join(';')
      }
      const res = await mountAPI(temp)
      this.visible = false
      this.$message({ message: res.message, type: 'success' })
      this.loadAuths()
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
     * @description: 多选表单选择的数据
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      // this.$refs["api_form"].resetFields();
    }
  }
}
</script>
