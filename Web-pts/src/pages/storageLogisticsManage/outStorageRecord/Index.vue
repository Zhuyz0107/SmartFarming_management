<!--
 * @Description: 出库登记
 * @Author: Ronda
 * @Date: 2022-04-02 11:01:11
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-08 18:07:14
-->
<template>
  <div>
    <!-- {{ authsButton }} -->
    <!-- 表格和分页 -->
    <div class="btns">
      <el-form :inline="true" size="small">
        <!-- 销售人员 -->
        <el-form-item>
          <el-select v-model="param.isrSaleId" clearable placeholder="销售人员">
            <el-option v-for="item in recordMData" :key="item.accountId" :label="item.username" :value="item.accountId" />
          </el-select>
        </el-form-item>
        <el-button type="text" size="mini" @click="loadRecord(1)">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="recordListData.list"
      size="small"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
        fixed
      />
      <el-table-column fixed align="center" type="index" :index="1" label="序号" />
      <el-table-column
        prop="isrId"
        label="订单编号"
        width="140"
        fixed
      />
      <el-table-column
        prop="managerCustomer.cCompany"
        label="客户名称"
        width="160"
      />
      <el-table-column
        label="销售人员"
        width="120"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>销售人员编号: {{ scope.row.account.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.account.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="isrNum"
        label="购买数量"
      >
        <template slot-scope="scope">
          {{ scope.row.isrNum }} 头
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="isrStatus"
      />
      <el-table-column
        prop="isrDeliver"
        label="预计交付时间"
        width="160"
      />
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <!-- v-if="
              authsButton.filter((item) => {
                return item.perms === perms.saveOrUpdate;
              }).length > 0
            " -->
          <el-button
            type="text"
            size="mini"
            @click.prevent="toOut(scope.row)"
          >出库</el-button>
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
        :total="recordListData.total"
        :page-size="param.pageSize"
        :current-page="param.page"
        :page-sizes="[2,10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->

    <!-- 抽屉 出库信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      title="出库信息"
      width="60%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-row>
          <el-col :span="12">
            <div v-loading="loadingAnimal">
              <h3 style="color:red">提示：如果有动物要出库可不勾选冷库，也可通过勾选冷库来选择该冷库下的所有动物。以下数据展示是在冷库中的动物。</h3>
              <!-- {{ animalData }} -->
              <!-- {{ checkedData }} -->
              <el-tree
                :data="animalData"
                :props="props"
                node-key="aAnimalId"
                show-checkbox
                :default-expanded-keys="animalData.length>0?[animalData[0].aAnimalId]:[]"
                @check-change="handleCheckChange"
              />
            </div>
          </el-col>
          <el-col style="border:1px solid #ccc; padding:10px;" :span="12">
            <div>已选择的动物：
              <span v-if="checkedData.length===0">暂无数据</span>
              <br>
              <br>
              <el-tag v-for="it in checkedData" :key="it.aAnimalId" style="margin:10px;">{{ it.aAnimalId }}</el-tag>
            </div>
            <el-form ref="out_form" :model="form" :rules="rules">
              <el-form-item label="出库时间" :label-width="formLabelWidth" prop="csrOutTime">
                <el-date-picker
                  v-model="form.csrOutTime"
                  type="datetime"
                  placeholder="选择出库时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-form>
          </el-col></el-row></div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange(false)">取 消</el-button>
        <el-button type="primary" size="small" @click="toSave">确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
  </div>
</template>
<script>
import { findByOption, findAllRecordAccount } from '@/api/ptsOperational/issueRecord'
import { queryAll as findAllAnimal, saveOrUpdate } from '@/api/ptsOperational/outStorageRecord'
// 按钮权限
// import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      // perms: authsPerms.user,
      // 当前页面的按钮权限
      // authsButton: [],
      // 搜索的数据
      param: {
        page: 1,
        pageSize: 10,
        isrStatus: '申请中'
      },
      // 表格数据加载中
      loading: false,
      // 出单记录数据
      recordListData: [],
      // 所有出单现有销售人员数据
      recordMData: [],

      // 冷库中的动物加载中
      loadingAnimal: false,
      // 出库模态框
      visible: false,
      // 待出库的动物的信息
      animalData: [],
      // 已选择的待出库的动物
      checkedData: [],
      // 出库信息相关
      props: {
        label: 'aAnimalId',
        children: 'managerAnimals'
      },
      // 出单信息
      form: {
        animals: [],
        csrOutTime: '',
        isrId: ''
      },
      // 表单标签宽度
      formLabelWidth: '80px',
      rules: {
        csrOutTime: [
          { type: 'string', required: true, message: '请选择出库时间', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    // this.authsButton = getSubsByUrl(this.$route.path).subs
    // 加载数据
    this.loadRecord()
  },
  methods: {
    /**
     * @description: 加载出单记录信息
     * @param {*}
     * @return {*}
     */
    async loadRecord(page) {
      this.loadRecordM()
      if (page) {
        this.param.page = page
      }
      this.loading = true
      const res = await findByOption(this.param)
      this.recordListData = res.data
      this.loading = false
    },
    /**
     * @description: 加载现有销售人员信息
     * @param {*}
     * @return {*}
     */
    async loadRecordM() {
      const res = await findAllRecordAccount()
      this.recordMData = res.data
    },
    /**
     * @description: 加载冷库的动物信息
     * @param {*}
     * @return {*}
     */
    async loadAnimal() {
      this.loadingAnimal = true
      const res = await findAllAnimal()
      res.data.forEach(item => {
        item.aAnimalId = item.fzName
        item.checked = false
        item.managerAnimals.forEach(it => { it.checked = false })
      })
      this.coldAnimalData = res
      this.animalData = res.data
      this.loadingAnimal = false
    },
    /**
     * @description: 出库按钮
     * @param {*} record
     * @return {*}
     */
    toOut(record) {
      this.loadAnimal()
      this.form = {
        animals: [],
        csrOutTime: '',
        isrId: record.isrId,
        num: record.isrNum
      }
      this.visible = true
    },
    /**
     * @description: 保存出单记录信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      if (this.checkedData.length === 0) {
        this.$message({ message: '请选择要出库的动物', type: 'warning' })
        return
      }
      if (this.checkedData.length !== this.form.num) {
        this.$message({ message: `需要${this.form.num}头猪`, type: 'warning' })
        return
      }
      this.$refs['out_form'].validate(async(valid) => {
        if (valid) {
          // 处理处理
          this.form.animals = this.checkedData.map(item => item.aAnimalId)
          const res = await saveOrUpdate(this.form)
          this.handlerVisibleChange(false)
          this.$message({ message: res.message, type: 'success' })
          this.loadRecord()
        } else {
          return false
        }
      })
    },
    /**
     * @description: 当前页发生改变
     * @param {*} page
     * @return {*}
     */
    currentChangeHandler(page) {
      this.param.page = page
      this.loadRecord()
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.page = 1
      this.param.pageSize = pageSize
      this.loadRecord()
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val
      this.$refs['out_form'].resetFields()
    },
    /**
     * @description: 选择猪
     * @param {*} data
     * @param {*} checked
     * @param {*} indeterminate
     * @return {*}
     */
    handleCheckChange(data, checked, indeterminate) {
      // console.log(JSON.stringify(data), checked, indeterminate)
      data.checked = checked
      const temp = JSON.parse(JSON.stringify(this.animalData))
      this.checkedData = []
      temp.forEach(item => {
        this.checkedData = this.checkedData.concat(item.managerAnimals.filter(it => it.checked))
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
