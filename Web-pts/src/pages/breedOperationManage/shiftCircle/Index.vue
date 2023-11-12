<!--
 * @Description: 移圈记录
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 20:11:09
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
        >批量删除</el-button>
        <el-form-item>
          <el-input
            v-model="param.scAnimalId"
            placeholder="请输入动物编号"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="roles.includes('admin')">
          <el-select
            v-model="param.scUbreedId"
            placeholder="请选择移圈人员"
            clearable
          >
            <el-option
              v-for="item in shiftData"
              :key="item.accountId"
              :label="item.username"
              :value="item.accountId"
            />
          </el-select>
        </el-form-item>
        <el-date-picker
          v-model="param.time"
          type="datetimerange"
          :picker-options="pickerOptions1"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          style="width: 250px; margin-right: 10px"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        <el-form-item>
          <el-input
            v-model="param.scReason"
            placeholder="请输入移圈原因"
            clearable
          />
        </el-form-item>

        <el-button
          type="text"
          size="small"
          @click="loadShiftCircle(1)"
        >搜索</el-button>
      </el-form>
    </div>
    <!-- {{shiftCircle.list}} -->
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      size="small"
      :data="shiftCircleList"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        type="index"
        :index="1"
        label="序号"
        width="60"
        align="center"
        fixed
      />
      <el-table-column
        prop="scAnimalId"
        label="动物编号"
        width="260"
        align="left"
        fixed
      />

      <el-table-column
        prop="newManagerHurdlesExtend.hName"
        label="旧圈"
        width="80"
        align="center"
      />
      <el-table-column
        prop="oldManagerHurdlesExtend.hName"
        label="新圈"
        width="80"
        align="center"
      />
      <el-table-column
        prop="account.username"
        label="移圈人员"
        width="120"
        align="center"
      />

      <el-table-column prop="scTime" label="时间" align="center" />
      <el-table-column prop="scReason" label="移圈原因" align="center" />
      <el-table-column label="操作" align="center" width="150px" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="authsButton.filter((item) => {
              return item.perms === perms.delete;
            }).length > 0"
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.scId)"
          >移除</el-button>
          <el-button
            v-if="authsButton.filter((item) => {
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
    <!-- 抽屉 添加和修改移圈信息-->
    <Briupdrawer
      :title="title"
      :drawer-visible="visible"
      width="50%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <!-- {{ form }} -->
        <!--  :inline="true" -->
        <el-form
          ref="myForm"
          size="small"
          :model="form"
          :label-width="formLabelWidth"
          :rules="rules"
        >
          <el-row>
            <el-col :span="18">
              <el-form-item
                label="动物编号"
                :label-width="formLabelWidth"
                prop="scAnimalId"
              >
                <el-input
                  v-model="form.scAnimalId"
                  style="width: 310px; display: inline-block"
                  autocomplete="off"
                  placeholder="请输入动物编号"
                  clearable
                  :disabled="current"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button
                v-if="title == '添加移圈信息'"
                size="small"
                type="text"
                @click="toSearch"
              >搜索</el-button>
            </el-col>
          </el-row>
          <!-- <el-form :inline="true"> -->
          <el-form-item label="旧圈" :label-width="formLabelWidth">
            <el-select
              v-model="form.scOriginalHurdlesId"
              placeholder="请选择旧圈"
              clearable
              :disabled="current1"
            >
              <el-option
                v-for="item in Circle"
                :key="item.hId"
                :label="
                  item.hName +
                    '-' +
                    (item.managerFenceHouse
                      ? item.managerFenceHouse.fhName
                      : '')
                "
                :value="item.hId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="新圈">
            <el-select
              v-model="form.scNewHurdlesId"
              placeholder="请选择新圈"
              clearable
            >
              <el-option
                v-for="item in Circle"
                :key="item.hId"
                :label="
                  item.hName +
                    '-' +
                    (item.managerFenceHouse
                      ? item.managerFenceHouse.fhName
                      : '')
                "
                :value="item.hId"
              />
            </el-select>
          </el-form-item>
          <!-- </el-form> -->
          <div v-if="roles.includes('admin')">
            <el-form-item label="角色(养殖人员)" :label-width="formLabelWidth">
              <!-- {{rolesData}} -->
              <el-select
                v-model="form.roleId"
                placeholder="请选择角色"
                @change="loadShiftByRoleId"
              >
                <el-option
                  v-for="item in rolesData"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="移圈人员" :label-width="formLabelWidth">
              <el-select v-model="form.scUbreedId" placeholder="请选择移圈人员">
                <el-option
                  v-for="item in shiftDataAll"
                  :key="item.accountId"
                  :label="item.username"
                  :value="item.accountId"
                />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="创建日期" prop="scTime">
            <el-date-picker
              v-model="form.scTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions2"
              :label-width="formLabelWidth"
            />
          </el-form-item>
          <el-form-item
            label="移圈原因"
            :label-width="formLabelWidth"
            prop="scReason"
          >
            <el-input
              v-model="form.scReason"
              placeholder="请输入移圈原因"
              type="textarea"
              :rows="2"
              autocomplete="off"
              clearable
            />
          </el-form-item>
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
  query,
  delById,
  delByIdAll,
  findAllUser,
  saveOrUpdate
} from '@/api/ptsOperational/shiftCircle.js'
import { findAll as findAllRoles } from '@/api/base/role'
import { findByRole } from '@/api/base/account'
import { findAll } from '@/api/ptsBase/hurdles.js'
import { findByAnimalId } from '@/api/ptsBase/animal'
import { mapGetters } from 'vuex'
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.shiftCircle,
      // 当前页面的按钮权限
      authsButton: [],
      // 表单时间日期配置项
      current1: false,
      current: false,
      pickerOptions2: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      // 旧圈列表
      Circle: [],
      // 所有移圈记录现有移圈人员数据
      shiftData: [],
      // 所有的移圈人员
      shiftDataAll: [],
      // 所有角色数据
      rolesData: [],
      // 表单校验
      rules: {
        scAnimalId: [
          { required: true, message: '请选择动物编号', trigger: 'blur' }
        ]
      },
      // 添加修改信息
      title: '',
      // 表单控件宽度
      formLabelWidth: '120px',
      // 抽屉里面表单对象
      form: {
        scUbreedId: ''
      },
      // 控制抽屉的显示与隐藏
      visible: false,
      // 后台总数据
      tableData: [],
      total: 0,
      // 表格数据加载
      loading: 'false',
      // 表格数据
      shiftCircleList: [],
      // 搜索框开始结束时间
      pickerOptions1: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 所有移圈人员数据
      AccountAData: [],
      // 动物编号
      animalId: '',
      param: {
        page: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters(['roles', 'user'])
  },
  created() {
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    this.loadShiftCircle()
    this.loadAllRoles()
    this.findAll()
  },
  methods: {
    /**
     * @description: 表单中的搜索
     * @param {*}
     * @return {*}
     */
    async toSearch() {
      this.animalId = this.form.scAnimalId
      const res = await findByAnimalId(this.animalId)
      this.form = {
        ...this.form,
        scOriginalHurdlesId: res.data.aHurdlesId
      }
    },
    /**
     * @description: 请求所有旧圈信息
     * @param {*}
     * @return {*}
     */
    async findAll() {
      const res = await findAll()
      this.Circle = res.data
      // console.log(this.Circle);
    },
    /**
     * @description: 加载现有移圈记录移圈人员信息
     * @param {*}
     * @return {*}
     */
    async loadShift() {
      const res = await findAllUser()
      this.shiftData = res.data
    },
    /**
     * @description: 加载所有的移圈人员角色信息
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
    async loadShiftByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId)
      // console.log(res);
      this.shiftDataAll = res.data
      if (this.shiftDataAll.length > 0) {
        this.form.scUbreedId = accountId || this.shiftDataAll[0].accountId
      }
    },
    /**
     * @description: 去保存
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['myForm'].validate(async(valid) => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          if (!this.roles.includes('admin')) {
            this.form.scUbreedId = this.user.accountId
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
          this.loadShiftCircle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description: 去修改移圈信息
     * @param {*}
     * @return {*}
     */
    toEdit(record) {
      this.current1 = true
      this.current = true
      this.loadAllRoles()
      // console.log(record)
      this.visible = true
      this.title = '修改移圈信息'
      this.form = { ...record, roleId: record.account.roles[0].roleId }
      this.loadShiftByRoleId(
        record.account.roles[0].roleId,
        record.account.accountId
      )
    },
    /**
     * @description: 批量删除
     * @param {*}
     * @return {*}
     */
    toDelAll() {
      if (this.ids.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            // 确认删除
            const res = await delByIdAll(this.ids)
            this.$message({
              type: 'success',
              message: res.message
            })
            this.loadShiftCircle()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
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
      this.current1 = false
      this.current = false
      // 抽屉弹出
      this.visible = true
      // 标题
      this.title = '添加移圈信息'
      this.form = { scUbreedId: '' }
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
    /**
     * @description: 页码条数发生变化触发的函数
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.param.pageSize = pageSize
      // 重新发送分页查询数据请求
      this.loadShiftCircle()
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
      this.loadShiftCircle()
    },
    /**
     * @description: 表格选项发生变化触发的事件
     * @param {*}
     * @return {*}
     */
    handleSelectionChange(val) {
      // console.log(val);
      this.ids = val.map((item) => {
        return item.scid
      })
    },
    /**
     * @description: 去删除
     * @param {*}
     * @return {*}
     */
    toDelete(scId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 确认删除
          const res = await delById(scId)
          this.$message({
            type: 'success',
            message: res.message
          })
          this.loadShiftCircle()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * @description: 根据分页请求查询数据
     * @param {*}
     * @return {*}
     */
    async loadShiftCircle(page) {
      this.loadShift()
      if (page) {
        this.param.page = page
      }
      // 如果当前用户不是管理员角色，那么使用当前用户的id
      if (!this.roles.includes('admin')) {
        this.param.scUbreedId = this.user.accountId
      }

      const temp = { ...this.param }
      if (temp.time) {
        temp.startTime = temp.time[0]
        temp.endTime = temp.time[1]
        delete temp.time
      }
      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }
      this.loading = true
      const res = await query(temp)
      // console.log(res);
      this.shiftCircleList = res.data.list
      this.total = res.data.total
      this.loading = false
    }
  }
}
</script>
<style scoped>
</style>
