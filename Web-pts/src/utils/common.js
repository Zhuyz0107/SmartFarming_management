/*
 * @Description: 公共方法封装
 * @Author: Ronda
 * @Date: 2022-03-11 17:03:25
 * @LastEditors: Ronda
 * @LastEditTime: 2023-06-25 09:13:16
 */

import { getAuths } from '@/utils/auth'
// 文件上传地址
export const upFileUrl = 'http://localhost:9999/file/upload'
// 文件阅读服务器
export const downloadFileUrl = 'http://121.224.77.1:9527/'

// 其他项目入口地址
// 智慧农业知识库
export const libUrl = 'http://121.224.77.1:34889/briup-pts-lib/'
// 门户
export const portalUrl = 'http://121.224.77.1:34882/'
// 泛在接入平台
export const uadpUrl = 'https://uadp.briup.cn/login'

/* let system = [{
  name: '权限管理',
  url: '/base/auth/Index'
}, {
  name: '用户管理',
  url: '/base/user/Index'
}, {
  name: '日志管理',
  url: '/base/logs/Index'
}, {
  name: '挂载API',
  url: '/base/api/Index'
}, {
  name: '角色管理',
  url: '/base/role/Index'
}, {
  name: '日志管理',
  url: '/base/logs/Index'
}]; */

