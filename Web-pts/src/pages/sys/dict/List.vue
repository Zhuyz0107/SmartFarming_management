
<template>
  <div class="dict_list">
    <!-- 按钮 -->
    <div class="btns">
      <el-button size="small" type="primary" @click="toAddHandler">新增</el-button>
    </div>
    <!--/ 按钮 -->
    <!-- 表格 -->
    <el-table size="small" :data="dictData.list">
      <el-table-column label="序号" type="index" :index="1" align="center" />
      <el-table-column prop="dictLabel" label="label" width="100" />
      <el-table-column prop="dictType" label="类型" width="100" align="center" />
      <el-table-column prop="dictName" label="名称" width="160" align="center" />
      <el-table-column prop="dictVal" label="值" />
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
        <el-form ref="dict_form" :model="form" :rules="rules" label-width="60px">
          <el-form-item label="label" prop="dictLabel">
            <el-input v-model="form.dictLabel" />
          </el-form-item>
          <el-form-item label="类型" prop="dictType">
            <el-select v-model="form.dictType">
              <el-option label="系统内置" value="sys" />
              <el-option label="自定义" value="customer" />
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="dictName">
            <el-input v-model="form.dictName" />
          </el-form-item>
          <el-form-item label="值" prop="dictVal">
            <el-input v-model="form.dictVal" />
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
      dictData: {
        list: []
      },
      form: {},
      title: '新增',
      visible: false,
      param: {
        page: 1,
        pageSize: 10
      },
      rules: {
        dictName: [{ required: true, message: '请输入数据字典名称', trigger: 'blur' }],
        dictType: [{ required: true, message: '请选择数据类型', trigger: 'change' }],
        dictLabel: [{ required: true, message: '请输入label', trigger: 'blur' }],
        dictVal: [{ required: true, message: '请输入值', trigger: 'blur' }]
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
        const url = '/dict/deleteById'
        get(url, { id: row.id })
          .then(response => {
            this.$message({ type: 'success', message: response.message })
            this.loadDept()
          })
      })
    },
    // 提交处理函数
    submitHandler() {
      this.$refs['dict_form'].validate((valid) => {
        if (valid) {
          const url = '/dict/saveOrUpdate'
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
    // 加载数据字典信息
    loadDept() {
      const url = '/dict/pageQuery'
      get(url, this.param).then(response => {
        this.dictData = response.data
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
