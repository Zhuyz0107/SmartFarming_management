<!--
 * @Description: 修改用户密码
 * @Author: Ronda
 * @Date: 2022-03-16 15:05:28
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-16 15:47:22
-->
<template>
  <el-dialog title="修改密码" :visible.sync="visible" :before-close="toCancel" :append-to-body="true">
    <el-form ref="ruleForm" :rules="rules" :model="form">
      <el-form-item prop="oldPwd" label="旧密码" :label-width="formLabelWidth">
        <el-input v-model="form.oldPwd" placeholder="请输入旧密码" show-password />
      </el-form-item>
      <el-form-item prop="newPwd" label="新密码" :label-width="formLabelWidth">
        <el-input v-model="form.newPwd" placeholder="请输入新密码" show-password />
      </el-form-item>
      <el-form-item prop="rePasswd" label="重复新密码" :label-width="formLabelWidth">
        <el-input v-model="form.rePasswd" placeholder="请再次输入新密码" show-password />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toCancel">取 消</el-button>
      <el-button type="primary" @click="submitForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changePassword } from '@/api/base/account'
export default {
  props: {
    visible: Boolean
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        rePasswd: ''
      },
      formLabelWidth: '120px',
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        rePasswd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }

    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * @description: 提交表单
     * @param {*} formName
     * @return {*}
     */
    submitForm() {
      this.$refs['ruleForm'].validate(async(valid) => {
        if (valid) {
          const res = await changePassword(this.form)
          this.$message({ message: res.message, type: 'success' })
          this.toCancel()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description: 重置表单关闭模态框
     * @param {*} formName
     * @return {*}
     */
    toCancel() {
      this.$refs['ruleForm'].resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
<style scoped>
</style>
