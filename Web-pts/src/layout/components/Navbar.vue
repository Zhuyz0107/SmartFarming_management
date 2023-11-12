<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="
        hamburger-container
        animate__animated animate__pulse animate__infinite
      "
      @toggleClick="toggleSideBar"
    />
    <div class="other-project">
      <a
        :href="portalUrl"
        target="_blank"
      >门户项目</a>
      <a
        :href="libUrl"
        target="_blank"
      >智慧农业知识库</a>
      <a
        :href="uadpUrl"
        target="_blank"
      >泛在接入平台</a>

      <!-- <a
        :href="'http://www.baidu.com?token=' + getToken()"
        target="_blank"
      >其他项目3</a>
      <a
        :href="'http://www.baidu.com?token=' + getToken()"
        target="_blank"
      >其他项目4</a> -->
    </div>

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <template v-if="device !== 'mobile'" />

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar || baseAvatar"
            class="user-avatar animate__animated animate__fadeIn"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display: block" @click="toChangePassword">修改密码</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided> -->
          <el-dropdown-item>
            <span style="display: block" @click="logout">退出</span>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
      <div style="float: left; font-size: 12px; line-height: 50px">
        欢迎您：
        <el-button type="text" size="mini">{{ user.username }}</el-button>
      </div>
    </div>
    <iframe
      style="height: 30px; margin-top: 10px; float: right"
      frameborder="0"
      scrolling="no"
      hspace="0"
      src="http://i.tianqi.com/index.php?c=code&a=getcode&id=34&h=25&w=280"
    />
    <BriupPassword :visible="visible" @cancel="visible=false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import BriupPassword from '@/components/BriupPassword'
import { getToken } from '@/utils/auth'
import { libUrl, portalUrl, uadpUrl } from '@/utils/common'
export default {
  components: {
    Hamburger,
    BriupPassword
  },
  data() {
    return {
      libUrl,
      portalUrl,
      uadpUrl,
      baseAvatar: require('@/assets/girl.png'),
      visible: false
    }
  },
  computed: {
    ...mapGetters(['user', 'sidebar', 'avatar', 'device'])
  },
  methods: {
    getToken,
    // 去修改密码
    toChangePassword() {
      this.visible = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // background: #eee;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .other-project {
    display: inline-block;
    a {
      display: inline-block;
      text-align: center;
      width: 120px;
      line-height: 30px;
      background-image: url("../../assets/btn_bg.png");
      background-size: 100% 100%;
      margin-top: 10px;
      margin-left: 20px;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
