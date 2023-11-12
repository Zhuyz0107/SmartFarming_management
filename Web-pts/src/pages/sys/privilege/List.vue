<template>
  <!-- 权限管理 -->
  <div class="privilege_list">
    <div class="btns">
      <el-button type="primary" size="small" @click="toAdd">添加</el-button>
    </div>
    <el-table
      :data="privileges"
      size="small"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      v-loading="loading"
    >
      <el-table-column prop="name" label="名称" width="150"/>
      <el-table-column prop="route" label="路径" />
      <el-table-column prop="type" label="类型" width="80" align="center" />
      <el-table-column prop="num" label="序号" width="80"  align="center"/>
      <el-table-column prop="icon" label="图标" width="100" align="center"/>
      <el-table-column prop="hidden" label="状态" align="center" width="100">
        <template v-slot="scope">
          <el-tag v-if="scope.row.hidden==0" size="mini">显示</el-tag>
          <el-tag v-else type="info" size="mini">隐藏</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click.prevent="deleteHandler(scope.row.id)">移除</el-button>
          <el-button type="text" size="mini" @click.prevent="toEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 抽屉 -->
    <Briupdrawer :drawer-visible="visible" :title="title" width="40%" @on-change-visible="handlerVisibleChange" >
      <div slot="content">
        <el-form ref="privilege_form" :model="form" :rules="rules">
          <el-form-item label="名称" label-width="80px" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="路径" label-width="80px" prop="route">
            <el-input v-model="form.route" autocomplete="off" />
          </el-form-item>
          <el-form-item label="类型" label-width="80px" prop="type">
            <el-select v-model="form.type" clearable placeholder="请选择">
              <el-option label="菜单" value="menu" />
              <el-option label="方法" value="method" />
            </el-select>
            <el-popover placement="top-start" title="提示" width="300" trigger="hover" content="菜单控制着用户登录后可以动态显示的菜单树；方法为具体的权限，控制着是否可以调用某些接口" >
              <el-button slot="reference" type="text"><i class="el-icon-location-information" /></el-button>
            </el-popover>
          </el-form-item>
        
          <el-form-item label="父权限" label-width="80px">
            <el-cascader filterable v-model="form.parentId" clearable :options="privileges"
              :props="{ expandTrigger: 'hover', value: 'id', label: 'name' ,checkStrictly:true}"
            />
          </el-form-item>
          <el-form-item label="图标" label-width="80px" prop="icon" v-if="form.type === 'menu'">
            <el-input v-model="form.icon" autocomplete="off" />
          </el-form-item>
          <el-form-item label="序号" label-width="80px" prop="num" >
            <el-input v-model="form.num" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态" label-width="80px" prop="hidden" v-if="form.type === 'menu'">
            <el-switch v-model="form.hidden" active-text="隐藏" inactive-text="显示" :active-value="1"
      :inactive-value="0"> </el-switch>
          </el-form-item>
          <el-form-item label="描述" label-width="80px">
            <el-input v-model="form.description" type="textarea" autocomplete="off" />
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
import { get, del, post } from '@/utils/request'
import qs from 'querystring'
import _ from 'lodash'
export default {
  data() {
    return {
      form: {},
      visible: false,
      title: '添加权限',
      privileges: [],
      rules: {
        name: [ { required: true, message: '请输入权限名称', trigger: 'change' } ],
        route: [ { required: true, message: '请输入权限路径', trigger: 'change' } ],
        type: [ { required: true, message: '请选择权限类型', trigger: 'change' } ]
      }
    }
  },
  created() {
    this.loadprivileges()
  },
  methods: {
    submitHandler() {
      this.$refs['privilege_form'].validate((valid) => {
        if (valid) {
          const url = '/privilege/saveOrUpdate'
          post(url, this.form)
            .then(response => {
              this.visible = false
              this.$message({ message: response.message, type: 'success' })
              this.loadprivileges()
            })
        } else {
          return false
        }
      })
    },
    loadprivileges() {
      this.loading = true;
      const url = '/privilege/findPrivilegeTree'
      get(url)
      .then(response => {
        this.foo(response.data)
        this.privileges = response.data
        this.loading = false;
      })
    },
    foo(privileges) {
      for (const p of privileges) {
        if (p.children && p.children.length === 0) {
          delete p.children
        } else {
          this.foo(p.children)
        }
      }
    },
    toAdd() {
      this.form = {}
      this.visible = true
    },
    deleteHandler(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = '/privilege/deleteById?id=' + id
        del(url).then(response => {
          this.$message({ type: 'success', message: response.message })
          this.loadprivileges()
        })
      })
    },
    toEdit(record) {
      this.form = _.clone(record);
      this.visible = true
    },
    //处理visible变化的钩子函数,解决抽屉无法收缩的bug
    handlerVisibleChange(val){
      this.visible=val;
      this.$refs['privilege_form'].resetFields();
    },
  }
}
</script>
