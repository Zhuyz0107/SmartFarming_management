<!--
 * @Description:  疫苗管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 19:59:08
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
            v-model="param.vVaccinesId"
            placeholder="请输入疫苗编号"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.vName"
            placeholder="请输入疫苗名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.vSupplier"
            placeholder="请输入供应商"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.vType"
            placeholder="请输入类型"
            clearable
          />
        </el-form-item>
        <el-button type="text" size="mini" @click="loadVaccines(1)">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="vaccinesData.list"
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
        prop="vVaccinesId"
        label="编号"
        width="260"
        fixed
      />
      <el-table-column
        prop="vName"
        label="名称"
        width="160"
        fixed
      />
      <el-table-column
        prop="vSupplier"
        label="供应商"
        width="200"
      />
      <el-table-column
        prop="vType"
        label="类型"
        width="100"
      />
      <el-table-column
        prop="vPrice"
        label="价格"
      >
        <template slot-scope="scope">
          {{ scope.row.vPrice }} 元
        </template>
      </el-table-column>
      <el-table-column
        prop="vTerm"
        label="限用日期"
        width="160"
      />
      <el-table-column
        prop="vTime"
        label="购入日期"
        width="160"
      />
      <el-table-column
        prop="vDelete"
        label="状态"
        width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.vDelete==0" size="mini">启用</el-tag>
          <el-tag v-else size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="vDesc"
        label="描述"
        width="300"
      />
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.vDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.delete;
            }).length > 0"
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.vVaccinesId)"
          >禁用</el-button>
          <el-button
            v-if="scope.row.vDelete==0 && authsButton.filter((item) => {
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
        :total="vaccinesData.total"
        :page-size="param.pageSize"
        :current-page="param.page"
        :page-sizes="[2,10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->

    <!-- 抽屉 添加和修改疫苗信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="vaccines_form" :model="form" :rules="rules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="vName">
            <el-input
              v-model="form.vName"
              autocomplete="off"
              clearable
            />
          </el-form-item>
          <el-form-item label="供应商" :label-width="formLabelWidth" prop="vSupplier">
            <el-input
              v-model="form.vSupplier"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth" prop="vType">
            <el-input
              v-model="form.vType"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="vPrice">
            <el-input
              v-model="form.vPrice"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="购入日期" :label-width="formLabelWidth" prop="vTime">
            <el-date-picker
              v-model="form.vTime"
              type="datetime"
              placeholder="选择购入日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="限用日期" :label-width="formLabelWidth" prop="vTerm">
            <el-date-picker
              v-model="form.vTerm"
              type="date"
              placeholder="选择限用日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="vDesc">
            <el-input
              v-model="form.vDesc"
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
  </div>
</template>
<script>
import { findByOption, saveOrUpdate, delById, deleteByIdAll } from '@/api/ptsBase/vaccines'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.vaccines,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 疫苗数据
      vaccinesData: [],
      // 新增和修改模态框
      visible: false,
      // 标题
      title: '添加疫苗信息',
      // 新增和修改疫苗的数据
      form: {},
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
        vName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        vSupplier: [
          { required: true, message: '请输入供应商', trigger: 'blur' }
        ],
        vPrice: [
          { required: true, message: '请输入价格', trigger: 'blur' }
          // { type: 'number', message: '价格要求为数值', trigger: 'blur' }
        ],
        vType: [
          { required: true, message: '请输入疫苗类型', trigger: 'blur' }
        ],
        vTime: [
          { required: true, message: '请选择购入时间', trigger: 'change' }
        ],
        vTerm: [
          { required: true, message: '请选择限用日期', trigger: 'change' }
        ]

      }
    }
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    // 加载数据
    this.loadVaccines()
  },
  methods: {
    /**
     * @description: 加载疫苗信息
     * @param {*}
     * @return {*}
     */
    async loadVaccines(page) {
      if (page) {
        this.param.page = page
      }
      this.loading = true
      const res = await findByOption(this.param)
      this.vaccinesData = res.data
      this.loading = false
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.form = {}
      this.title = '添加疫苗信息'
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
      this.title = '修改疫苗信息'
      this.visible = true
    },
    /**
     * @description: 保存疫苗信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['vaccines_form'].validate(async(valid) => {
        if (valid) {
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          if (this.title === '添加疫苗信息') {
            // 处理分页bug
            this.loadVaccines(1)
          } else {
            this.loadVaccines()
          }
        } else {
          return false
        }
      })
    },
    /**
     * @description: 禁用疫苗
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
        this.loadVaccines()
      })
    },
    /**
     * @description: 批量禁用疫苗
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
          this.loadVaccines()
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
      this.loadVaccines()
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.page = 1
      this.param.pageSize = pageSize
      this.loadVaccines()
    },
    /**
     * @description: 表格多选切换
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.ids = val.map(item => item.vVaccinesId)
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['vaccines_form'].resetFields()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
