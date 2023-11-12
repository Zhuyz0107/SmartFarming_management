<!--
 * @Description: 栏舍管理
 * @Author: Ronda
 * @Date: 2022-03-23 11:27:07
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 23:35:02
-->

<template>
    <!-- 栏舍管理 -->
    <div>
        <!-- {{ authsButton }} -->
        <el-row :gutter="20">
            <!-- 表格和分页 -->
            <el-col :span="tableSpan">
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
                        >添加
                        </el-button
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
                        >批量删除
                        </el-button
                        >
                        <el-form-item>
                            <el-input
                                v-model="param.fhName"
                                placeholder="请输入名称"
                                clearable
                            />
                        </el-form-item>
                        <el-button type="text" size="mini" @click="loadFenceHouse(1)"
                        >搜索
                        </el-button
                        >
                    </el-form>
                </div>
                <el-table
                    v-loading="loading"
                    border
                    :data="fenceHouse.list"
                    size="small"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" align="center"/>
                    <el-table-column
                        align="center"
                        type="index"
                        :index="1"
                        label="序号"
                    />
                    <el-table-column prop="fhId" label="编号" width="250"/>
                    <el-table-column prop="fhName" label="名称" width="100"/>
                    <el-table-column prop="fhTime" label="创建时间" width="160"/>
                    <!-- <el-table-column
                      prop="fhDelete"
                      label="状态"
                      width="60px"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.fhDelete == 0" size="mini">启用</el-tag>
                        <el-tag v-else size="mini" type="danger">禁用</el-tag>
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="fhDesc" label="描述" align="left"/>
                    <el-table-column label="操作" align="center" width="140">
                        <template slot-scope="scope">
                            <!--  v-if="
                                scope.row.fhDelete == 0 &&
                                  authsButton.filter(item => {
                                    return item.perms === perms.delete;
                                  }).length > 0
                              " -->
                            <el-button
                                type="text"
                                size="mini"
                                @click.prevent="toDelete(scope.row.fhId)"
                            >移除
                            </el-button
                            >
                            <!-- v-if=" scope.row.fhDelete == 0 && authsButton.filter(item => {
                            return item.perms === perms.saveOrUpdate; }).length > 0 " -->
                            <el-button
                                type="text"
                                size="mini"
                                @click.prevent="toEdit(scope.row)"
                            >修改
                            </el-button
                            >
                            <!-- v-if="
                                scope.row.fhDelete == 0 &&
                                  authsButton.filter(item => {
                                    return item.perms === perms.details;
                                  }).length > 0
                              " -->
                            <el-button
                                type="text"
                                size="mini"
                                @click.prevent="toDetails(scope.row.fhId)"
                            >详情
                            </el-button
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
                        :total="fenceHouse.total"
                        :page-size="param.pageSize"
                        :current-page="param.pageNum"
                        :page-sizes="[2, 10, 15, 30, 50, 80]"
                        @current-change="currentChangeHandler"
                        @size-change="sizeChangeHandler"
                    />
                </div>
                <!-- 分页 -->
            </el-col>
            <!-- 详情 -->
            <el-col v-if="detailsVisible" :span="detailsSpan">
                <el-card v-loading="detailsLoading" class="box-card" size="mini">
                    <div slot="header" class="clearfix">
                        <span>【{{ details.fhName }}】栏舍详情</span>
                        <el-button
                            style="float: right; padding: 3px 0"
                            type="text"
                            @click="toCancelDetails"
                        >隐藏
                        </el-button
                        >
                    </div>
                    <div>栏舍描述：{{ details.fhDesc }}</div>
                    <div>
                        栏圈信息：
                        <el-table :data="details.mhs" size="small" empty-text="暂无数据">
                            <el-table-column prop="hName" label="栏圈名称" align="left"/>
                            <el-table-column prop="hMax" label="容量" align="left"/>
                            <el-table-column prop="hDesc" label="栏圈描述" align="left"/>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 抽屉 添加和修改栏舍信息 -->
        <Briupdrawer
            :drawer-visible="visible"
            :title="title"
            width="40%"
            @on-change-visible="handlerVisibleChange"
        >
            <div slot="content">
                <el-form ref="fenceHouse_form" :model="form" :rules="rules">
                    <el-form-item label="名称" label-width="80px" prop="fhName">
                        <el-input
                            v-if="form.id"
                            v-model="form.fhName"
                            autocomplete="off"
                            disabled
                        />
                        <el-input v-else v-model="form.fhName" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="创建时间" label-width="80px" prop="fhTime">
                        <el-date-picker
                            v-model="form.fhTime"
                            type="datetime"
                            placeholder="选择创建时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item label="描述" label-width="80px" prop="fhDesc">
                        <el-input
                            v-model="form.fhDesc"
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
    deleteByIdAll,
    findById
} from '@/api/ptsBase/fenceHouse'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'

