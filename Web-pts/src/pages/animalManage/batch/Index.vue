<!--
 * @Description:  批次管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 19:50:41
-->
<template>
  <div>
    <!-- 第一行 -->
    <div class="btns">
      <!-- <el-row :gutter="20"> -->
      <el-form :inline="true" size="small">
        <el-button v-if="authsButton.filter((item) => {
          return item.perms === perms.saveOrUpdate;
        }).length > 0" type="primary" size="small" @click="toAdd">添加</el-button>
        <el-button v-if="authsButton.filter((item) => {
          return item.perms === perms.deleteAll;
        }).length > 0" type="danger" size="small" style="margin-right: 10px" @click="toBatch">批量删除</el-button>
        <el-form-item>
          <el-input v-model="param.bSerialId" style="display: inline-block; width: 150px" placeholder="请输入批次编号"
            size="small" clearable />
        </el-form-item>
        <el-date-picker v-model="param.time" type="datetimerange" :picker-options="pickerOptions1" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" align="right" style="width: 250px; margin-right: 10px"
          size="small" value-format="yyyy-MM-dd HH:mm:ss" />
        <el-form-item>
          <el-select v-model="param.bQuarantine" style="display: inline-block; width: 150px; margin-right: 10px" clearable
            placeholder="请选择是否检疫">
            <el-option label="已检疫" value="已检疫" />
            <el-option label="未检疫" value="未检疫" />
          </el-select>
          <el-select v-model="param.bQualified" style="display: inline-block; width: 150px" clearable
            placeholder="请选择是否合格">
            <el-option label="合格" value="合格" />
            <el-option label="不合格" value="不合格" />
          </el-select>
        </el-form-item>
        <el-button type="text" size="small" @click="loadBatch(1)">搜索</el-button>
      </el-form>
      <!-- </el-row> -->
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" size="small" :data="batch.list" style="width: 100%" border
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" :index="1" label="序号" width="60" align="center" fixed />
      <el-table-column prop="bSerialId" label="编号" width="250" align="center" fixed />
      <el-table-column prop="count" label="动物数量" width="80" align="center" />
      <el-table-column prop="astatus" label="状态" width="120" align="center" />
      <el-table-column prop="bQuarantine" label="是否检疫" align="center" />
      <el-table-column prop="bQualified" label="检疫是否合格" width="120" align="center" />
      <el-table-column prop="bQuarantineImg" label="检疫图片" align="center">
        <template slot-scope="scope">
          <img width="50px" :src="scope.row.bQuarantineImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="bTime" label="时间" align="center" width="180" />
      <el-table-column prop="bDesc" label="描述" align="center" width="150" />
      <el-table-column label="操作" align="center" width="150px" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="authsButton.filter((item) => {
            return item.perms === perms.delete;
          }).length > 0" type="text" size="mini" @click.prevent="toDelete(scope.row.bSerialId)">移除</el-button>
          <el-button v-if="authsButton.filter((item) => {
            return item.perms === perms.saveOrUpdate;
          }).length > 0" type="text" size="mini" @click.prevent="toEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination background small :current-page="param.page" :page-sizes="[2, 5, 8, 10, 20, 40, 80]"
        :page-size="param.pageSize" layout="total, prev, pager, next, sizes" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 抽屉 添加和修改批次信息-->
    <Briupdrawer :title="title" :drawer-visible="visible" width="40%" @on-change-visible="handlerVisibleChange">
      <div slot="content">
        <el-form ref="myForm" :model="form" :label-width="formLabelWidth" :rules="rules">
          <el-form-item label="批次描述" :label-width="formLabelWidth" prop="bDesc">
            <el-input v-model="form.bDesc" autocomplete="off" placeholder="请输入批次描述" clearable />
          </el-form-item>
          <el-form-item label="创建日期" prop="bTime">
            <el-date-picker v-model="form.bTime" type="datetime" placeholder="选择日期时间" align="right"
              value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions2" :label-width="formLabelWidth" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange(false)">取 消</el-button>
        <el-button type="primary" size="small" @click="toSave">确 定</el-button>
      </span>
    </Briupdrawer>
  </div>
</template>
<script>
import {
  findByOption,
  findAll,
  saveOrUpdate,
  delById,
  deleteByIdAll
} from '@/api/ptsBase/batch.js'
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.batch,
      // 当前页面的按钮权限
      authsButton: [],
      // 开始时间结束时间
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
      // 表格数据加载
      loading: 'false',
      // 表单名称
      title: '',
      // 表单校验
      rules: {
        bTime: [{ required: true, message: '请选择创建时间', trigger: 'blur' }]
      },
      // 表单控件宽度
      formLabelWidth: '80px',
      // 表单时间日期配置项
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
      // 抽屉里面表单对象
      form: {},
      // 控制抽屉的显示与隐藏
      visible: false,
      // 表格数据
      tableData: [],
      batch: '',
      // 存放vue变量batch
      param: {
        page: 1,
        pageSize: 10
      },
      // 后台总数据
      total: 0,
      // 所有批次
      batchAll: [],
      // 批量删除的所有id
      bSerialIds: []
    }
  },
  created() {
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    this.loadBatch()
    this.queryAll()
  },
  methods: {
    /**
     * @description: 批量删除
     * @param {*}
     * @return {*}
     */
    toBatch() {
      if (this.bSerialIds.length > 0) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            // 确认删除
            const res = await deleteByIdAll(this.bSerialIds)
            this.$message({
              type: 'success',
              message: res.message
            })
            this.loadBatch()
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
     * @description: 表格选项发生变化触发的事件
     * @param {*}
     * @return {*}
     */
    handleSelectionChange(val) {
      // console.log(val);
      this.bSerialIds = val.map((item) => {
        return item.bSerialId
      })
    },
    /**
     * @description: 去删除
     * @param {*}
     * @return {*}
     */
    toDelete(bSerialId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 确认删除
          const res = await delById(bSerialId)
          this.$message({
            type: 'success',
            message: res.message
          })
          this.loadBatch()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * @description: 去修改批次信息
     * @param {*}
     * @return {*}
     */
    toEdit(record) {
      this.visible = true
      this.title = '修改批次信息'
      this.form = { ...record }
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
      this.title = '添加批次'
      this.form = {}
    },

    /**
     * @description: 去保存
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['myForm'].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          // 发送保存请求
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          // console.log(res)
          this.$message({
            type: 'success',
            message: res.message
          })
          this.loadBatch()
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
    /**
     * @description: 查询所有批次
     * @param {*}
     * @return {*}
     */
    async queryAll() {
      const res = await findAll()
      // console.log(res)
      this.batchAll = res.data
    },
    /**
     * @description: 页码条数发生变化触发的函数
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      // console.log(pageSize)
      this.param.pageSize = pageSize
      // 重新发送分页查询数据请求
      this.loadBatch()
    },
    /**
     * @description: 页码发生变化触发的函数
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      // console.log(page)
      this.param.page = page
      // 重新发送分页查询数据请求
      this.loadBatch()
    },
    /**
     * @description: 根据分页请求查询数据
     * @param {*}
     * @return {*}
     */
    async loadBatch(page) {
      if (page) {
        this.param.page = page
      }
      const temp = { ...this.param }
      // console.log(temp)
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
      const res = await findByOption(temp)
      // console.log(res)
      this.batch = res.data
      this.total = res.data.total
      this.loading = false
    }
  }
}
</script>