// 权限字符串，如果在api挂载中挂载了，则需要在这边操作一下，作为按钮的判断条件，用于消除魔法字符串
export const authsPerms = {

  // 2. 基础管理
  // 栏舍管理
  fenceHouse: {
    saveOrUpdate: 'fenceHouse_saveOrUpdate',
    delete: 'fenceHouse_deleteById',
    deleteAll: 'fenceHouse_deleteByIdAll',
    details: 'fenceHouse_selectById'
  },
  // 栏圈管理
  hurdles: {
    saveOrUpdate: 'fenceHouse_queryAll;hurdles_saveOrUpdate',
    delete: 'hurdles_deleteById',
    deleteAll: 'hurdles_deleteByIdAll'
  },
  // 批次管理
  batch: {
    saveOrUpdate: 'batch_saveOrUpdate',
    delete: 'batch_deleteById',
    deleteAll: 'batch_deleteByIdAll'
  },
  // 动物管理
  animal: {
    saveOrUpdate: 'animal_saveOrUpdate;batch_queryAll;hurdles_selectAllHurdles',
    delete: 'animal_deleteById',
    deleteAll: 'animal_deleteByIdAll'
  },
  // 饲料管理
  feed: {
    saveOrUpdate: 'feed_saveOrUpdate;file_upload',
    delete: 'feed_deleteById',
    deleteAll: 'feed_deleteByIdAll'
  },
  // 疫苗管理
  vaccines: {
    saveOrUpdate: 'vaccines_saveOrUpdate',
    delete: 'vaccines_deleteById',
    deleteAll: 'vaccines_deleteByIdAll'
  },
  // 病症管理
  disease: {
    saveOrUpdate: 'disease_saveOrUpdate',
    delete: 'disease_deleteById',
    deleteAll: 'disease_deleteByIdAll'
  },
  // 屠宰组管理
  slaughteringGroup: {
    saveOrUpdate: 'slaughteringGroup_saveOrUpdate',
    delete: 'slaughteringGroup_deleteById',
    deleteAll: 'slaughteringGroup_deleteByIdAll',
    setAccount: 'slaughteringGroup_updateAccount;slaughteringGroup_selectAllAccount'
  },
  // 冷库管理
  freezer: {
    saveOrUpdate: 'freezer_saveOrUpdate;base_role_findAll;user_selectByRoleId',
    delete: 'freezer_deleteById',
    deleteAll: 'freezer_deleteByIdAll'
  },
  // 客户管理 完成
  customer: {
    saveOrUpdate: 'user_selectByRoleId;base_role_findAll;customer_saveOrUpdate',
    delete: 'customer_deleteById',
    deleteAll: 'customer_deleteByIdAll'
  },

  // 3. 业务模块
  // 指标记录
  indexRecord: {
    saveOrUpdate: 'indexRecord_saveOrUpdate;base_role_findAll;user_selectByRoleId',
    delete: 'indexRecord_deleteById',
    deleteAll: 'indexRecord_deleteByIdAll'
  },
  // 移圈记录
  shiftCircle: {
    saveOrUpdate: 'user_selectByRoleId;base_role_findAll;shiftCircle_saveOrUpdate;animal_findByAnimalId',
    delete: 'shiftCircle_deleteById',
    deleteAll: 'shiftCircle_deleteByIdAll'
  },
  // 接种记录
  inoculationRecord: {
    saveOrUpdate: 'vaccines_queryAll;base_role_findAll;user_selectByRoleId;inoculationRecord_saveOrUpdate',
    delete: 'inoculationRecord_deleteById',
    deleteAll: 'inoculationRecord_deleteByIdAll'
  },
  // 饲料更换
  feedRecord: {
    saveOrUpdate: 'batch_queryAll;feed_queryAll;base_role_findAll;user_selectByRoleId;feedRecord_saveOrUpdate',
    delete: 'feedRecord_deleteById',
    deleteAll: 'feedRecord_deleteByIdAll'
  },
  // 特殊情况上报
  situationReporting: {
    saveOrUpdate: 'situationReporting_saveOrUpdate;base_role_findAll;user_selectByRoleId',
    delete: 'situationReporting_deleteById',
    deleteAll: 'situationReporting_deleteByIdAll',
    // 处理
    solve: 'situationReporting_updateStatus;base_role_findAll;user_selectByRoleId'
  },
  // 病症记录
  diseaseRecord: {
    saveOrUpdate: 'diseaseRecord_queryAllDisease;base_role_findAll;user_selectByRoleId;diseaseRecord_saveOrUpdate',
    delete: 'diseaseRecord_deleteById',
    deleteAll: 'diseaseRecord_deleteByIdAll',
    // 诊疗记录
    cure: 'diseaseRecord_saveOrUpdate'
  },
  // 检疫登记
  quarantineRegistration: {
    saveOrUpdate: 'batch_queryAll;base_role_findAll;user_selectByRoleId;quarantineRegistration_saveOrUpdate;file_upload',
    delete: 'quarantineRegistration_deleteById',
    deleteAll: 'quarantineRegistration_deleteByIdAll'
  },
  // 出单记录
  issueRecord: {
    saveOrUpdate: 'base_role_findAll;user_selectByRoleId;customer_queryAll;issueRecord_saveOrUpdate',
    delete: 'issueRecord_deleteById',
    deleteAll: 'issueRecord_deleteByIdAll',
    finish: 'issueRecord_updateStatusById'
  },

  // 1. 基础管理的内容
  // 角色管理的后台api标识，可以进行按钮权限的判断
  role: {
    saveOrUpdate: 'base_authority_findAllAuthorityTree;base_role_saveOrUpdateRole',
    delete: 'base_role_deleteRoleById'
  },
  // 权限管理
  auth: {
    saveOrUpdate: 'base_authority_saveOrUpdate;base_authority_findAllAuthorityTree',
    delete: 'base_authority_deleteById'
  },
  // 日志管理
  logs: {
    search: 'base_log_findByCondition'
  },
  // 用户管理
  user: {
    saveOrUpdate: 'base_account_saveOrUpdateAccount',
    delete: 'base_account_deleteAccoutById',
    setRole: 'base_account_saveOrUpdateAccount;base_role_findAll',
    resetPassword: 'base_account_resetPasswd',
    toggleStatus: 'base_account_toggleAccountStatus'
  },
  // 挂载api
  api: {
    toMount: 'base_backendapi_findByCondition;base_authority_authorityWithBackendApi'
  }
}

/**
 * @description: 通过url路径找二级菜单的按钮数组
 * @param {*} url
 * @return {*}  返回当前页面的权限树
 */
export function getSubsByUrl(url) {
  // authsMe 当前用户的权限树
  const authsMe = getAuths()

  let subs = {}

  authsMe.forEach(item => {
    // subs 当前页面的权限树
    const temp = item.subs.filter(item => item.url === url)
    if (temp.length > 0) {
      subs = temp[0]
      return
    }
  })
  return subs
}