export default {
    data() {
        return {
            // 静态按钮权限列表
            perms: authsPerms.fenceHouse,
            // 当前页面的按钮权限
            authsButton: [],
            // 新增和修改栏舍的数据
            form: {},
            loading: false,
            detailsLoading: false,
            // 新增和修改模态框
            visible: false,
            // 详情面板是否显示
            detailsVisible: false,
            // 表格面板比例
            tableSpan: 24,
            detailsSpan: 0,
            // 标题
            title: '添加栏舍信息',
            // 栏舍数据
            fenceHouse: [],
            // 批量禁用的数据
            ids: [],
            // 详情数据
            details: {},
            // 搜索的数据
            param: {
                pageNum: 1,
                pageSize: 10
            },
            rules: {
                fhName: [{ required: true, message: '请输入名称', trigger: 'change' }],
                fhTime: [
                    {
                        type: 'string',
                        required: true,
                        message: '请选择创建时间',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    created() {
        // 通过当前页面的路由获取页面的按钮权限
        // 按钮权限
        this.authsButton = getSubsByUrl(this.$route.path).subs
        // 加载数据
        this.loadFenceHouse()
    },
    methods: {
        /**
         * @description: 加载栏舍信息
         * @param {*}
         * @return {*}
         */
        async loadFenceHouse(pageNum) {
            if (pageNum) {
                this.param.pageNum = pageNum
            }
            this.loading = true
            const res = await findByOption(this.param)
            this.fenceHouse = res.data
            this.loading = false
        },
        /**
         * @description: 添加按钮
         * @param {*}
         * @return {*}
         */
        toAdd() {
            this.form = {} //空数据没有携带id
            this.title = '添加栏舍信息'
            this.visible = true
        },
        /**
         * @description: 修改按钮
         * @param {*} record
         * @return {*}
         */
        toEdit(record) {
            this.form = { ...record }
            this.title = '修改栏舍信息'
            this.visible = true
        },
        /**
         * @description: 保存栏舍信息
         * @param {*}
         * @return {*}
         */
        toSave() {
            this.$refs['fenceHouse_form'].validate(async valid => {
                if (valid) {
                    const res = await saveOrUpdate(this.form)
                    this.handlerVisibleChange(false)
                    this.$message({ message: res.message, type: 'success' })
                    if (this.title === '添加栏舍信息') {
                        // 处理分页bug
                        this.loadFenceHouse(1)
                    } else {
                        this.loadFenceHouse()
                    }
                } else {
                    return false
                }
            })
        },
        /**
         * @description: 查看详情
         * @param {*} id
         * @return {*}
         */
        async toDetails(id) {
            this.tableSpan = 17
            this.detailsSpan = 7
            this.detailsVisible = true
            this.detailsLoading = true
            const res = await findById(id)
            this.details = res.data
            this.detailsLoading = false
        },
        /**
         * @description: 隐藏详情内容
         * @param {*}
         * @return {*}
         */
        toCancelDetails() {
            this.tableSpan = 24
            this.detailsSpan = 0
            this.detailsVisible = false
        },
        /**
         * @description: 禁用栏舍
         * @param {*} id 账户id
         * @return {*}
         */
        toDelete(id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await delById(id)
                this.$message({ type: 'success', message: res.message })
                this.loadFenceHouse()
            })
        },
        /**
         * @description: 批量禁用栏舍
         * @param {*}
         * @return {*}
         */
        toBatchDelete() {
            if (this.ids.length > 0) {
                this.$confirm('此操作将批量删除选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    const res = await deleteByIdAll(this.ids)
                    this.$message({ type: 'success', message: res.message })
                    this.loadFenceHouse()
                })
            } else {
                this.$message({ type: 'warning', message: '请选择要批量删除的数据' })
            }
        },
        /**
         * @description: 当前页发生改变
         * @param {*} page
         * @return {*}
         */
        currentChangeHandler(pageNum) {
            this.param.pageNum = pageNum
            this.loadFenceHouse()
        },
        /**
         * @description: 条数发生变化
         * @param {*} pageSize 条数
         * @return {*}
         */
        sizeChangeHandler(pageSize) {
            this.param.pageNum = 1
            this.param.pageSize = pageSize
            this.loadFenceHouse()
        },
        /**
         * @description: 表格多选切换
         * @param {*} val
         * @return {*}
         */
        handleSelectionChange(val) {
            this.ids = val.map(item => item.fhId)
        },
        /**
         * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
         * @param {*} val
         * @return {*}
         */
        handlerVisibleChange(val) {
            this.visible = val
            this.$refs['fenceHouse_form'].resetFields()
        }
    }
}
</script>
<style scoped lang="scss"></style>
