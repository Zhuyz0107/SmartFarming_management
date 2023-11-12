<!--
 * @Description:  屠宰组管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 20:03:55
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
            v-model="param.sgName"
            placeholder="请输入屠宰组名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model.number="param.sgNum"
            placeholder="请输入数量"
            clearable
          />
        </el-form-item>
        <el-button type="text" size="mini" @click="loadGroup(1)">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="groupData.list"
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
        prop="sgName"
        label="名称"
        width="100"
        fixed
      />
      <el-table-column
        prop="sgNum"
        label="成员数量"
      />
      <el-table-column
        prop="accounts"
        label="成员组成"
        width="300"
      >
        <template slot-scope="scope">
          {{ scope.row.accounts.map(item=>item.username).toString() }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sgDelete"
        label="状态"
        width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sgDelete==0" size="mini">启用</el-tag>
          <el-tag v-else size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sgDesc"
        label="描述"
        width="200"
      />
      <el-table-column label="操作" align="center" width="190" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.sgDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.setAccount;
            }).length > 0"
            type="text"
            size="mini"
            @click.prevent="toSet(scope.row)"
          >设置成员</el-button>
          <el-button
            v-if="scope.row.sgDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.delete;
            }).length > 0"
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.sgId)"
          >禁用</el-button>
          <el-button
            v-if="scope.row.sgDelete==0 && authsButton.filter((item) => {
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
        :total="groupData.total"
        :page-size="param.pageSize"
        :current-page="param.page"
        :page-sizes="[2,10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->

    <!-- 抽屉 添加和修改屠宰组信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="group_form" :model="form" :rules="rules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="sgName">
            <el-input
              v-model="form.sgName"
              autocomplete="off"
              clearable
            />
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="sgDesc">
            <el-input
              v-model="form.sgDesc"
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

    <!-- 抽屉 设置屠宰组人员信息 -->
    <Briupdrawer
      :drawer-visible="accountVisible"
      title="设置屠宰组人员"
      width="40%"
      @on-change-visible="handlerVisibleChange2"
    >
      <div slot="content">
        <el-form ref="account_form" :model="form" :rules="rules">
          <el-form-item label="成员：" label-width="60px" prop="fzUcoldId">
            <el-checkbox-group v-model="accountForm.accountIds" @change="checkedChange">
              <el-checkbox v-for="item in GroupMDataAll" :key="item.accountId" :label="item.accountId">{{ item.username }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange2(false)">取 消</el-button>
        <el-button type="primary" size="small" @click="toSaveSet">确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
  </div>
</template>
<script>
import { findByOption, saveOrUpdate, delById, deleteByIdAll, addAccount, selectAllAccount } from '@/api/ptsBase/slaughteringGroup'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.slaughteringGroup,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 屠宰组数据
      groupData: [],
      // 所有屠宰人员
      GroupMDataAll: [],
      // 新增和修改模态框
      visible: false,
      accountVisible: false,
      // 标题
      title: '添加屠宰组信息',
      // 新增和修改屠宰组的数据
      form: {},
      accountForm: { accountIds: [] },
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
        sgName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    // 加载数据
    this.loadGroup()
  },
  methods: {
    /**
     * @description: 加载屠宰组信息
     * @param {*}
     * @return {*}
     */
    async loadGroup(page) {
      if (page) {
        this.param.page = page
      }
      if (this.param.sgNum) {
        if (+this.param.sgNum) {
          this.param.sgNum = +this.param.sgNum
        } else {
          this.$message({ message: '数量要求为数值', type: 'warning' })
          return
        }
      }
      this.loading = true
      const res = await findByOption(this.param)
      this.groupData = res.data
      this.loading = false
    },

    /**
     * @description: 加载所有的屠宰人员信息
     * @param {*}
     * @return {*}
     */
    async loadGroupMAll() {
      const res = await selectAllAccount()
      this.GroupMDataAll = res.data
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.form = {}
      this.title = '添加屠宰组信息'
      this.visible = true
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.form = {
        ...record
      }
      this.title = '修改屠宰组信息'
      this.visible = true
    },
    /**
     * @description: 保存屠宰组信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['group_form'].validate(async(valid) => {
        if (valid) {
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          if (this.title === '添加屠宰组信息') {
            // 处理分页bug
            this.loadGroup(1)
          } else {
            this.loadGroup()
          }
        } else {
          return false
        }
      })
    },
    /**
     * @description: 设置成员按钮
     * @param {*} record
     * @return {*}
     */
    toSet(record) {
      this.loadGroupMAll()
      this.accountForm = {
        sgId: record.sgId,
        accountIds: record.accounts.map(item => { return item.accountId }),
        sgNum: record.accounts.length
      }
      this.accountVisible = true
    },
    /**
     * @description: 保存成员到屠宰组里
     * @param {*}
     * @return {*}
     */
    async toSaveSet() {
      if (this.accountForm.accountIds.length === 0) {
        this.$message({ type: 'warning', message: '请选择成员' })
        return
      }
      this.accountForm.accountIds = this.accountForm.accountIds.toString()
      const res = await addAccount(this.accountForm)
      this.$message({ type: 'success', message: res.message })
      this.loadGroup()
      this.accountVisible = false
    },
    /**
     * @description: 禁用屠宰组
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
        this.loadGroup()
      })
    },
    /**
     * @description: 批量禁用屠宰组
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
          this.loadGroup()
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
      this.loadGroup()
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.page = 1
      this.param.pageSize = pageSize
      this.loadGroup()
    },
    /**
     * @description: 表格多选切换
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.ids = val.map(item => item.sgId)
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['group_form'].resetFields()
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange2(val) {
      this.accountVisible = val
      this.$refs['account_form'].resetFields()
    },
    /**
     * @description: 复选框组选中与否发生变化
     * @param {*} val
     * @return {*}
     */
    checkedChange(val) {
      this.accountForm.sgNum = val.length
    }
  }
}
</script>
<style scoped lang="scss">

</style>

