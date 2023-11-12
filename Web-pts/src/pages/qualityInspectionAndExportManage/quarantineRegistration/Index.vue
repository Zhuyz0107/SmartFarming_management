<!--
 * @Description: 检疫登记
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-25 11:03:17
-->
<template>
    <div>
        <!-- {{ authsButton }} -->
        <!-- 表格和分页 -->
        <div class="btns">
            <el-form :inline="true" size="small">
                <el-button v-if="authsButton.filter(item => {
                    return item.perms === perms.saveOrUpdate;
                }).length > 0
                    " type="primary" size="small" @click="toAdd">登记</el-button>
                <el-button v-if="authsButton.filter(item => {
                    return item.perms === perms.deleteAll;
                }).length > 0
                    " type="danger" size="small" style="margin-right: 10px" @click="toBatchDelete">批量删除</el-button>
                <!-- <el-form-item>
          <el-input
            v-model="param.grBatchId"
            placeholder="批次编号"
            clearable
          />
        </el-form-item> -->
                <el-form-item>
                    <el-input v-model="param.grMechanism" placeholder="检疫机构" clearable />
                </el-form-item>
                <el-form-item>
                    <el-select v-model="param.bQualified" clearable placeholder="检疫结果">
                        <el-option label="合格" value="合格" />
                        <el-option label="不合格" value="不合格" />
                    </el-select>
                </el-form-item>
                <!-- <div style="margin-top:10px;" />
        <el-form-item>
          <el-date-picker
            v-model="param.times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          />
        </el-form-item> -->

                <!-- 检疫人员 -->
                <!-- <el-form-item v-if="roles.includes('admin')">
          <el-select v-model="param.grUquarantinerId" clearable placeholder="检疫人员">
            <el-option v-for="item in recordMData" :key="item.accountId" :label="item.username" :value="item.accountId" />
          </el-select>
        </el-form-item> -->

                <el-button type="text" size="mini" @click="loadQuaData(1)">搜索</el-button>
            </el-form>
        </div>
        <el-table v-loading="loading" border :data="quaData.list" size="small" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" fixed />
            <el-table-column fixed align="center" type="index" :index="1" label="序号" />
            <el-table-column prop="grBatchId" label="批次编号" width="260" />
            <el-table-column prop="grMechanism" label="检疫机构" />

            <el-table-column label="检疫图片" width="130" prop="grImg">
                <template slot-scope="scope">
                    <el-popover size="mini" trigger="hover" placement="top">
                        <img style="width:100px;height:100px" :src="scope.row.grImg" alt="" />
                        <div slot="reference" class="name-wrapper">
                            <img style="width:50px;height:50px" :src="scope.row.grImg" alt="" />
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column prop="grTime" label="检疫时间" width="150" />

            <el-table-column prop="bQualified" label="检疫结果" />

            <!-- <el-table-column label="检疫人员" width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>检疫人员编号: {{ scope.row.account.accountId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.account.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column> -->

            <el-table-column label="操作" align="center" width="140" fixed="right">
                <template slot-scope="scope">
                    <el-button v-if="authsButton.filter(item => {
                        return item.perms === perms.delete;
                    }).length > 0
                        " type="text" size="mini" @click.prevent="toDelete(scope.row.grId)">移除</el-button>
                    <el-button v-if="authsButton.filter(item => {
                        return item.perms === perms.saveOrUpdate;
                    }).length > 0
                        " type="text" size="mini" @click.prevent="toEdit(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <!-- :hide-on-single-page="true" -->
            <el-pagination background layout="total,prev, pager, next,sizes" small :total="quaData.total"
                :page-size="param.pageSize" :current-page="param.pageNum" :page-sizes="[2, 10, 15, 30, 50, 80]"
                @current-change="currentChangeHandler" @size-change="sizeChangeHandler" />
        </div>
        <!-- 分页 -->

        <!-- 抽屉 添加和修改检疫登记信息 -->
        <Briupdrawer :drawer-visible="visible" :title="title" width="40%" @on-change-visible="handlerVisibleChange">
            <div slot="content">
                <el-form ref="feed_form" :model="form" :rules="rules">
                    <el-form-item label="批次编号" :label-width="formLabelWidth" prop="grBatchId">
                        <!-- <el-input
              v-model="form.grBatchId"
              autocomplete="off"
              :readonly="title==='修改检疫登记信息'"
            /> -->
                        <el-select v-model="form.grBatchId" :disabled="title === '修改检疫登记信息'" placeholder="请选择批次">
                            <el-option v-for="item in batchData" :key="item.bSerialId" :label="item.bSerialId"
                                :value="item.bSerialId" /> </el-select></el-form-item>

                    <el-form-item label="检疫机构" :label-width="formLabelWidth" prop="grMechanism">
                        <el-input v-model="form.grMechanism" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="检疫结果" :label-width="formLabelWidth" prop="bQualified">
                        <el-select v-model="form.bQualified" clearable placeholder="检疫结果">
                            <el-option label="合格" value="合格" />
                            <el-option label="不合格" value="不合格" />
                        </el-select>
                    </el-form-item>

                    <!--图片（`图片上传单独接口`）  -->
                    <el-form-item label="检疫登记图片" :label-width="formLabelWidth">
                        <el-upload name="file" class="avatar-uploader" :action="upFileUrl" :show-file-list="false"
                            :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :headers="headers">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon" />
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="图片地址" :label-width="formLabelWidth" prop="grImg">
                        <el-input v-model="form.grImg" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="检疫时间" :label-width="formLabelWidth" prop="grTime">
                        <el-date-picker v-model="form.grTime" type="datetime" placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss" />
                    </el-form-item>
                    <!-- <div v-if="roles.includes('admin')">
            <el-form-item
              label="角色(检疫人员)"
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
              label="检疫人员"
              :label-width="formLabelWidth"
              prop="grUquarantinerId"
            >
              <el-select
                v-model="form.grUquarantinerId"
                placeholder="请选择检疫人员"
              >
                <el-option
                  v-for="item in quaMDataAll"
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
                <el-button size="small" @click="handlerVisibleChange(false)">取 消</el-button>
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
    selectAllAccount,
} from "@/api/ptsOperational/quarantineRegistration";
import { findAll as findAllRoles } from "@/api/base/role";
import { findByRole } from "@/api/base/account";
import { findAllUnquarantined as findAllBatch } from "@/api/ptsBase/batch";
import { upFileUrl, downloadFileUrl } from "@/utils/common";
import { getToken } from "@/utils/auth";
import { mapGetters } from "vuex";
// 按钮权限
import { getSubsByUrl, authsPerms } from "@/utils/common";
export default {
    data() {
        return {
            // 静态按钮权限列表
            perms: authsPerms.quarantineRegistration,
            // 当前页面的按钮权限
            authsButton: [],
            imageUrl: "",
            headers: {
                token: getToken(),
            },
            upFileUrl,
            downloadFileUrl,
            // 表格数据加载中
            loading: false,
            // 检疫登记数据
            quaData: [],
            // 所有角色数据
            rolesData: [],
            // 所有的检疫人员
            quaMDataAll: [],
            // 所有的已存在的检疫人员信息
            recordMData: [],
            // 所有栏圈数据
            hurdlesData: [],
            // 所有批次信息
            batchData: [],
            // 新增和修改模态框
            visible: false,
            // 标题
            title: "添加检疫登记信息",
            // 新增和修改检疫登记的数据
            form: {},
            // 表单标签宽度
            formLabelWidth: "120px",
            // 批量删除的数据
            ids: [],
            // 搜索的数据
            param: {
                pageNum: 1,
                pageSize: 10,
            },
            rules: {
                grBatchId: [
                    { required: true, message: "请输入批次", trigger: "blur" },
                ],
                grMechanism: [
                    {
                        required: true,
                        message: "请输入检疫机构",
                        trigger: "blur",
                    },
                ],
                grTime: [
                    {
                        type: "string",
                        required: true,
                        message: "请选择检疫时间",
                        trigger: "change",
                    },
                ],
                grImg: [
                    {
                        required: true,
                        message: "请上传检疫登记图片",
                        trigger: "change",
                    },
                ],
                bQualified: [
                    {
                        required: true,
                        message: "请选择检疫结果",
                        trigger: "blur",
                    },
                ],
                /* roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        grUquarantinerId: [
          { required: true, message: "请选择检疫人员", trigger: "change" }
        ] */
            },
        };
    },
    computed: {
        ...mapGetters(["roles", "user"]),
    },
    created() {
        // 通过当前页面的路由获取页面的按钮权限
        // 按钮权限
        this.authsButton = getSubsByUrl(this.$route.path).subs;
        // 加载数据
        this.loadQuaData();
    },
    methods: {
        /**
         * @description: 加载所有的批次
         * @param {*}
         * @return {*}
         */
        async loadBatch() {
            const res = await findAllBatch();
            this.batchData = res.data;
        },
        /**
         * @description: 加载所有已存在的检疫人员
         * @param {*}
         * @return {*}
         */
        /* async loadRecordMData() {
      const res = await selectAllAccount();
      this.recordMData = res.data;
    }, */
        /**
         * @description: 加载检疫登记信息
         * @param {*}
         * @return {*}
         */
        async loadQuaData(pageNum) {
            // this.loadRecordMData();
            if (pageNum) {
                this.param.pageNum = pageNum;
            }
            // 如果当前用户不是管理员角色，那么使用当前用户的id
            /* if (!this.roles.includes("admin")) {
                this.param.grUquarantinerId = this.user.accountId;
            } */
            // 处理时间问题
            const obj = {
                ...this.param,
            };
            // delete obj.times;
            this.loading = true;
            const res = await findByOption(obj);
            this.quaData = res.data;
            this.loading = false;
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
         * @description: 加载所有的指标记录人员角色的人员
         * @param {*}
         * @return {*}
         */
        /* async loadRecordMByRoleId(roleId, accountId) {
      const res = await findByRole(roleId || this.form.roleId);
      this.quaMDataAll = res.data;
      if (this.quaMDataAll.length > 0) {
        this.form.grUquarantinerId = accountId || this.quaMDataAll[0].accountId;
      }
    }, */
        /**
         * @description: 添加按钮
         * @param {*}
         * @return {*}
         */
        toAdd() {
            this.loadBatch();
            // this.loadAllRoles();
            this.form = {};
            this.imageUrl = "";
            this.title = "添加检疫登记信息";
            this.visible = true;
        },
        /**
         * @description: 修改按钮
         * @param {*} record
         * @return {*}
         */
        toEdit(record) {
            this.loadBatch();
            // this.loadAllRoles();
            /* this.loadRecordMByRoleId(
        record.account.roles[0].roleId,
        record.account.accountId
      ); */
            this.form = { ...record };
            this.imageUrl = record.grImg;
            this.title = "修改检疫登记信息";
            this.visible = true;
        },
        /**
         * @description: 保存检疫登记信息
         * @param {*}
         * @return {*}
         */
        toSave() {
            this.$refs["feed_form"].validate(async (valid) => {
                if (valid) {
                    // 如果当前用户不是管理员角色，那么使用当前用户的id
                    /* if (!this.roles.includes("admin")) {
                        this.form.grUquarantinerId = this.user.accountId;
                    } */
                    if (!this.form.grImg) {
                        this.$message({
                            message: "请上传图片",
                            type: "warning",
                        });
                        return;
                    }
                    const res = await saveOrUpdate(this.form);
                    this.handlerVisibleChange(false);
                    this.$message({ message: res.message, type: "success" });
                    if (this.title === "添加检疫登记信息") {
                        // 处理分页bug
                        this.loadQuaData(1);
                    } else {
                        this.loadQuaData();
                    }
                } else {
                    return false;
                }
            });
        },
        /**
         * @description: 删除检疫登记
         * @param {*} id 账户id
         * @return {*}
         */
        toDelete(id) {
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                const res = await delById(id);
                this.$message({ type: "success", message: res.message });
                this.loadQuaData();
            });
        },
        /**
         * @description: 批量删除检疫登记
         * @param {*}
         * @return {*}
         */
        toBatchDelete() {
            if (this.ids.length > 0) {
                this.$confirm("此操作将批量删除选中的数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(async () => {
                    const res = await deleteByIdAll(this.ids);
                    this.$message({ type: "success", message: res.message });
                    this.loadQuaData();
                });
            } else {
                this.$message({
                    type: "warning",
                    message: "请选择要批量删除的数据",
                });
            }
        },
        /**
         * @description: 当前页发生改变
         * @param {*} pageNum
         * @return {*}
         */
        currentChangeHandler(pageNum) {
            this.param.pageNum = pageNum;
            this.loadQuaData();
        },
        /**
         * @description: 条数发生变化
         * @param {*} pageSize 条数
         * @return {*}
         */
        sizeChangeHandler(pageSize) {
            this.param.pageNum = 1;
            this.param.pageSize = pageSize;
            this.loadQuaData();
        },
        /**
         * @description: 表格多选切换
         * @param {*} val
         * @return {*}
         */
        handleSelectionChange(val) {
            this.ids = val.map((item) => item.grId);
        },
        /**
         * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
         * @param {*} val
         * @return {*}
         */
        handlerVisibleChange(val) {
            this.visible = val;
            this.$refs["feed_form"].resetFields();
        },
        /**
         * @description: 文件上传之前校验
         * @param {*} file
         * @return {*}
         */
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg';
            const isLt1M = file.size / 1024 / 1024 < 10;

            /*  if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        } */
            if (!isLt1M) {
                this.$message.error("上传头像图片大小不能超过 10MB!");
            }
            // return isJPG && isLt2M;
            return isLt1M;
        },
        /**
         * @description: 图片上传成功
         * @param {*} res
         * @param {*} file
         * @return {*}
         */
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            // this.form.grImg = downloadFileUrl + res.data[0];
            this.form.grImg = res.data;
        },
    },
};
</script>
<style scoped lang="scss"></style>
