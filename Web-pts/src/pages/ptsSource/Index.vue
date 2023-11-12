<!--
 * @Description: 溯源查询
 * @Author: Ronda
 * @Date: 2022-04-14 17:05:23
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-14 17:12:35
-->
<template>
  <div>
    <!-- {{ authsButton }} -->
    <!-- 表格和分页 -->
    <div class="btns">
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-select v-model="param.aBatchId" clearable placeholder="所属批次">
            <el-option v-for="item in batchData" :key="item.bSerialId" :label="item.bSerialId" :value="item.bSerialId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.aHurdlesId" clearable placeholder="所属栏圈">
            <el-option v-for="item in hurdlesData" :key="item.hId" :label="item.hName+'-'+(item.managerFenceHouse?item.managerFenceHouse.fhName:'')" :value="item.hId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.aHealthy" clearable placeholder="健康状态">
            <el-option label="健康" value="健康" />
            <el-option label="生病" value="生病" />
          </el-select>
        </el-form-item>
        <el-button type="text" size="mini" @click="loadAnimal(1)">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="animalData.list"
      size="small"
    >
      <el-table-column align="center" type="index" :index="1" label="序号" />
      <el-table-column
        prop="aAnimalId"
        label="编号"
        width="260"
      />
      <el-table-column
        label="二维码"
        prop="aBackup3"
      >
        <template slot-scope="scope">
          <el-popover v-if="scope.row.aBackup3" size="mini" trigger="hover" placement="top">
            <img style="width:100px;height:100px" :src="scope.row.aBackup3" alt="">
            <div slot="reference" class="name-wrapper">
              <img style="width:50px;height:50px" :src="scope.row.aBackup3" alt="">
            </div>
          </el-popover>
          <div v-else>暂无</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aBatchId"
        label="所属批次"
        width="260"
      />
      <el-table-column
        prop="aHealthy"
        label="健康状态"
      />

      <el-table-column
        label="所属栏圈"
        width="140"
      >
        <template slot-scope="scope">
          <el-popover size="mini" trigger="hover" placement="top">
            <p>栏圈名称: {{ scope.row.managerHurdles.hName }}</p>
            <p>栏圈编号: {{ scope.row.managerHurdles.hId }}</p>
            <p>所属栏舍: {{ scope.row.managerHurdles.managerFenceHouse?scope.row.managerHurdles.managerFenceHouse.fhName:'' }}</p>
            <p>栏舍编号: {{ scope.row.managerHurdles.hFenceId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.managerHurdles.hName }}-{{ scope.row.managerHurdles.managerFenceHouse?scope.row.managerHurdles.managerFenceHouse.fhName:'' }}</el-tag>
            </div>
          </el-popover>
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
        :total="animalData.total"
        :page-size="param.pageSize"
        :current-page="param.page"
        :page-sizes="[2,10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->
  </div>
</template>
<script>
import { findByOption } from '@/api/ptsBase/animal'
import { findAll as findAllBatch } from '@/api/ptsBase/batch'
import { findAll as findAllHurdles } from '@/api/ptsBase/hurdles'
// 按钮权限
// import { getSubsByUrl, authsPerms } from '@/utils/common'
export default {
  data() {
    return {
      // 静态按钮权限列表
      // perms: authsPerms.user,
      // 当前页面的按钮权限
      // authsButton: [],
      // 表格数据加载中
      loading: false,
      // 动物数据
      animalData: [],
      // 所有批次数据
      batchData: [],
      // 所有栏圈数据
      hurdlesData: [],
      // 搜索的数据
      param: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    // this.authsButton = getSubsByUrl(this.$route.path).subs
    // 加载数据
    this.loadAnimal()
    this.loadAllBatch()
    this.loadAllHurdles()
  },
  methods: {
    /**
     * @description: 加载动物信息
     * @param {*}
     * @return {*}
     */
    async loadAnimal(page) {
      if (page) {
        this.param.page = page
      }
      this.loading = true
      const res = await findByOption(this.param)
      this.animalData = res.data
      this.loading = false
    },
    /**
     * @description: 查找所有批次
     * @param {*}
     * @return {*}
     */
    async loadAllBatch() {
      const res = await findAllBatch()
      this.batchData = res.data
    },
    /**
     * @description: 查找所有栏圈
     * @param {*}
     * @return {*}
     */
    async loadAllHurdles() {
      const res = await findAllHurdles()
      this.hurdlesData = res.data
    },
    /**
     * @description: 当前页发生改变
     * @param {*} page
     * @return {*}
     */
    currentChangeHandler(page) {
      this.param.page = page
      this.loadAnimal()
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.page = 1
      this.param.pageSize = pageSize
      this.loadAnimal()
    }
  }
}
</script>
<style scoped lang="scss">

</style>
