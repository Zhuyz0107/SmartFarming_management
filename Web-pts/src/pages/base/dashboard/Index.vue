<!--
 * @Description: 系统首页
 * @Author: Ronda
 * @Date: 2020-08-04 16:47:38
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-15 16:40:33
-->
<template>
  <div class="dashboard-container">
    <!-- {{ roles }} -->
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
