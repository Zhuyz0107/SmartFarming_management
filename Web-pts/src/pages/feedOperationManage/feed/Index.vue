<!--
 * @Description:  饲料管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 19:29:40
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
          >批量禁用</el-button
        >
        <el-form-item>
          <el-input v-model="param.fName" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="param.fSupplier"
            placeholder="请输入供应商"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.fType" clearable placeholder="饲料类型">
            <el-option label="能量饲料" value="能量饲料" />
            <el-option label="蛋白质饲料" value="蛋白质饲料" />
            <el-option label="粗饲料" value="粗饲料" />
            <el-option label="矿物质饲料" value="矿物质饲料" />
            <el-option label="维生素类添加剂" value="维生素类添加剂" />
          </el-select>
        </el-form-item>
        <el-button type="text" size="mini" @click="loadFeed(1)">搜索</el-button>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="feedData.list"
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
      <!-- <el-table-column
        prop="fId"
        label="编号"
        width="250"
        fixed
      /> -->
      <el-table-column prop="fName" label="名称" width="150" />
      <el-table-column prop="fSupplier" label="供应商" width="200" />
      <el-table-column prop="fType" label="类型" width="100" />
      <el-table-column prop="fDelete" label="状态" width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.fDelete == 0" size="mini">启用</el-tag>
          <el-tag v-else size="mini" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="fPrice" label="价格">
        <template slot-scope="scope">
          {{ scope.row.fPrice }} 元
        </template>
      </el-table-column>
      <el-table-column label="图片" width="130" prop="fImg">
        <template slot-scope="scope">
          <el-popover size="mini" trigger="hover" placement="top">
            <img
              style="width:100px;height:100px"
              :src="scope.row.fImg"
              alt=""
            />
            <div slot="reference" class="name-wrapper">
              <img
                style="width:50px;height:50px"
                :src="scope.row.fImg"
                alt=""
              />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="fTime" label="创建时间" width="150" />
      <el-table-column prop="fDesc" label="描述" />
      <el-table-column label="操作" align="center" width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="
              scope.row.fDelete == 0 &&
                authsButton.filter(item => {
                  return item.perms === perms.delete;
                }).length > 0
            "
            type="text"
            size="mini"
            @click.prevent="toDelete(scope.row.fId)"
            >禁用</el-button
          >
          <el-button
            v-if="
              scope.row.fDelete == 0 &&
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
        :total="feedData.total"
        :page-size="param.pageSize"
        :current-page="param.page"
        :page-sizes="[2, 10, 15, 30, 50, 80]"
        @current-change="currentChangeHandler"
        @size-change="sizeChangeHandler"
      />
    </div>
    <!-- 分页 -->

    <!-- 抽屉 添加和修改饲料信息 -->
    <Briupdrawer
      :drawer-visible="visible"
      :title="title"
      width="40%"
      @on-change-visible="handlerVisibleChange"
    >
      <div slot="content">
        <el-form ref="feed_form" :model="form" :rules="rules">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="fName">
            <el-input v-model="form.fName" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="供应商"
            :label-width="formLabelWidth"
            prop="fSupplier"
          >
            <el-input v-model="form.fSupplier" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="饲料类型"
            :label-width="formLabelWidth"
            prop="fType"
          >
            <el-select v-model="form.fType" clearable placeholder="饲料类型">
              <el-option label="能量饲料" value="能量饲料" />
              <el-option label="蛋白质饲料" value="蛋白质饲料" />
              <el-option label="粗饲料" value="粗饲料" />
              <el-option label="矿物质饲料" value="矿物质饲料" />
              <el-option label="维生素类添加剂" value="维生素类添加剂" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="价格"
            :label-width="formLabelWidth"
            prop="fPrice"
          >
            <el-input v-model.number="form.fPrice" autocomplete="off" />
          </el-form-item>
          <!--图片（`图片上传单独接口`）  -->
          <el-form-item label="饲料图片" :label-width="formLabelWidth">
            <el-upload
              name="files"
              class="avatar-uploader"
              :action="upFileUrl"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :headers="headers"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item
            label="饲料图片地址"
            :label-width="formLabelWidth"
            prop="fImg"
          >
            <el-input v-model="form.fImg" autocomplete="off" />
          </el-form-item>

          <el-form-item
            label="创建时间"
            :label-width="formLabelWidth"
            prop="fTime"
          >
            <el-date-picker
              v-model="form.fTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="fDesc">
            <el-input
              v-model="form.fDesc"
              type="textarea"
              :rows="2"
              autocomplete="off"
            />
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
  </div>
