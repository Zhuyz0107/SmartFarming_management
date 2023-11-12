<!--
 * @Description:
 * @Author: charles
 * @Date: 2021-07-23 17:31:52
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-20 00:34:42
-->
<template>
  <div class="register">
    <!-- 头部 -->
    <div class="header">
      <div class="wrapper">
        <div class="left">
          <div class="logo">
            <img :src="logo" alt="">
          </div>
          <div class="title">
            Briup 智慧农业溯源管理系统
          </div>
        </div>
        <div class="right">
          <a href="#" @click.prevent="toLogin">登录</a>
        </div>
      </div>
    </div>
    <!-- /头部 -->

    <!-- 体部 -->
    <div class="content">
      <div class="content_wrapper">
        <div class="info">
          <h2>档案注册</h2>
          欢迎您来到杰普软件，请认真填写个人信息，这些信息将是您的杰普学生档案基础，在未来的学习生活工作中起到重要作用。
        </div>
        <el-form ref="register_form" label-width="100px" size="small" :model="form" :rules="rules">
          <div class="sub_title">基本信息</div>
          <el-row>
            <el-col>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="form.idCard" placeholder="身份证号作为账号进行登录，是您在杰普档案的唯一标识" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12">
              <el-form-item label="姓名" prop="realname">
                <el-input v-model="form.realname" />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="form.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12">
              <el-form-item label="钉钉手机号" prop="ddTel">
                <el-input v-model="form.ddTel" />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="手机号" prop="tel">
                <el-input v-model="form.tel" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="24">
              <el-form-item label="qq" prop="qq">
                <el-input v-model="form.qq" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12">
              <el-form-item label="监护人" prop="guardian">
                <el-input v-model="form.guardian" placeholder="监护人姓名" />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="联系方式" prop="guardianTel">
                <el-input v-model="form.guardianTel" placeholder="填写监护人手机号" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :md="12">
              <el-form-item label="籍贯" prop="nativePlace">
                <el-cascader
                  v-model="form.nativePlace"
                  clearable
                  :options="pca"
                  :props="{children: 'children', label: 'name', value: 'name'}"
                />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="政治面貌" prop="politicsStatus">
                <el-select v-model="form.politicsStatus">
                  <el-option label="团员" value="团员" />
                  <el-option label="党员" value="党员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="家庭住址" prop="homeAddress">
                <el-cascader
                  v-model="form.pca"
                  clearable
                  :options="pca"
                  :props="{children: 'children', label: 'name', value: 'name'}"
                />
                <el-input v-model="form.homeAddress" style="width:60%" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="sub_title">渠道信息</div>
          <el-row>
            <el-col :md="12">
              <el-form-item label="学校渠道" prop="channelId">
                <el-cascader
                  v-model="form.channelId"
                  filterable
                  style="width:100%"
                  clearable
                  :options="channels"
                  placeholder="请选择院校渠道"
                  :props="{ children:'children',label:'name',value:'id', emitPath: false}"
                />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="杰普班级" prop="directionIdAndclazzId">
                <el-cascader
                  v-model="form.directionIdAndclazzId"
                  filterable
                  clearable
                  :options="directionClazzTree"
                  placeholder="请选择班级"
                  :props="{ children:'clazzes',label:'name',value:'id'}"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12">
              <el-form-item label="校内班级" prop="schoolStuClazz">
                <el-input v-model="form.schoolStuClazz" placeholder="请输入完整的校内班级名称" />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="校内学号" prop="schoolStuNo">
                <el-input v-model="form.schoolStuNo" placeholder="请输入完整的校内学号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12">
              <el-form-item label="毕业时间" prop="graduationTime">
                <el-date-picker v-model="form.graduationTime" value-format="timestamp" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="专业" prop="major">
                <el-input v-model="form.major" placeholder="请输入完整的专业名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="12">
              <el-form-item label="学历" prop="education">
                <el-select v-model="form.education">
                  <el-option label="专科" value="专科" />
                  <el-option label="本科" value="本科" />
                  <el-option label="研究生" value="研究生" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="外语水平" prop="flp">
                <el-select v-model="form.flp">
                  <el-option value="无" label="无" />
                  <el-option value="CET4" label="CET4" />
                  <el-option value="CET6" label="CET6" />
                  <el-option value="CET8" label="CET8" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align:center">
            <el-col>
              <el-button type="primary" @click="submitHandler">提 交</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- /体部 -->

    <!-- 底部 -->
    <div class="footer">
      <div class="copyright">
        上海杰普软件科技有限公司 沪ICP备07000318号-1
      </div>
    </div>
    <!-- /底部 -->

  </div>
