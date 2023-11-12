
<template>
  <div class="department_list">
    <!-- 按钮 -->
    <div class="btns">
      <el-button size="small" type="primary" @click="toAddHandler">新增</el-button>
    </div>
    <!--/ 按钮 -->
    <!-- 表格 -->
    <el-table size="small" :data="depts" row-key="id" default-expand-all border :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
      <el-table-column prop="depName" label="部门名称" />
      <el-table-column prop="leader" label="负责人" width="100" align="center" />
      <el-table-column prop="telephone" label="联系方式" width="160" align="center" />
      <el-table-column prop="email" label="email" width="180" align="center" />
      <el-table-column width="120" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="delHandler(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- / 表格 -->
    <!-- 抽屉 -->
    <Briupdrawer :drawer-visible="visible" :title="title" width="40%" @on-change-visible="handlerVisibleChange">
      <div slot="content">
        <el-form ref="dept_form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="部门名称" prop="depName">
            <el-input v-model="form.depName" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-cascader
              v-model="form.parentId"
              filterable
              clearable
              :options="depts"
              :props="{ checkStrictly: true ,children:'child',label:'depName',value:'id', emitPath: false}"
            />
          </el-form-item>
          <el-form-item label="序号" prop="sort">
            <el-input v-model="form.sort" />
          </el-form-item>
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="form.leader" />
          </el-form-item>
          <el-form-item label="手机" prop="telephone">
            <el-input v-model="form.telephone" />
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitHandler">确 定</el-button>
      </span>
    </Briupdrawer>
    <!-- 抽屉结束 -->
  </div>
</template>

<script>
import { get, post } from '@/utils/request'
import _ from 'lodash'

export default {
  // 组件名称
  name: 'Demo',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      depts: [],
      form: {},
      title: '新增',
      visible: false,
      rules: {
        depName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        leader: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        telephone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 以下是生命周期钩子
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
  */
  created() {
    this.loadDept()
  },
  /**
  * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
  */
  mounted() {
  },
  /**
  * 实例销毁之前调用。在这一步，实例仍然完全可用。
  */
  beforeDestroy() {
  },
  /**
  * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
  * 所有的事件监听器会被移除，所有的子实例也会被销毁。
  */
  destroyed() {
  },
  // 组件方法
  methods: {
    // 删除
    delHandler(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = '/dept/deleteById'
        get(url, { id: row.id })
          .then(response => {
            this.$message({ type: 'success', message: response.message })
            this.loadDept()
          })
      })
    },
    // 提交处理函数
    submitHandler() {
      this.$refs['dept_form'].validate((valid) => {
        if (valid) {
          const url = '/dept/saveOrUpdate'
          post(url, this.form)
            .then(response => {
              this.visible = false
              this.$message({ message: response.message, type: 'success' })
              this.loadDept()
            })
        } else {
          return false
        }
      })
    },
    // 去编辑
    toEdit(row) {
      this.form = _.clone(row)
      this.visible = true
    },
    // 去添加
    toAddHandler() {
      this.form = {}
      this.visible = true
    },
    // 加载部门信息
    loadDept() {
      const url = '/dept/queryTree'
      get(url).then(response => {
        this.depts = response.data
      })
    },
    // 处理visible变化的钩子函数,解决抽屉无法收缩的bug
    handlerVisibleChange(val) {
      this.visible = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>

</style>