</template>
<script>
import {
  findByOption,
  saveOrUpdate,
  delById,
  deleteByIdAll
} from "@/api/ptsBase/feed";
import { upFileUrl, downloadFileUrl } from "@/utils/common";
import { getToken } from "@/utils/auth";
// 按钮权限
import { getSubsByUrl, authsPerms } from "@/utils/common";
export default {
  data() {
    return {
      // 静态按钮权限列表
      perms: authsPerms.feed,
      // 当前页面的按钮权限
      authsButton: [],
      imageUrl: "",
      headers: {
        token: getToken()
      },
      upFileUrl,
      downloadFileUrl,
      // 表格数据加载中
      loading: false,
      // 饲料数据
      feedData: [],
      // 所有批次数据
      batchData: [],
      // 所有栏圈数据
      hurdlesData: [],
      // 新增和修改模态框
      visible: false,
      // 标题
      title: "添加饲料信息",
      // 新增和修改饲料的数据
      form: {},
      // 表单标签宽度
      formLabelWidth: "120px",
      // 批量禁用的数据
      ids: [],
      // 搜索的数据
      param: {
        page: 1,
        pageSize: 10
      },
      rules: {
        fName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        fSupplier: [
          { required: true, message: "请输入供应商", trigger: "blur" }
        ],
        fType: [{ required: true, message: "请选择饲料类型", trigger: "blur" }],
        fPrice: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { type: "number", message: "价格要求是数值", trigger: "blur" }
        ],
        fTime: [
          {
            type: "string",
            required: true,
            message: "请选择购入时间",
            trigger: "change"
          }
        ],
        fImg: [{ required: true, message: "请上传饲料图片", trigger: "change" }]
      }
    };
  },
  created() {
    // 通过当前页面的路由获取页面的按钮权限
    // 按钮权限
    this.authsButton = getSubsByUrl(this.$route.path).subs;
    // 加载数据
    this.loadFeed();
  },
  methods: {
    /**
     * @description: 加载饲料信息
     * @param {*}
     * @return {*}
     */
    async loadFeed(page) {
      if (page) {
        this.param.page = page;
      }
      this.loading = true;
      const res = await findByOption(this.param);
      this.feedData = res.data;
      this.loading = false;
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.form = {};
      this.imageUrl = "";
      this.title = "添加饲料信息";
      this.visible = true;
    },
    /**
     * @description: 修改按钮
     * @param {*} record
     * @return {*}
     */
    toEdit(record) {
      this.form = { ...record };
      this.imageUrl = record.fImg;
      this.title = "修改饲料信息";
      this.visible = true;
    },
    /**
     * @description: 保存饲料信息
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs["feed_form"].validate(async valid => {
        if (valid) {
          if (!this.form.fImg) {
            this.$message({ message: "请上传图片", type: "warning" });
            return;
          }
          const res = await saveOrUpdate(this.form);
          this.handlerVisibleChange(false);
          this.$message({ message: res.message, type: "success" });
          if (this.title === "添加饲料信息") {
            // 处理分页bug
            this.loadFeed(1);
          } else {
            this.loadFeed();
          }
        } else {
          return false;
        }
      });
    },
    /**
     * @description: 禁用饲料
     * @param {*} id 账户id
     * @return {*}
     */
    toDelete(id) {
      this.$confirm("此操作将永久禁用该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await delById(id);
        this.$message({ type: "success", message: res.message });
        this.loadFeed();
      });
    },
    /**
     * @description: 批量禁用饲料
     * @param {*}
     * @return {*}
     */
    toBatchDelete() {
      if (this.ids.length > 0) {
        this.$confirm("此操作将批量禁用选中的数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          const res = await deleteByIdAll(this.ids);
          this.$message({ type: "success", message: res.message });
          this.loadFeed();
        });
      } else {
        this.$message({ type: "warning", message: "请选择要批量禁用的数据" });
      }
    },
    /**
     * @description: 当前页发生改变
     * @param {*} page
     * @return {*}
     */
    currentChangeHandler(page) {
      this.param.page = page;
      this.loadFeed();
    },
    /**
     * @description: 条数发生变化
     * @param {*} pageSize 条数
     * @return {*}
     */
    sizeChangeHandler(pageSize) {
      this.param.page = 1;
      this.param.pageSize = pageSize;
      this.loadFeed();
    },
    /**
     * @description: 表格多选切换
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.ids = val.map(item => item.fId);
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
      const isLt1M = file.size / 1024 / 1024 < 1;

      /*  if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        } */
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
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
      this.form.fImg = downloadFileUrl + res.data[0];
    }
  }
};
</script>
<style scoped lang="scss"></style>