</template>
<script>
import { post } from '@/utils/request'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import pca from '@/assets/pca.json'

export default {
  data() {
    return {
      pca,
      form: {
        gender: '男'
      },
      logo: 'http://121.199.29.84:8888/group1/M00/00/14/rBD-SV-qJk2AE0ohAAHZ6va2pPY262.png',
      rules: {
        ddTel: [{ required: true, message: '请输入钉钉手机号', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        qq: [{ required: true, message: '请输入qq', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        birth: [{ required: true, message: '请输入生日', trigger: 'blur' }],
        flp: [{ required: true, message: '请选择外语水平', trigger: 'change' }],
        major: [{ required: true, message: '请输入专业', trigger: 'change' }],
        channelId: [{ required: true, message: '请选择院校渠道', trigger: 'change' }],
        education: [{ required: true, message: '请选择学历', trigger: 'change' }],
        graduationTime: [{ required: true, message: '请选择毕业时间', trigger: 'change' }],
        guardian: [{ required: true, message: '请输入监护人姓名', trigger: 'blur' }],
        guardianTel: [{ required: true, message: '请输入监护人手机号', trigger: 'blur' }],
        homeAddress: [{ required: true, message: '请输入家庭住址', trigger: 'blur' }],
        nativePlace: [{ required: true, message: '请选择籍贯', trigger: 'change' }],
        politicsStatus: [{ required: true, message: '请选择政治面貌', trigger: 'blur' }],
        directionIdAndclazzId: [{ required: true, message: '请选择杰普班级', trigger: 'change' }],
        schoolStuClazz: [{ required: true, message: '请输入校内班级', trigger: 'blur' }],
        schoolStuNo: [{ required: true, message: '请输入校内学号', trigger: 'blur' }]
      }
    }
  },

  computed: {
    ...mapGetters(['channels', 'directionClazzTree'])
  },
  created() {
    this.loadChannels()
    this.loadDirectionClazzTree()
  },
  methods: {
    ...mapActions('base', ['loadChannels', 'loadDirectionClazzTree']),
    toLogin() {
      this.$router.push({ path: '/login' })
    },
    submitHandler() {
      this.$refs['register_form'].validate((valid) => {
        if (valid) {
          const form = _.cloneDeep(this.form)
          form.nativePlace = form.nativePlace.join('/')
          form.homeAddress = form.pca.join(' ') + ' ' + form.homeAddress
          form.directionId = form.directionIdAndclazzId[0]
          form.clazzId = form.directionIdAndclazzId[1]
          delete form.directionIdAndclazzId
          delete form.pca
          // 提交
          const url = '/student/register'
          post(url, form)
            .then(response => {
              this.$notify({
                type: 'success',
                title: response.message,
                message: '您可以使用身份证号作为账号进行登录，密码默认为123456',
                duration: 0
              })
              this.$router.go(-1)
            })
        } else {
          return false
        }
      })
    }
  }

}
</script>
<style scoped lang="scss">
.register {
  .info {
    padding:1em 0;
  }
  .content_wrapper,
  .wrapper {
    width: 90%;
    margin: 0 auto;
  }
  .content_wrapper {
    background-color: #fff;
    padding: .2em 1em;
    min-height: 300px;
  }
  .content {
    background-color: #f3f3f9;

  }
  .header {
    background-color: #4fbc8d;
    color: #fff;
    height:50px;
    .left {
      .logo {
        float: left;
        width:42px;
        img {
          width:100%
        }
      }
      .title {
        float: left;
        font-weight: bold;
        font-size: 18px;
        line-height: 50px;
        margin-left: 1em;
      }
    }
    .right {
      float: right;
      line-height: 50px;
    }

  }
  .footer {
    background-color: #f3f3f9;
    padding: 1em 0;
    text-align: center;
    .copyright {
      line-height: 2em;
    }
  }
}
</style>
