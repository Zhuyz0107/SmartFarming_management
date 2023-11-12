<!--
 * @Description: 指标记录
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 20:25:52
-->
<template>
  <div>
    <!-- {{ authsButton }} -->
    <!-- 表格和分页 -->
    <div class="btns">
      <el-form :inline="true" size="small">
        <el-button
          v-if="
            authsButton.filter(item => {
              return item.perms === perms.saveOrUpdate;
            }).length > 0
          "
          type="primary"
          size="small"
          @click="toAdd"
          >添加</el-button
        >
        <el-button
          v-if="
            authsButton.filter(item => {
              return item.perms === perms.deleteAll;
            }).length > 0
          "
          type="danger"
          size="small"
          style="margin-right: 10px"
          @click="toBatchDelete"
          >批量删除</el-button
        >
        <!-- <el-form-item>
          <el-input
            v-model="param.irdAnimalId"
            placeholder="请输入动物编号"
            clearable
          />
        </el-form-item> 
        <el-form-item>
          <el-select v-model="param.healthy" clearable placeholder="是否健康">
            <el-option label="健康" value="健康" />
            <el-option label="不健康" value="不健康" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="param.times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        -->
        <!-- 心率范围 -->
        <!-- <el-form-item>
          <el-input
            v-model="param.startHeartRate"
            class="range"
            placeholder="最低心率"
            clearable
          />
        </el-form-item>
        <div style="margin-top:10px;" />
        <el-form-item>
          <el-input
            v-model="param.endHeartRate"
            class="range"
            placeholder="最高心率"
            clearable
          />
        </el-form-item> -->
        <!-- 呼吸频率范围 -->
        <!-- <el-form-item>
          <el-input
            v-model="param.startBreathing"
            class="range"
            placeholder="呼吸最低频率"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.endBreathing"
            class="range"
            placeholder="呼吸最高频率"
            clearable
          />
        </el-form-item> -->
        <!-- 重量范围 -->
        <el-form-item>
          <el-input
            v-model="param.startWeight"
            class="range"
            placeholder="最低体重"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.endWeight"
            class="range"
            placeholder="最高体重"
            clearable
          />
        </el-form-item>
        <!-- 检测人员 -->
        <!-- <el-form-item v-if="roles.includes('admin')">
          <el-select
            v-model="param.irdUbreedId"
            clearable
            placeholder="检测人员"
          >
            <el-option
              v-for="item in recordMData"
              :key="item.accountId"
              :label="item.username"
              :value="item.accountId"
            />
          </el-select>
        </el-form-item> -->
        <el-button type="text" size="mini" @click="loadRecord(1)"
          >搜索</el-button
        >
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="recordListData.list"
      size="small"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" fixed />
      <el-table-column
        fixed
        align="center"
        type="index"
        :index="1"
        label="序号"
      />
      <el-table-column prop="irdAnimalId" label="动物编号" width="260" fixed />

      <el-table-column prop="irdTime" label="录入时间" width="160" />

      <el-table-column prop="irdHealthy" label="是否健康" />
      <el-table-column prop="irdWeight" label="体重">
        <template slot-scope="scope">
          {{ scope.row.irdWeight }} KG
        </template>
      </el-table-column>
      <el-table-column label="体温">
        <template slot-scope="scope">
          {{ scope.row.irdTemperature }} ℃
        </template>
      </el-table-column>
      <el-table-column label="呼吸频率">
        <template slot-scope="scope">
          {{ scope.row.irdBreathing }} 次/分
        </template>
      </el-table-column>
      <el-table-column label="心率">
        <template slot-scope="scope">
          {{ scope.row.irdHeartRate }} 次/分
        </template>
      </el-table-column>

      <!-- <el-table-column label="检测人员" width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>检测人员编号: {{ scope.row.baseAccount.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{
                scope.row.baseAccount.username
              }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter(item => {
                return item.perms === perms.delete;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.irdId)"
            >移除</el-button
          >
          <el-button
            v-if="
              authsButton.filter(item => {
                return item.perms === perms.saveOrUpdate;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toEdit(scope.row)"
            >修改</el-button
          >
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
        :current-page="param.pageNum"
        :page-sizes="[2, 10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->

    <!-- 抽屉 添加和修改指标记录信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="record_form" :model="form" :rules="rules">
          <el-form-item
            label="动物编号"
            :label-width="formLabelWidth"
            prop="irdAnimalId"
          >
            <el-input
              v-model="form.irdAnimalId"
              autocomplete="off"
              :readonly="title === '修改指标记录信息'"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="是否健康"
            :label-width="formLabelWidth"
            prop="irdHealthy"
          >
            <el-radio-group v-model="form.irdHealthy">
              <el-radio label="健康" />
              <el-radio label="不健康" />
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="体重(KG)"
            :label-width="formLabelWidth"
            prop="irdWeight"
          >
            <el-input v-model="form.irdWeight" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="体温(℃)"
            :label-width="formLabelWidth"
            prop="irdTemperature"
          >
            <el-input v-model="form.irdTemperature" autocomplete="off" />
          </el-form-item>

          <el-form-item
            label="呼吸频率(次/分)"
            :label-width="formLabelWidth"
            prop="irdBreathing"
          >
            <el-input v-model="form.irdBreathing" autocomplete="off" />
          </el-form-item>

          <el-form-item
            label="心率(次/分)"
            :label-width="formLabelWidth"
            prop="irdHeartRate"
          >
            <el-input v-model="form.irdHeartRate" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="录入时间"
            :label-width="formLabelWidth"
            prop="irdTime"
          >
            <el-date-picker
              v-model="form.irdTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <!-- <div v-if="roles.includes('admin')">
            <el-form-item
              label="角色(养殖人员)"
              :label-width="formLabelWidth"
              prop="roleId"
            >
              <el-select
                v-model="form.roleId"
                placeholder="请选择角色"
                @change="loadRecordMByRoleId"
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
              label="指标记录人员"
              :label-width="formLabelWidth"
              prop="irdUbreedId"
            >
              <el-select
                v-model="form.irdUbreedId"
                placeholder="请选择指标记录人员"
              >
                <el-option
                  v-for="item in recordMDataAll"
                  :key="item.accountId"
                  :label="item.username"
                  :value="item.accountId"
                />
              </el-select>
            </el-form-item>
          </div> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange(false)"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="toSave">确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
  </div>
</template>
<script>
import {
  findByOption,
  saveOrUpdate,
  delById,
  deleteByIdAll,
  findAllRecordAccount
} from "@/api/ptsOperational/indexRecord";
import { findAll as findAllRoles } from "@/api/base/role";
import { findByRole } from "@/api/base/account";
import { mapGetters } from "vuex";
// 按钮权限
import { getSubsByUrl, authsPerms } from "@/utils/common";
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.indexRecord,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 指标记录数据
      recordListData: [],
      // 所有指标记录现有检测人员数据
      recordMData: [],
      // 所有角色数据
      rolesData: [],
      // 所有的指标记录管理人员
      recordMDataAll: [],
      // 新增和修改模态框
      visible: false,
      // 标题
      title: "添加指标记录信息",
      // 新增和修改指标记录的数据
      form: { irdUbreedId: "" },
      // 表单标签宽度
      formLabelWidth: "140px",
      // 批量删除的数据
      ids: [],
      // 搜索的数据
      param: {
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        irdAnimalId: [
          { required: true, message: "请输入动物编号", trigger: "blur" }
        ],
        irdHealthy: [
          { required: true, message: "请选择是否健康", trigger: "change" }
        ],

        irdWeight: [
          { required: true, message: "请输入体重", trigger: "blur" }
          // { type: 'number', message: '体重要求为数值', trigger: 'blur' }
        ],

        irdTemperature: [
          { required: true, message: "请输入体温", trigger: "blur" }
          // { type: 'number', message: '体温要求为数值', trigger: 'blur' }
        ],

        irdBreathing: [
          { required: true, message: "请输入呼吸频率", trigger: "blur" }
          // { type: 'number', message: '呼吸频率要求为数值', trigger: 'blur' }
        ],

        irdHeartRate: [
          { required: true, message: "请输入心率", trigger: "blur" }
          // { type: 'number', message: '心率要求为数值', trigger: 'blur' }
        ],
        irdTime: [
          {
            type: "string",
            required: true,
            message: "请选择录入时间",
            trigger: "change"
          }
        ]
        /* roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        irdUbreedId: [
          { required: true, message: "请选择指标记录人员", trigger: "change" }
        ] */
      }
    };
  },
  computed: {
    ...mapGetters(["roles", "user"])
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs;
    // 加载数据
    this.loadRecord();
  },
  methods: {
    /**
     * @description: 加载指标记录信息
     * @param {*}
     * @return {*}
     */
    async loadRecord(pageNum) {
      // this.loadRecordM();
      if (pageNum) {
        this.param.pageNum = pageNum;
      }
      // 如果当前用户不是管理员角色，那么使用当前用户的id
      /* if (!this.roles.includes("admin")) {
        this.param.irdUbreedId = this.user.accountId;
      } */
      // 处理时间问题
      const obj = {
        ...this.param
      };
      this.loading = true;
      const res = await findByOption(obj);
      this.recordListData = res.data;
      this.loading = false;
    },
    /**
     * @description: 加载现有指标记录检测人员信息
     * @param {*}
     * @return {*}
     */
    /* async loadRecordM() {
      const res = await findAllRecordAccount();
      this.recordMData = res.data;
    }, */
    /**
     * @description: 加载所有的角色信息
     * @param {*}
     * @return {*}
     */
    /* async loadAllRoles() {
      const res = await findAllRoles();
      this.rolesData = res.data;
    }, */
    /**
     * @description: 加载所有的指标记录人员角色的人员
     * @param {*}
     * @return {*}
     */
    /* async loadRecordMByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId);
      this.recordMDataAll = res.data;
      if (this.recordMDataAll.length > 0) {
        this.form.irdUbreedId = accountId || this.recordMDataAll[0].accountId;
      }
    }, */
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      // this.loadAllRoles();
      this.form = {};
      this.title = "添加指标记录信息";
      this.visible = true;
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      // this.loadAllRoles();
      /* this.loadRecordMByRoleId(
        record.baseAccount.baseRole.roleId,
        record.baseAccount.accountId
      ); */
      this.form = {
        ...record
        // irdWeight: +record.irdWeight,
        // irdTemperature: +record.irdTemperature,
        // irdBreathing: +record.irdBreathing,
        // irdHeartRate: +record.irdHeartRate,
        // roleId: record.baseAccount.baseRole.roleId
      };
      this.title = "修改指标记录信息";
      this.visible = true;
    },
    /**
     * @description: 保存指标记录信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs["record_form"].validate(async valid => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          /* if (!this.roles.includes("admin")) {
            this.form.irdUbreedId = this.user.accountId;
          } */
          const res = await saveOrUpdate(this.form);
          this.handlerVisibleChange(false);
          this.$message({ message: res.message, type: "success" });
          if (this.title === "添加指标记录信息") {
            // 处理分页bug
            this.loadRecord(1);
          } else {
            this.loadRecord();
          }
        } else {
          return false;
        }
      });
    },
    /**
     * @description: 删除指标记录
     * @param {*} id 账户id
     * @return {*}
     */
    toDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await delById(id);
        this.$message({ type: "success", message: res.message });
        this.loadRecord();
      });
    },
    /**
     * @description: 批量删除指标记录
     * @param {*}
     * @return {*}
     */
    toBatchDelete() {
      if (this.ids.length > 0) {
        this.$confirm("此操作将批量删除选中的数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          const res = await deleteByIdAll(this.ids);
          this.$message({ type: "success", message: res.message });
          this.loadRecord();
        });
      } else {
        this.$message({ type: "warning", message: "请选择要批量删除的数据" });
      }
    },
    /**
     * @description: 当前页发生改变
     * @param {*} pageNum
     * @return {*}
     */
    currentChangeHandler(pageNum) {
      this.param.pageNum = pageNum;
      this.loadRecord();
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.pageNum = 1;
      this.param.pageSize = pageSize;
      this.loadRecord();
    },
    /**
     * @description: 表格多选切换
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.ids = val.map(item => item.irdId);
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val;
      this.$refs["record_form"].resetFields();
    }
  }
};
</script>
<style scoped lang="scss"></style>
