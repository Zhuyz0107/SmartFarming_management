<!--
 * @Description:  动物管理
 * @Author: Ronda
 * @Date: 2022-03-25 17:28:37
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 20:38:36
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
                <!-- <el-form-item>
                  <el-select v-model="param.aBatchId" clearable placeholder="所属批次">
                    <el-option v-for="item in batchData" :key="item.bSerialId" :label="item.bSerialId"
                      :value="item.bSerialId" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="param.aHurdlesId" clearable placeholder="所属栏圈">
                    <el-option v-for="item in hurdlesData" :key="item.hId"
                      :label="item.hName+'-'+(item.managerFenceHouse?item.managerFenceHouse.fhName:'')" :value="item.hId" />
                  </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-select v-model="param.aHealthy" clearable placeholder="健康状态">
                        <el-option label="健康" value="健康"/>
                        <el-option label="生病" value="生病"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="param.aGender" clearable placeholder="性别">
                        <el-option label="雌性" value="雌性"/>
                        <el-option label="雄性" value="雄性"/>
                    </el-select>
                </el-form-item>
                <el-button type="text" size="mini" @click="loadAnimal(1)"
                >搜索
                </el-button
                >
            </el-form>
        </div>
        <el-table
            v-loading="loading"
            border
            :data="animalData.list"
            size="small"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center" fixed/>
            <el-table-column
                fixed
                align="center"
                type="index"
                :index="1"
                label="序号"
            />
            <el-table-column prop="aAnimalId" label="编号" width="260" fixed/>
            <el-table-column label="二维码" width="130" prop="aBackup3">
                <template slot-scope="scope">
                    <el-popover
                        v-if="scope.row.aBackup3"
                        size="mini"
                        trigger="hover"
                        placement="top"
                    >
                        <img
                            style="width:100px;height:100px"
                            :src="scope.row.aBackup3"
                            alt=""
                        />
                        <div slot="reference" class="name-wrapper">
                            <img
                                style="width:50px;height:50px"
                                :src="scope.row.aBackup3"
                                alt=""
                            />
                        </div>
                    </el-popover>
                    <div v-else>暂无</div>
                </template>
            </el-table-column>

            <el-table-column prop="aWeight" label="体重">
                <template slot-scope="scope">
                    {{ scope.row.aWeight }} KG
                </template>
            </el-table-column>
            <el-table-column prop="aGender" label="性别"/>
            <el-table-column prop="aHealthy" label="健康状态"/>
            <el-table-column prop="aStatus" label="过程状态"/>
            <el-table-column prop="aInoculate" label="疫苗接种状态" width="120"/>
            <el-table-column prop="aBatchId" label="所属批次" width="260"/>
            <el-table-column label="所属栏圈" width="160">
                <template slot-scope="scope">
                    <el-tag size="medium"
                    >{{ scope.row.managerFenceHouse }}-{{ scope.row.managerHurdles }}
                    </el-tag>
                    <!--  <el-popover size="mini" trigger="hover" placement="top">
                      <p>栏圈名称: {{ scope.row.managerHurdles.hName }}</p>
                      <p>栏圈编号: {{ scope.row.managerHurdles.hId }}</p>
                      <p>
                        所属栏舍:
                        {{
                          scope.row.managerHurdles.managerFenceHouse
                            ? scope.row.managerHurdles.managerFenceHouse.fhName
                            : ""
                        }}
                      </p>
                      <p>栏舍编号: {{ scope.row.managerHurdles.hFenceId }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium"
                          >{{ scope.row.managerHurdles.hName }}-{{
                            scope.row.managerHurdles.managerFenceHouse
                              ? scope.row.managerHurdles.managerFenceHouse.fhName
                              : ""
                          }}
                        </el-tag>
                      </div>
                    </el-popover> -->
                </template>
            </el-table-column>
            <el-table-column prop="aTime" label="购入时间" width="150"/>
            <el-table-column label="操作" align="center" width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="mini"
                        @click.prevent="toProduct(scope.row.aAnimalId)"
                    >生成二维码
                    </el-button
                    >
                    <el-button
                        v-if="
              authsButton.filter(item => {
                return item.perms === perms.delete;
              }).length > 0
            "
                        type="text"
                        size="mini"
                        @click.prevent="toDelete(scope.row.aAnimalId)"
                    >移除
                    </el-button
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
                    >修改
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
                :total="animalData.total"
                :page-size="param.pageSize"
                :current-page="param.pageNum"
                :page-sizes="[2, 10, 15, 30, 50, 80]"
                @current-change="currentChangeHandler"
                @size-change="sizeChangeHandler"
            />
        </div>
        <!-- 分页 -->

        <!-- 抽屉 添加和修改动物信息 -->
        <Briupdrawer
            :drawer-visible="visible"
            :title="title"
            width="40%"
            @on-change-visible="handlerVisibleChange"
        >
            <div slot="content">
                <el-form ref="animal_form" :model="form" :rules="rules">
                    <el-form-item
                        label="初始体重(KG)"
                        :label-width="formLabelWidth"
                        prop="aWeight"
                    >
                        <el-input v-model="form.aWeight" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item
                        label="性别"
                        :label-width="formLabelWidth"
                        prop="aGender"
                    >
                        <el-radio-group v-model="form.aGender">
                            <el-radio label="雌性"/>
                            <el-radio label="雄性"/>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="健康状态"
                        :label-width="formLabelWidth"
                        prop="aHealthy"
                    >
                        <el-radio-group v-model="form.aHealthy">
                            <el-radio label="健康"/>
                            <el-radio label="生病"/>
                        </el-radio-group>
                    </el-form-item>
<!--                    <el-form-item-->
<!--                        label="过程状态"-->
<!--                        :label-width="formLabelWidth"-->
<!--                        prop="aStatus"-->
<!--                    >-->
<!--                        <el-radio-group v-model="form.aStatus">-->
<!--                            <el-radio label="养殖中"/>-->
<!--                            <el-radio label="已检疫"/>-->
<!--                            <el-radio label="已出栏"/>-->
<!--                            <el-radio label="已屠宰"/>-->
<!--                            <el-radio label="已入库"/>-->
<!--                            <el-radio label="已销售"/>-->
<!--                        </el-radio-group>-->
<!--                    </el-form-item>-->
                    <el-form-item
                        label="疫苗接种状态"
                        :label-width="formLabelWidth"
                        prop="aInoculate"
                    >
                        <el-radio-group v-model="form.aInoculate">
                            <el-radio label="未接种"/>
                            <el-radio label="已接种"/>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="所属批次"
                        :label-width="formLabelWidth"
                        prop="aBatchId"
                    >
                        <el-select v-model="form.aBatchId" placeholder="请选择所属批次" :disabled="isDisabled">
                            <el-option
                                v-for="item in batchData"
                                :key="item.bSerialId"
                                :label="item.bSerialId"
                                :value="item.bSerialId"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="所属栏圈"
                        :label-width="formLabelWidth"
                        prop="aHurdlesId"
                    >
                        <el-select v-model="form.aHurdlesId" placeholder="请选择所属栏圈">
                            <el-option
                                v-for="item in hurdlesData"
                                :key="item.hId"
                                :label="
                  item.hName +
                    '-' +
                    (item.managerFenceHouse
                      ? item.managerFenceHouse.fhName
                      : '')
                "
                                :value="item.hId"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="购入时间"
                        :label-width="formLabelWidth"
                        prop="aTime"
                    >
                        <el-date-picker
                            v-model="form.aTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
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
    productQRCode
} from '@/api/ptsBase/animal'
import { findAll as findAllBatch } from '@/api/ptsBase/batch'
import { findAll as findAllHurdles } from '@/api/ptsBase/hurdles'
// 按钮权限
import { getSubsByUrl, authsPerms } from '@/utils/common'

