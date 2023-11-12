<!--
 * @Description:  客户管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 20:07:45
-->
<template>
  <div>
    <!-- 第一行 -->
    <div class="btns">
      <el-form :inline="true" size="small">
        <el-button
          v-if="authsButton.filter((item) => {
            return item.perms===perms.saveOrUpdate;
          }).length > 0"
          type="primary"
          size="small"
          @click="toAdd"
        >添加</el-button>
        <el-button
          v-if="authsButton.filter((item) => {
            return item.perms===perms.deleteAll;
          }).length > 0"
          type="danger"
          size="small"
          style="margin-right: 10px"
          @click="toDelAll"
        >批量禁用</el-button>
        <el-form-item>
          <el-input
            v-model="param.cName"
            placeholder="请输入客户名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.cCompany"
            placeholder="请输入公司名称"
            clearable
          />
        </el-form-item>

        <el-form-item v-if="roles.includes('admin')">
          <el-select v-model="param.cUsaleId" clearable placeholder="请选择接待人员">
            <el-option
              v-for="item in userUData"
              :key="item.accountId"
              :label="item.username"
              :value="item.accountId"
            />
          </el-select>
          <!-- <el-input
            v-model="param.cUsaleId"
            placeholder="请输入接待人员id"
            clearable
          /> -->
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="param.cLevel"
            placeholder="请选择客户等级"
            clearable
          >
            <el-option label="普通客户" value="普通客户" />
            <el-option label="优质客户" value="优质客户" />
            <el-option label="劣质客户" value="劣质客户" />
          </el-select>
        </el-form-item>
        <el-button
          type="text"
          size="small"
          @click="loadCustomer(1)"
        >搜索</el-button>
      </el-form>
    </div>
    <!-- 表格 -->
    <!-- {{customerDataList.list}} -->
    <el-table
      v-loading="loading"
      size="small"
      :data="customerDataList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="序号"
        type="index"
        :index="1"
        width="55"
        align="center"
      />
      <el-table-column
        prop="cName"
        label="客户名称"
        width="100px"
        align="center"
      />
      <el-table-column
        prop="cCompany"
        label="公司名称"
        width="220px"
        align="left"
      />
      <el-table-column
        prop="cAddress"
        label="公司地址"
        align="left"
      />
      <el-table-column
        prop="cPhone"
        label="联系电话"
        width="130px"
        align="center"
      />
      <el-table-column
        prop="cDelete"
        label="状态"
        width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cDelete==0" size="mini">启用</el-tag>
          <el-tag v-else size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="cLevel" label="等级" width="110px" align="center" />
      <el-table-column
        label="接待人员"
        align="center"
        width="100px"
        prop="account.username"
      >
        <!-- <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            {{ scope.row.cUsaleId}}
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{scope.row.username}}</el-tag>
            </div>
          </el-popover>
        </template> -->
      </el-table-column>
      <el-table-column label="操作" align="center" width="150px" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.cDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.delete;
            }).length > 0"
            type="text"
            size="small"
            @click="toDelete(scope.row.cId)"
          >禁用</el-button>
          <el-button
            v-if="scope.row.cDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.saveOrUpdate;
            }).length > 0"
            type="text"
            size="small"
            @click="toEdit(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        small
        :current-page="param.page"
        :page-sizes="[2, 5, 8, 10, 20, 40, 80]"
        :page-size="param.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 抽屉 添加和修改客户信息-->
    <Briupdrawer
      :title="title"
      :drawer-visible="visible"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form
          ref="myForm"
          :model="form"
          :label-width="formLabelWidth"
          :rules="rules"
        >
          <el-form-item
            label="客户名称"
            :label-width="formLabelWidth"
            prop="cName"
          >
            <el-input
              v-model="form.cName"
              autocomplete="off"
              placeholder="请输入客户名称"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="客户等级"
            :label-width="formLabelWidth"
            prop="cLevel"
          >
            <el-select
              v-model="form.cLevel"
              placeholder="请选择客户等级"
              clearable
            >
              <el-option label="普通客户" value="普通客户" />
              <el-option label="优质客户" value="优质客户" />
              <el-option label="劣质客户" value="劣质客户" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="cPhone">
            <!--  oninput="value=value.replace(/(^1\d{10}$)|(^[0-9]\d{7}$)/,'')" -->
            <el-input
              v-model="form.cPhone"
              autocomplete="off"
              placeholder="请输入联系电话"
              clearable
            />
          </el-form-item>
          <el-form-item label="公司名称" prop="cCompany">
            <el-input
              v-model="form.cCompany"
              autocomplete="off"
              placeholder="请输入公司名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="公司地址" prop="cAddress">
            <el-input
              v-model="form.cAddress"
              autocomplete="off"
              placeholder="请输入公司地址"
              clearable
            />
          </el-form-item>
          <div v-if="roles.includes('admin')">
            <el-form-item
              label="角色(销售人员)"
              :label-width="formLabelWidth"
            >
              <!-- {{rolesData}} -->
              <el-select
                v-model="form.roleId"
                placeholder="请选择角色"
                @change="loadUserUByRoleId"
              >
                <el-option
                  v-for="item in rolesData"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="接待人员"
              :label-width="formLabelWidth"
            >
              <el-select v-model="form.cUsaleId" placeholder="请选择接待人员">
                <el-option
                  v-for="item in userUDataAll"
                  :key="item.accountId"
                  :label="item.username"
                  :value="item.accountId"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="handlerVisibleChange(false)"
        >取 消</el-button>
        <el-button type="primary" size="small" @click="toSave">确 定</el-button>
      </span>
    </Briupdrawer>
  </div>
