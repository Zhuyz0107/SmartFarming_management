<!--
 * @Description: 系统日志页面
 * @Author: Ronda
 * @Date: 2022-03-08 14:50:55
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 23:37:13
-->
<template>
  <div>
    <!-- 按钮 -->
    <div class="btns">
      <div style="margin-bottom: 0.5em">
        <el-form size="small" :inline="true">
          <el-form-item label="IP地址" label-width="60px" prop="roleName">
            <el-input v-model="optionParam.originalIp" autocomplete="off" />
          </el-form-item>
          <!-- <el-date-picker
            v-model="optionParam.begin"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          /> -->
          <el-form-item>
            <el-button
              v-if="
                authsButton.filter(item => {
                  return item.perms.indexOf(perms.search) > -1;
                }).length > 0
              "
              size="small"
              type="primary"
              @click="toSearch"
            >
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 数据 -->
    <el-table v-loading="loading" border :data="logsData.list" size="small">
      <el-table-column
        type="index"
        :index="1"
        label="序号"
        align="center"
        fixed="left"
      />
      <el-table-column
        prop="logUsername"
        label="操作者"
        width="100"
        align="center"
        fixed="left"
      />
      <el-table-column
        prop="logRealname"
        label="真实姓名"
        width="100"
        align="center"
        fixed="left"
      />
      <el-table-column
        label="IP地址"
        prop="logHost"
        align="center"
        fixed="left"
      />
      <el-table-column
        label="请求方式"
        prop="logRequestMethod"
        width="100"
        align="center"
      />
      <el-table-column
        label="操作路径"
        prop="logRequestUri"
        align="center"
        fixed="left"
      />
      <!--  <el-table-column
        label="访问模块"
        prop="modular"
        width="120"
        align="center"
        fixed="left"
      /> -->
      <el-table-column label="访问时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.logTime | fmtTime }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        layout="total,prev, pager, next,sizes"
        small
        :total="logsData.total"
        :page-size="optionParam.pageSize"
        :current-page="optionParam.pageNum"
        :page-sizes="[10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
  </div>
</template>

<script>
import { findByOption } from "@/api/base/logs";
// 按钮权限
import { getSubsByUrl, authsPerms } from "@/utils/common";
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.logs,
      // 当前页面的按钮权限
      authsButton: [],
      // 加载中
      loading: false,
      // 日志数据
      logsData: {},
      // 搜索条件信息
      optionParam: {
        pageNum: 1,
        pageSize: 15
      }
    };
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs;
    this.loadLogs();
  },
  methods: {
    /**
     * @description: 搜索按钮
     * @param {*}
     * @return {*}
     */
    toSearch() {
      this.optionParam.pageNum = 1;
      this.loadLogs();
    },

    /**
     * @description: 加载日志信息
     * @param {*}
     * @return {*}
     */
    async loadLogs() {
      this.loading = true;
      const res = await findByOption(this.optionParam);
      this.logsData = res.data;
      this.loading = false;
    },
    /**
     * @description: 页码发生变化
     * @param {*} page 页码
     * @return {*}
     */
    currentChangeHandler(page) {
      this.optionParam.pageNum = page;
      this.loadLogs();
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.optionParam.pageNum = 1;
      this.optionParam.pageSize = pageSize;
      this.loadLogs();
    }
  }
};
</script>