export default {
    data() {
        return {
            // 静态按钮权限列表
            perms: authsPerms.animal,
            // 当前页面的按钮权限
            authsButton: [],
            // 表格数据加载中
            loading: false,
            // 动物数据
            animalData: [],
            // 所有批次数据
            batchData: [],
            // 所有栏圈数据
            hurdlesData: [],
            // 新增和修改模态框
            visible: false,
            // 标题
            title: '添加动物信息',
            // 新增和修改动物的数据
            form: {},
            // 表单标签宽度
            formLabelWidth: '120px',
            // 批量删除的数据
            ids: [],
            // 搜索的数据
            param: {
                pageNum: 1,
                pageSize: 10
            },
            isDisabled: false,
            rules: {
                aWeight: [
                    { required: true, message: '请输入初始体重', trigger: 'blur' }
                    // { type: 'number', message: '初始体重数据要求是数值', trigger: 'blur' }
                ],
                aGender: [
                    { required: true, message: '请选择动物性别', trigger: 'change' }
                ],
                aHealthy: [
                    { required: true, message: '请选择健康状态', trigger: 'change' }
                ],
                aStatus: [
                    { required: true, message: '请选择过程状态', trigger: 'change' }
                ],
                aInoculate: [
                    { required: true, message: '请选择疫苗接种状态', trigger: 'change' }
                ],
                aBatchId: [
                    { required: true, message: '请选择所属批次', trigger: 'change' }
                ],
                aHurdlesId: [
                    { required: true, message: '请选择所属栏圈', trigger: 'change' }
                ],
                aTime: [
                    {
                        type: 'string',
                        required: true,
                        message: '请选择购入时间',
                        trigger: 'change'
                    }
                ],
            }
        }
    },
    created() {
        // 通过当前页面的路由获取页面的按钮权限
        // 按钮权限
        this.authsButton = getSubsByUrl(this.$route.path).subs
        // 加载数据
        this.loadAnimal()
        /* this.loadAllBatch();
        this.loadAllHurdles(); */
    },
    methods: {
        /**
         * @description: 加载动物信息
         * @param {*}
         * @return {*}
         */
        async loadAnimal(pageNum) {
            if (pageNum) {
                this.param.pageNum = pageNum
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
         * @description: 添加按钮
         * @param {*}
         * @return {*}
         */
        toAdd() {
            this.loadAllBatch()
            this.loadAllHurdles()
            this.form = {}
            this.title = '添加动物信息'
            this.visible = true
        },
        /**
         * @description: 修改按钮
         * @param {*} record
         * @return {*}
         */
        toEdit(record) {
            this.loadAllBatch()
            this.loadAllHurdles()
            //  aWeight: +record.aWeight
            this.form = { ...record }
            this.title = '修改动物信息'
            this.isDisabled = true
            this.visible = true
        },
        /**
         * @description: 保存动物信息
         * @param {*}
         * @return {*}
         */
        toSave() {
            this.$refs['animal_form'].validate(async valid => {
                if (valid) {
                    const res = await saveOrUpdate(this.form)
                    this.handlerVisibleChange(false)
                    this.$message({ message: res.message, type: 'success' })
                    if (this.title === '添加动物信息') {
                        // 处理分页bug
                        this.loadAnimal(1)
                    } else {
                        this.loadAnimal()
                    }
                } else {
                    return false
                }
            })
        },
        /**
         * @description: 生成二维码
         * @param {*} id 动物id
         * @return {*}
         */
        toProduct(id) {
            this.$confirm('确定生成二维码吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await productQRCode(id)
                this.$message({ type: 'success', message: res.message })
                this.loadAnimal()
            })
        },
        /**
         * @description: 删除动物
         * @param {*} id 动物id
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
                this.loadAnimal()
            })
        },
        /**
         * @description: 批量删除动物
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
                    this.loadAnimal()
                })
            } else {
                this.$message({ type: 'warning', message: '请选择要批量删除的数据' })
            }
        },
        /**
         * @description: 当前页发生改变
         * @param {*} pageNum
         * @return {*}
         */
        currentChangeHandler(pageNum) {
            this.param.pageNum = pageNum
            this.loadAnimal()
        },
        /**
         * @description: 条数发生变化
         * @param {*} pageSize 条数
         * @return {*}
         */
        sizeChangeHandler(pageSize) {
            this.param.pageNum = 1
            this.param.pageSize = pageSize
            this.loadAnimal()
        },
        /**
         * @description: 表格多选切换
         * @param {*} val
         * @return {*}
         */
        handleSelectionChange(val) {
            this.ids = val.map(item => item.aAnimalId)
        },
        /**
         * @description: 处理visible变化的钩子函数,解决抽屉无法收缩的bug
         * @param {*} val
         * @return {*}
         */
        handlerVisibleChange(val) {
            this.visible = val
            this.$refs['animal_form'].resetFields()
        }
    }
}
</script>
<style scoped lang="scss"></style>