</template>
<script>
import {
  deleteById,
  deleteByIdAll,
  query,
  findAllUser,
  saveOrUpdate
} from '@/api/ptsBase/customer.js'
import { findAll as findAllRoles } from '@/api/base/role'
import { findByRole } from '@/api/base/account'
import { mapGetters } from 'vuex'
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.customer,
      // 当前页面的按钮权限
      authsButton: [],
      // 设置电话号码为空
      cPhone: '',
      // 表格客户数据
      customerDataList: [],
      // 所有客户数据
      customerCData: [],
      // 所有角色数据
      rolesData: [],
      // 现有的接待人员数据
      userUData: [],
      // 所有的接待人员
      userUDataAll: [],
      // username:'',
      // 表单验证
      rules: {
        cName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        cLevel: [
          { required: true, message: '请选择客户等级', trigger: 'change' }
        ],
        cPhone: [{ required: true, message: '电话不能为空', trigger: 'blur' }],
        cCompany: [
          { required: true, message: '请选择公司名称', trigger: 'blur' }
        ],
        cAddress: [
          { required: true, message: '请选择公司地址', trigger: 'blur' }
        ]
      },
      // 表单控件宽度
      formLabelWidth: '120px',
      // 抽屉里面表单对象
      form: { cUsaleId: '' },
      // 控制抽屉的显示与隐藏
      visible: false,
      // 添加修改客户信息
      title: '',
      // // 表格数据
      // tableData: [],
      // 表格数据加载
      loading: 'false',
      // 分页多条件查询数据
      param: {
        page: 1,
        pageSize: 10
      },
      // 后台总数据
      total: 0,
      ids: [],
      username: ''
    }
  },
  computed: {
    ...mapGetters(['roles', 'user'])
  },
  created() {
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    this.loadCustomer()
    this.loadAllRoles()
  },
  methods: {
    /**
     * @description: 去修改客户信息
     * @param {*}
     * @return {*}
     */
    toEdit(record) {
      this.loadAllRoles()
      console.log(record)
      this.visible = true
      this.title = '修改客户信息'
      this.form = { ...record, roleId: record.account.roles[0].roleId }
      this.loadUserUByRoleId(record.account.roles[0].roleId, record.account.accountId,)
    },
    /**
     * @description: 去禁用
     * @param {*}
     * @return {*}
     */
    toDelete(cId) {
      this.$confirm('此操作将永久禁用该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 确认禁用
          const res = await deleteById(cId)
          this.$message({
            type: 'success',
            message: res.message
          })
          this.loadCustomer()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        })
    },
    /**
     * @description: 加载现有接待人员信息
     * @param {*}
     * @return {*}
     */
    async loadUserU() {
      const res = await findAllUser()
      this.userUData = res.data
    },
    /**
     * @description: 加载所有的接待人员角色信息
     * @param {*}
     * @return {*}
     */
    async loadAllRoles() {
      const res = await findAllRoles()
      // console.log(res);
      this.rolesData = res.data
    },
    /**
     * @description: 加载所有的接待人员角色的人员
     * @param {*}
     * @return {*}
     */
    async loadUserUByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId)
      // console.log(res)
      this.userUDataAll = res.data
      if (this.userUDataAll.length > 0) {
        this.form.cUsaleId = accountId || this.userUDataAll[0].accountId
      }
    },
    toSave() {
      this.$refs['myForm'].validate(async(valid) => {
        if (valid) {
          if (!this.roles.includes('admin')) {
            this.form.cUsaleId = this.user.accountId
          }
          // alert("submit!");
          // 发送保存请求
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          // console.log(res);
          this.$message({
            type: 'success',
            message: res.message
          })
          this.loadCustomer()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['myForm'].resetFields()
    },
    // 批量禁用
    toDelAll() {
      if (this.ids.length > 0) {
        this.$confirm('此操作将永久禁用该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            // 确认禁用
            const res = await deleteByIdAll(this.ids)
            this.$message({
              type: 'success',
              message: res.message
            })
            this.loadCustomer()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            })
          })
      }
    },
    /**
     * @description: 去添加
     * @param {*}
     * @return {*}
     */
    toAdd() {
      // 抽屉弹出
      this.visible = true
      // 标题
      this.title = '添加客户信息'
      this.form = { cUsaleId: '' }
    },

    /**
     * @description: 页码条数发生变化触发的函数
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.param.pageSize = pageSize
      // 重新发送分页查询数据请求
      this.loadCustomer()
    },
    /**
     * @description: 页码发生变化触发的函数
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      console.log(page)
      this.param.page = page
      // 重新发送分页查询数据请求
      this.loadCustomer()
    },
    // 表格选项发生变化触发的事件 --  批量禁用
    handleSelectionChange(val) {
      this.ids = val.map((item) => {
        return item.cId
      })
    },
    // 根据分页请求查询数据
    async loadCustomer(page) {
      this.loadUserU()
      if (page) {
        this.param.page = page
      }
      if (!this.roles.includes('admin')) {
        this.param.cUsaleId = this.user.accountId
      }
      const temp = { ...this.param }
      // console.log(temp);
      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }
      this.loading = true
      const res = await query(temp)
      // console.log(res);
      this.customerDataList = res.data.list
      // this.username=res.data.list.map((item)=>{
      //   console.log(item.account.username);
      //   // return item.account.username
      // })
      this.total = res.data.total
      this.loading = false
    }
  }
}
</script>
<style scoped>
</style>
