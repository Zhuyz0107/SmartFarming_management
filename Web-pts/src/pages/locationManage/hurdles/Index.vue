<!--
 * @Description:  栏圈管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-17 19:48:01
-->
<template>
    <div>
        <!-- 第一行 -->
        <div class="btns">
            <!-- <el-row :gutter="20"> -->
            <el-form :inline="true" size="small">
                <el-button
                    v-if="authsButton.filter((item) => {
            return item.perms===perms.saveOrUpdate;
          }).length > 0"
                    type="primary"
                    size="small"
                    @click="toAdd"
                >添加
                </el-button>
                <el-button
                    v-if="authsButton.filter((item) => {
            return item.perms===perms.deleteAll;
          }).length > 0"
                    type="danger"
                    size="small"
                    style="margin-right: 10px"
                    @click="toBatch"
                >批量启用/禁用
                </el-button>
                <el-form-item>
                    <el-input
                        v-model="param.hName"
                        style="display: inline-block; width: 150px"
                        placeholder="请输入栏圈名称"
                        size="small"
                        clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-select
                        v-model="param.hMax"
                        style="display: inline-block; width: 150px;margin-right:10px"
                        size="small"
                        placeholder="请选择栏圈容量"
                        clearable
                    >
                        <el-option
                            v-for="item in Max"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                    <el-select
                        v-model="param.fhName"
                        style="display: inline-block; width: 150px;margin-right:10px"
                        size="small"
                        placeholder="请选择所属栏舍"
                        clearable
                    >
                        <el-option
                            v-for="item in fenceAll"
                            :key="item.fhId"
                            :label="item.fhName"
                            :value="item.fhName"
                        />
                    </el-select>
                    <el-select
                        v-model="param.hEnable"
                        style="display: inline-block; width: 150px"
                        clearable
                        placeholder="请选择是否可用"
                    >
                        <el-option label="可用" value="可用"/>
                        <el-option label="禁用" value="禁用"/>
                    </el-select>
                </el-form-item>
                <el-button type="text" size="small" @click="loadHurdles(1)">搜索</el-button>
            </el-form>
            <!-- </el-row> -->
        </div>
        <el-table
            v-loading="loading"
            size="small"
            :data="hurdles.list"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" :index="1" label="编号" width="80"/>
            <el-table-column prop="hName" label="栏圈名称" width="180"/>
            <el-table-column prop="hTime" label="创建时间">
                <template slot-scope="scope">
                    {{ scope.row.hTime | fmtDate }}
                </template>
            </el-table-column>
            <!--<el-table-column prop="hEnable" label="状态"/>-->
            <el-table-column prop="hMax" label="栏圈容量"/>
            <el-table-column prop="managerFenceHouse.fhName" label="所属栏舍"/>
            <el-table-column
                prop="hEnable"
                label="状态"
                width="60px"
                align="center"
            >
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.hEnable == '可用'" size="mini">启用</el-tag>
                    <el-tag v-else size="mini" type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="hDesc" label="栏圈描述"/>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.hEnable === '可用'"
                        type="text"
                        size="mini"
                        @click.prevent="toDisabled(scope.row.hId, scope.row.hEnable)"
                    >禁用
                    </el-button>
                    <el-button
                        v-if="scope.row.hEnable === '禁用'"
                        type="text"
                        size="mini"
                        @click.prevent="toDisabled(scope.row.hId, scope.row.hEnable)"
                    >启用
                    </el-button>

                    <el-button
                        type="text"
                        size="mini"
                        @click.prevent="toEdit(scope.row)"
                    >修改
                    </el-button>

                    <el-button
                        type="text"
                        size="mini"
                        @click.prevent="toDelete(scope.row.hId)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <el-pagination
                background
                small
                :current-page="param.pageNum"
                :page-sizes="[2, 5, 8, 10, 20, 40, 80]"
                :page-size="param.pageSize"
                layout="total, prev, pager, next, sizes"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <!-- 抽屉 添加和修改栏圈信息-->
        <Briupdrawer
            :title="title"
            :drawer-visible="visible"
            width="40%"
            @on-change-visible="handlerVisibleChange"
        >
            <div slot="content">
                <el-form
                    ref="myForm"
                    :model="form"
                    :label-width="formLabelWidth"
                    :rules="rules"
                >
                    <el-form-item
                        label="栏圈名称"
                        :label-width="formLabelWidth"
                        prop="hName"
                    >
                        <el-input
                            v-model="form.hName"
                            autocomplete="off"
                            placeholder="请输入栏圈名称"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item
                        label="栏圈容量"
                        :label-width="formLabelWidth"
                        prop="hMax"
                    >
                        <!-- oninput="value=value.replace(/[^1-9]/g,'')" -->
                        <el-input
                            v-model.number="form.hMax"
                            autocomplete="off"
                            placeholder="请输入栏圈容量"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item
                        label="栏圈状态"
                        :label-width="formLabelWidth"
                        prop="hEnable"
                    >
                        <el-radio-group
                            v-model="form.hEnable"
                            placeholder="请选择状态"
                            clearable
                        >
                            <el-radio v-model="radio" label="可用" value="可用">可用</el-radio>
                            <el-radio v-model="radio" label="禁用" value="禁用">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="所属栏舍"
                        :label-width="formLabelWidth"
                        prop="hFenceId"
                    >
                        <el-select
                            v-model="form.hFenceId"
                            style="display: inline-block; width: 150px"
                            size="small"
                            placeholder="请选择所属栏舍"
                            clearable
                        >
                            <!-- {{fenceAll}} -->
                            <el-option
                                v-for="item in fenceAll"
                                :key="item.fhId"
                                :label="item.fhName"
                                :value="item.fhId"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="栏圈描述"
                        :label-width="formLabelWidth"
                        prop="hDesc"
                    >
                        <el-input
                            v-model="form.hDesc"
                            type="textarea"
                            placeholder="请输入栏圈描述"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item label="创建日期" prop="hTime">
                        <el-date-picker
                            v-model="form.hTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right"
                            :picker-options="pickerOptions"
                            :label-width="formLabelWidth"
                        />
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
    findByOption,
    findAllMax,
    saveOrUpdate,
    delById,
    deleteByIdAll,
    updateStatusById, updateStatusBatch
} from '@/api/ptsBase/hurdles.js'
import { findAll } from '@/api/ptsBase/fenceHouse.js'
import { getSubsByUrl, authsPerms } from '@/utils/common'
import item from '@/layout/components/Sidebar/Item.vue'
import it from 'element-ui/src/locale/lang/it'

