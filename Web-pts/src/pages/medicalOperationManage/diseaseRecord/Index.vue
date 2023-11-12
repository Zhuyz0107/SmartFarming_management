<!--
 * @Description: 病症记录
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-25 09:10:19
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
        <!--  <el-form-item>
          <el-input
            v-model="param.drAnimalId"
            placeholder="请输入动物编号"
            clearable
          />
        </el-form-item> -->

        <el-form-item>
          <el-select v-model="param.drDId" clearable placeholder="病症">
            <el-option
              v-for="item in diseaseData"
              :key="item.dId"
              :label="item.dName"
              :value="item.dId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.drStatus" clearable placeholder="治疗状态">
            <el-option label="未治疗" value="未治疗" />
            <el-option label="治疗中" value="治疗中" />
            <el-option label="已治疗" value="已治疗" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item>
          <el-date-picker
            v-model="param.times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item> -->

        <!-- 医护人员 -->
        <!-- <el-form-item v-if="roles.includes('admin')">
          <el-select v-model="param.drUdockerId" clearable placeholder="医护人员">
            <el-option v-for="item in recordMData" :key="item.accountId" :label="item.username" :value="item.accountId" />
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
      <el-table-column prop="drAnimalId" label="动物编号" width="260" fixed />
      <el-table-column label="病症编号/病症名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.disease.dId }} / {{ scope.row.disease.dName }}
        </template>
      </el-table-column>
      <el-table-column prop="drDesc" label="病症描述" width="250" />
      <el-table-column prop="drCure" label="治疗过程" width="250" />
      <el-table-column prop="drTime" label="录入时间" width="160" />
      <el-table-column prop="drStatus" label="状态" />

      <!-- <el-table-column label="医护人员" width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>医护人员编号: {{ scope.row.account.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.account.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" align="center" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="
              authsButton.filter(item => {
                return item.perms === perms.delete;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.drId)"
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
          <!-- <el-button
            v-if="
              authsButton.filter(item => {
                return item.perms === perms.cure;
              }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toCure(scope.row)"
            >诊疗记录</el-button
          > -->
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

    <!-- 抽屉 添加和修改病症记录信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="d_record_form" :model="form" :rules="rules">
          <el-form-item
            label="动物编号"
            :label-width="formLabelWidth"
            prop="drAnimalId"
          >
            <el-input
              v-model="form.drAnimalId"
              autocomplete="off"
              :readonly="title === '修改病症记录信息'"
              clearable
            />
          </el-form-item>
          <el-form-item label="病症" :label-width="formLabelWidth" prop="drDId">
            <el-select v-model="form.drDId" placeholder="请选择病症">
              <!-- @change="loadRecordMByRoleId" -->
              <el-option
                v-for="item in diseaseData"
                :key="item.dId"
                :label="item.dName"
                :value="item.dId"
              />
            </el-select>
          </el-form-item>
          <!-- <div v-if="roles.includes('admin')">
            <el-form-item
              label="角色(医护人员)"
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
              label="治疗人员"
              :label-width="formLabelWidth"
              prop="drUdockerId"
            >
              <el-select v-model="form.drUdockerId" placeholder="请治疗人员">
                <el-option
                  v-for="item in recordMDataAll"
                  :key="item.accountId"
                  :label="item.username"
                  :value="item.accountId"
                />
              </el-select>
            </el-form-item>
          </div> -->
          <el-form-item
            label="上报时间"
            :label-width="formLabelWidth"
            prop="drTime"
          >
            <el-date-picker
              v-model="form.drTime"
              type="datetime"
              placeholder="选择上报时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item
            label="病症描述"
            :label-width="formLabelWidth"
            prop="drDesc"
          >
            <el-input
              v-model="form.drDesc"
              type="textarea"
              :rows="2"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="当前病症诊疗过程"
            :label-width="formLabelWidth"
            prop="drCure"
          >
            <el-input
              v-model="form.drCure"
              type="textarea"
              :rows="2"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            :label-width="formLabelWidth"
            label="诊疗状态"
            prop="drStatus"
          >
            <el-radio-group v-model="form.drStatus">
              <el-radio label="未治疗" />
              <el-radio label="治疗中" />
              <el-radio label="已治疗" />
            </el-radio-group>
          </el-form-item>
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
    <!-- 抽屉 诊疗记录信息 -->
    <Briupdrawer
      :drawer-visible="visible2"
      title="诊疗记录"
      width="40%"
      @on-change-visible="handlerVisibleChange2"
    >
      <div slot="content">
        <el-form ref="d_cure_record_form" :model="form" :rules="rules2">
          <el-form-item
            label="动物编号"
            :label-width="formLabelWidth"
            prop="drAnimalId"
          >
            <el-input
              v-model="form.drAnimalId"
              autocomplete="off"
              disabled
              clearable
            />
          </el-form-item>
          <el-form-item
            label="当前病症诊疗过程"
            :label-width="formLabelWidth"
            prop="drCure"
          >
            <el-input
              v-model="form.drCure"
              type="textarea"
              :rows="2"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            :label-width="formLabelWidth"
            label="诊疗状态"
            prop="drStatus"
          >
            <el-radio-group v-model="form.drStatus">
              <el-radio label="未治疗" />
              <el-radio label="治疗中" />
              <el-radio label="已治疗" />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handlerVisibleChange2(false)"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="toSave2"
          >确 定</el-button
        >
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
  findAllRecordAccount,
  findAllDisease
} from "@/api/ptsOperational/diseaseRecord";
import { findAll as findAllRoles } from "@/api/base/role";
import { findByRole } from "@/api/base/account";
import { mapGetters } from "vuex";
// 按钮权限
import { getSubsByUrl, authsPerms } from "@/utils/common";
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.diseaseRecord,
      // 当前页面的按钮权限
      authsButton: [],
      // 表格数据加载中
      loading: false,
      // 病症记录数据
      recordListData: [],
      // 所有病症记录现有医护人员数据
      recordMData: [],
      // 所有角色数据
      rolesData: [],
      // 所有的病症记录管理人员
      recordMDataAll: [],
      // 病症数据
      diseaseData: [],
      // 新增和修改模态框
      visible: false,
      // 诊疗记录模态框
      visible2: false,
      // 标题
      title: "添加病症记录信息",
      // 新增和修改病症记录的数据
      form: {},
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
        drAnimalId: [
          { required: true, message: "请输入动物编号", trigger: "blur" }
        ],
        drDId: [{ required: true, message: "请选择病症", trigger: "change" }],
        /* roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        drUdockerId: [
          { required: true, message: "请选择治疗人员", trigger: "change" }
        ], */
        drTime: [
          {
            type: "string",
            required: true,
            message: "请选择上报时间",
            trigger: "change"
          }
        ],
        drDesc: [{ required: true, message: "请输入病症描述", trigger: "blur" }]
      },
      rules2: {
        drCure: [
          { required: true, message: "请输入诊疗过程", trigger: "blur" }
        ],
        drStatus: [{ required: true, message: "请选择状态", trigger: "change" }]
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
     * @description: 加载病症记录信息
     * @param {*}
     * @return {*}
     */
    async loadRecord(pageNum) {
      this.loadDisease();
      // this.loadRecordM();
      if (pageNum) {
        this.param.pageNum = pageNum;
      }
      // 如果当前用户不是管理员角色，那么使用当前用户的id
      if (!this.roles.includes("admin")) {
        this.param.drUdockerId = this.user.accountId;
      }
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
     * @description: 加载现有病症记录医护人员信息
     * @param {*}
     * @return {*}
     */
    /* async loadRecordM() {
      const res = await findAllRecordAccount();
      this.recordMData = res.data;
    }, */
    /**
     * @description: 加载所有的病症信息
     * @param {*}
     * @return {*}
     */
    async loadDisease() {
      const res = await findAllDisease();
      this.diseaseData = res.data;
    },

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
     * @description: 加载所有的病症记录人员角色的人员
     * @param {*}
     * @return {*}
     */
    /* async loadRecordMByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId);
      this.recordMDataAll = res.data;
      if (this.recordMDataAll.length > 0) {
        this.form.drUdockerId = accountId || this.recordMDataAll[0].accountId;
      }
    }, */

    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.loadDisease();
      // this.loadAllRoles();
      this.form = {};
      this.title = "添加病症记录信息";
      this.visible = true;
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      console.log(record);
      this.loadDisease();
      // this.loadAllRoles();
      /* this.loadRecordMByRoleId(
        record.account.baseRole.roleId,
        record.account.accountId
      ); */
      this.form = {
        // ...record;
        drAnimalId: record.drAnimalId,
        drId: record.drId,
        drCure: record.drCure,
        drDId: record.disease.dId,
        drDesc: record.drDesc,
        drStatus: record.drStatus,
        drTime: record.drTime
        //roleId: record.account.baseRole.roleId
      };
      this.title = "修改病症记录信息";
      this.visible = true;
    },
    /**
     * @description: 诊疗记录
     * @param {*} record
     * @return {*}
     */
    toCure(record) {
      this.form = {
        ...record
      };
      this.visible2 = true;
    },
    /**
     * @description: 保存病症记录信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs["d_record_form"].validate(async valid => {
        if (valid) {
          /* if (this.title === "添加病症记录信息") {
            this.form.drStatus = "未治疗";
          } */
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          /* if (!this.roles.includes("admin")) {
            this.form.drUdockerId = this.user.accountId;
          } */
          const res = await saveOrUpdate(this.form);
          this.handlerVisibleChange(false);
          this.$message({ message: res.message, type: "success" });
          if (this.title === "添加病症记录信息") {
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
     * @description: 保存诊疗记录信息
     * @param {*}
     * @return {*}
     */
    toSave2() {
      this.$refs["d_cure_record_form"].validate(async valid => {
        if (valid) {
          // 如果当前用户不是管理员角色，那么使用当前用户的id
          /* if (!this.roles.includes("admin")) {
            this.form.drUdockerId = this.user.accountId;
          } */
          const res = await saveOrUpdate(this.form);
          this.handlerVisibleChange2(false);
          this.$message({ message: res.message, type: "success" });
          this.loadRecord();
        } else {
          return false;
        }
      });
    },
    /**
     * @description: 删除病症记录
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
     * @description: 批量删除病症记录
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
      this.ids = val.map(item => item.drId);
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange(val) {
      this.visible = val;
      this.$refs["d_record_form"].resetFields();
    },
    /**
     * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
     * @param {*} val
     * @return {*}
     */
    handlerVisibleChange2(val) {
      this.visible2 = val;
      this.$refs["d_cure_record_form"].resetFields();
    }
  }
};
</script>
<style scoped lang="scss"></style>
