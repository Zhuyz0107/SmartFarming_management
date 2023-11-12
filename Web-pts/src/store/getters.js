/*
 * @Description: 仓库总getter映射
 * @Author: Ronda
 * @Date: 2021-03-11 10:27:18
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-15 14:58:38
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  // 用户权限树
  authsMe: state => state.user.authsMe,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  user: state => state.user.user,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
