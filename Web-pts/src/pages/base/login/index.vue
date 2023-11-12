<!--
 * @Description: 登录页面
 * @Author: Ronda
 * @Date: 2021-07-23 22:10:20
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-24 16:43:57
-->
<template>
  <div class="login-container">
    <!-- 中间 -->
    <div class="center animate__animated animate__fadeInDown">
      <div class="header animate__animated animate__fadeInDown">
        <div class="title">
          <strong>BRIUP</strong>&nbsp;&nbsp;智慧农业溯源系统
        </div>
      </div>
      <!-- 表单 -->
      <div class="form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
          size="small"
        >
          <!-- <div class="split" /> -->
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              type="text"
            >
              <el-button slot="prepend">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
              </el-button>
            </el-input>
          </el-form-item>
          <div style="height: 20px" />
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
            >
              <el-button slot="prepend">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
              </el-button>
              <el-button slot="append">
                <span class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType === 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span>
              </el-button>
            </el-input>
          </el-form-item>
          <div style="height: 20px" />
          <el-button
            type="success"
            :loading="loading"
            style="width: 100%"
            @click.native.prevent="handleLogin"
            >登录
          </el-button>
        </el-form>
        <!-- 表单 -->
      </div>
    </div>
    <div class="footer">
      <div class="copyright">上海杰普软件科技有限公司 沪ICP备07000318号-1</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      visible: false,
      form: {},
      loginForm: {
        username: "admin",
        password: "admin"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    // 重置表单校验
    clearValidate() {
      this.$refs["registerForm"].clearValidate();
    },
    // 密码切换显示
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录按钮
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #f4f4f4;
  overflow-x: hidden;
  overflow-y: auto;
  background-image: url(../../../assets/login_bg.png);
  background-size: 100% 100%;

  .center {
    box-sizing: border-box;
    position: absolute;
    top: 60px;
    right: 4%;
    background-color: rgba(0, 0, 0, 0.5);
    width: 70%;
    // margin: 0 auto;
    border-radius: 5px;
    padding: 60px 3em 70px;
    // padding-bottom:80px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    .header {
      height: 60px;
      position: relative;
      color: #ffffff;
      .title {
        text-align: center;
        position: absolute;
        // bottom: 180px;
        width: 100%;
        font-size: 26px;
      }
    }
    /* .split {
      width: 100%;
      height: 90px;
      margin: 0 auto 20px;
      background-image: url(../../../assets/login_bg_city.png);
      background-size: 100% 100%;
      margin-bottom: 1em;
    } */
  }
  @media (max-width: 768px) {
    .center {
      width: 60%;
    }
  }
  @media (min-width: 1024px) {
    .center {
      min-width: 420px;
      width: 34%;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 3em;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
  }
  .svg-container {
    color: #42d885;
    // color:#fff;
  }
}
</style>