export default {
    data() {
        return {
            // 静态按钮权限列表
            perms: authsPerms.hurdles,
            // 当前页面的按钮权限
            authsButton: [],
            // 设置可用禁用状态单选按钮
            radio: '1',
            // 设置容量为空
            hMax: '',
            // 表单校验
            rules: {
                hName: [{ required: true, message: '请输入栏圈名称', trigger: 'blur' }],
                hMax: [
                    { required: true, message: '容量不能为空', trigger: 'blur' },
                    { type: 'number', message: '容量必须是数值', trigger: 'blur' }
                ],
                hEnable: [
                    { required: true, message: '请选择栏圈状态', trigger: 'blur' }
                ],
                hFenceId: [
                    { required: true, message: '请选择所属栏舍', trigger: 'blur' }
                ],
                hDesc: [{ required: true, message: '请输入栏圈描述', trigger: 'blur' }],
                hTime: [{ required: true, message: '请选择创建时间', trigger: 'blur' }]
            },
            // 表单控件宽度
            formLabelWidth: '80px',
            // 时间日期配置项
            pickerOptions: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }
                ]
            },
            // 抽屉里面表单对象
            form: {},
            // 控制抽屉的显示与隐藏
            visible: false,
            // 表格数据
            tableData: [],
            hurdles: '',
            // 存放vue变量hurdles
            param: {
                pageNum: 1,
                pageSize: 10
            },
            // 后台总数据
            total: 0,
            // 栏圈最大容量
            Max: [],
            // 所有栏舍
            fenceAll: [],
            // 添加修改栏圈名称
            title: '',
            // 批量禁用的所有id
            hIds: [],
            // 批量禁用传递到后台的数据
            updateEnable: []
        }
    },
    created() {
        // 按钮权限
        this.authsButton = getSubsByUrl(this.$route.path).subs
        this.loadHurdles()
        this.findMax()
        this.fenceHouseAll()
    },
    methods: {

        /**
         * @description: 批量禁用
         * @param {*}
         * @return {*}
         */
        toBatch() {
            if (this.updateEnable.length > 0) {
                this.$confirm('此操作将修改这些栏圈状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    // 确认禁用
                    const res = await updateStatusBatch(this.updateEnable)
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                    this.loadHurdles()
                })
            }
        },
        ///**
        // * @description: 批量禁用
        // * @param {*}
        // * @return {*}
        // */
        //toBatch() {
        //    if (this.hIds.length > 0) {
        //        this.$confirm('此操作将修改该栏圈状态, 是否继续?', '提示', {
        //            confirmButtonText: '确定',
        //            cancelButtonText: '取消',
        //            type: 'warning'
        //        })
        //            .then(async() => {
        //                // 确认禁用
        //                const res = await deleteByIdAll(this.hIds)
        //                this.$message({
        //                    type: 'success',
        //                    message: res.message
        //                })
        //                this.loadHurdles()
        //            })
        //            .catch(() => {
        //                this.$message({
        //                    type: 'info',
        //                    message: '已取消修改'
        //                })
        //            })
        //    }
        //},
        /**
         * @description: 表格选项发生变化触发的事件
         * @param {*}
         * @return {*}
         */
        handleSelectionChange(val) {
            //this.hIds = val.map((item) => {
            //    return item.hId
            //})
            this.updateEnable = val.map(item => {
                return { hId: item.hId, hEnable: item.hEnable }
            })
        },
        /**
         * @description: 去禁用
         * @param {*}
         * @return {*}
         */
        toDisabled(hId, hEnable) {
            this.$confirm('此操作将修改栏圈状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                // 确认禁用
                const res = await updateStatusById(hId, hEnable)
                this.$message({
                    type: 'success',
                    message: res.message
                })
                this.loadHurdles()
            })
        },

        toDelete(hId) {
            this.$confirm('此操作将永久删除该栏圈, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async() => {
                    // 确认禁用
                    const res = await delById(hId)
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                    this.loadHurdles()
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        /**
         * @description: 去修改栏圈信息
         * @param {*}
         * @return {*}
         */
        toEdit(record) {
            this.visible = true
            this.title = '修改栏圈信息'
            this.form = { ...record }
        },
        /**
         * @description: 去添加
         * @param {*}
         * @return {*}
         */
        toAdd() {
            // 抽屉弹出
            this.visible = true
            // 标题
            this.title = '添加栏圈'
            this.form = {}
        },

        /**
         * @description: 去保存
         * @param {*}
         * @return {*}
         */
        toSave() {
            this.$refs['myForm'].validate(async(valid) => {
                //   if (!this.hMax) {
                //   this.errors.push('hMax required.');
                // }
                if (valid) {
                    // alert("submit!");
                    // 发送保存请求
                    const res = await saveOrUpdate(this.form)
                    this.handlerVisibleChange(false)
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                    this.loadHurdles()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        /**
         * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
         * @param {*} val
         * @return {*}
         */
        handlerVisibleChange(val) {
            this.visible = val
            this.$refs['myForm'].resetFields()
        },
        /**
         * @description: 查询所有栏舍
         * @param {*}
         * @return {*}
         */
        async fenceHouseAll() {
            const res = await findAll()
            // console.log(res);
            this.fenceAll = res.data
        },
        /**
         * @description: 查询所有栏圈最大容量
         * @param {*}
         * @return {*}
         */
        async findMax() {
            const res = await findAllMax()
            // console.log(res);
            this.Max = res.data
        },
        /**
         * @description: 页码条数发生变化触发的函数
         * @param {*}
         * @return {*}
         */
        handleSizeChange(pageSize) {
            console.log(pageSize)
            this.param.pageSize = pageSize
            // 重新发送分页查询数据请求
            this.loadHurdles()
        },
        /**
         * @description: 页码发生变化触发的函数
         * @param {*}
         * @return {*}
         */
        handleCurrentChange(pageNum) {
            console.log(pageNum)
            this.param.pageNum = pageNum
            // 重新发送分页查询数据请求
            this.loadHurdles()
        },
        /**
         * @description: 根据分页请求查询数据
         * @param {*}
         * @return {*}
         */
        async loadHurdles(pageNum) {
            if (pageNum) {
                this.param.pageNum = pageNum
            }
            const temp = { ...this.param }
            for (const key in temp) {
                if (!temp[key]) {
                    delete temp[key]
                }
            }
            this.loading = true
            const res = await findByOption(temp)
            // console.log(res);
            this.hurdles = res.data
            this.total = res.data.total
            this.loading = false
        }
    }
}
</script>
