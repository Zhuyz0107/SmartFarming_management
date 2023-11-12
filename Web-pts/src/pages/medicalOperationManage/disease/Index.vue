<!--
 * @Description:  病症管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 20:01:47
-->
<template>
  <div>
    <div class="btns">
      <!-- 第一行 -->
      <el-form size="small" :inline="true">
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
          @click="toBatch"
        >批量禁用</el-button>
        <el-form-item>
          <el-input
            v-model="param.dId"
            placeholder="请输入病症编号"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.dName"
            placeholder="请输入病症名称"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="param.dType"
            placeholder="请选择病症类型"
            clearable
          >
            <!-- 普通病症、意外损伤、发育不良、瘟疫、其他 -->
            <el-option label="普通病症" value="普通病症" />
            <el-option label="意外损伤" value="意外损伤" />
            <el-option label="发育不良" value="发育不良" />
            <el-option label="瘟疫" value="瘟疫" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-button
          type="text"
          size="mini"
          @click="loadDisease(1)"
        >搜索</el-button>
      </el-form>
    </div>

    <!-- 第二行表格 -->
    <el-table
      size="small"
      :data="diseaseList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="dName" label="名称" width="120" />
      <el-table-column prop="dType" label="类型" width="140" />
      <el-table-column prop="dEtiology" label="病源" width="140" />
      <el-table-column prop="dSymptom" label="症状" width="180" />
      <el-table-column
        prop="dDelete"
        label="状态"
        width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.dDelete==0" size="mini">启用</el-tag>
          <el-tag v-else size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dPrevention" label="预防方式" />
      <el-table-column prop="dDesc" label="描述" />
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.dDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.delete;
            }).length > 0"
            type="text"
            size="small"
            @click="toDelete(scope.row.dId)"
          >禁用</el-button>
          <el-button
            v-if="scope.row.dDelete==0 && authsButton.filter((item) => {
              return item.perms===perms.saveOrUpdate;
            }).length > 0"
            type="text"
            size="small"
            @click="toEdit(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮 -->
    <div class="page">
      <el-pagination
        background
        :current-page="param.page"
        :page-sizes="[2, 5, 6, 10, 20, 50, 80]"
        :page-size="param.pageSize"
        layout="total,  prev, pager, next ,sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 抽屉 -->
    <Briupdrawer
      :title="title"
      :drawer-visible="visible"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="dForm" :model="form" :rules="rules">
          <el-form-item
            label="病症名称"
            :label-width="formLabelWidth"
            prop="dName"
          >
            <el-input v-model="form.dName" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="病症类型"
            :label-width="formLabelWidth"
            prop="dType"
          >
            <el-radio-group v-model="form.dType">
              <el-radio
                label="普通病症"
              />
              <el-radio
                label="意外损伤"
              />
              <el-radio
                label="发育不良"
              />
              <el-radio
                label="瘟疫"
              />
              <el-radio
                label="其他"
              />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="病症病源" :label-width="formLabelWidth">
            <el-input v-model="form.dEtiology" autocomplete="off" />
          </el-form-item>
          <el-form-item label="病症症状" :label-width="formLabelWidth">
            <el-input v-model="form.dSymptom" autocomplete="off" />
          </el-form-item>
          <el-form-item label="预防方式" :label-width="formLabelWidth">
            <el-input v-model="form.dPrevention" autocomplete="off" />
          </el-form-item>
          <el-form-item label="病症描述" :label-width="formLabelWidth">
            <el-input v-model="form.dDesc" autocomplete="off" />
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
  deleteAllByIds,
  deleteById,
  saveOrUpdate
} from '@/api/ptsBase/disease'
import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.disease,
      // 当前页面的按钮权限
      authsButton: [],
      form: {},
      radio: '1',
      formLabelWidth: '80px',
      visible: false,
      diseaseList: [],
      title: '',
      param: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      dIds: [],
      rules: {
        dName: [{ required: true, message: '请输入病症名称', trigger: 'blur' }],
        dType: [{ required: true, message: '请选择病症类型', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs
    this.loadDisease()
  },
  methods: {
    /**
     * @Author: [kangjie]
     * @description: 去修改
     * @param {*}
     * @return {*}
     */
    toEdit(record) {
      this.title = '修改病症信息'
      this.visible = true
      this.form = { ...record }
    },
    /**
     * @Author: [kangjie]
     * @description: 添加
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.title = '添加病症信息'
      this.form = {}
      this.visible = true
    },
    /**
     * @Author: [kangjie]
     * @description: 去保存
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs['dForm'].validate(async(valid) => {
        if (valid) {
          // alert("submit!");
          const res = await saveOrUpdate(this.form)
          this.$message({
            type: 'success',
            message: res.message
          })
          this.visible = false
          this.loadDisease()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @Author: [kangjie]
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*}
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['dForm'].resetFields()
    },
    /**
     * @Author: [kangjie]
     * @description: 批量禁用
     * @param {*}
     * @return {*}
     */
    toBatch() {
      if (this.dIds.length > 0) {
        this.$confirm('此操作将永久禁用该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            const res = await deleteAllByIds(this.dIds)
            this.$message({
              type: 'success',
              message: res.message
            })
            this.loadDisease()
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
     * @Author: [kangjie]
     * @description: 给表格多选框绑定事件
     * @param {*}
     * @return {*}
     */
    handleSelectionChange(val) {
      this.dIds = val.map((item) => {
        return item.dId
      })
    },
    /**
     * @Author: [kangjie]
     * @description: 给禁用按钮绑定事件
     * @param {*}
     * @return {*}
     */
    toDelete(id) {
      this.$confirm('此操作将永久禁用该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteById(id)
          this.$message({
            type: 'success',
            message: res.message
          })
          this.loadDisease()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        })
    },
    /**
     * @Author: [kangjie]
     * @description: 处理分页函数
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.param.page = page
      this.loadDisease()
    },
    /**
     * @Author: [kangjie]
     * @description: 处理条数变化函数
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      this.param.pageSize = pageSize
      this.param.page = 1
      this.loadDisease()
    },
    /**
     * @Author: [kangjie]
     * @description: 加载病症信息
     * @param {*}
     * @return {*}
     */
    async loadDisease(page) {
      if (page) {
        this.param.page = page
      }
      const temp = { ...this.param }
      for (const key in temp) {
        if (!temp[key]) {
          delete temp[key]
        }
      }
      const res = await query(temp)
      this.diseaseList = res.data.list
      this.total = res.data.total
      // console.log(res)
    }
  }
}
</script>
<style scoped>
</style>
