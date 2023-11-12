import { login, logout, getInfo, getAuthsMenuTree } from '@/api/base/user'
import { getToken, setToken, removeToken, getAuths, setAuths, removeAuths } from '@/utils/auth'
import router, { resetRouter } from '@/router'
// import { get } from '@/utils/request'
// import { Message } from 'element-ui'

const state = {
  // 用户token
  token: getToken(),
  // 用户权限树
  authsMe: getAuths(),
  userId: '',
  name: '',
  avatar: '',
  roles: [],
  roleIds: [],
  user: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AUTHSME: (state, authsMe) => {
    state.authsMe = authsMe
  },

  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLE_IDS: (state, roleIds) => {
    state.roleIds = roleIds
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  async getInfo({ commit, state, dispatch }) {
    // 获取用户的权限信息，并设置到仓库中和localStorage中
    // const res = await getAuthsMenuTree()
    const res = {
    "code": 200,
    "status": "ok",
    "message": "成功",
    "data": [
        {
            "id": "ae303bce-5436-4ee9-8183-d7112cdb1977",
            "parentId": null,
            "name": "屠宰作业管理",
            "url": "/slaughterOperationManage",
            "perms": null,
            "type": 0,
            "icon": "icon_9",
            "orderNum": 90,
            "hidden": 1,
            "subs": [
                {
                    "id": "cb48a87b-6241-4b80-aa8b-d0faf00ff787",
                    "parentId": "ae303bce-5436-4ee9-8183-d7112cdb1977",
                    "name": "屠宰组管理",
                    "url": "/slaughterOperationManage/slaughteringGroup/Index",
                    "perms": "slaughteringGroup_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "a6447bfa-1135-4316-8d4d-b9fb653909d3",
                            "parentId": "cb48a87b-6241-4b80-aa8b-d0faf00ff787",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "slaughteringGroup_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "0db126d7-ca4b-45d3-bf84-6567366fe956",
                            "parentId": "cb48a87b-6241-4b80-aa8b-d0faf00ff787",
                            "name": "设置成员",
                            "url": null,
                            "perms": "slaughteringGroup_updateAccount;slaughteringGroup_selectAllAccount",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "6c2adfd8-febf-44a6-965a-fcd81e7fc19e",
                            "parentId": "cb48a87b-6241-4b80-aa8b-d0faf00ff787",
                            "name": "禁用",
                            "url": null,
                            "perms": "slaughteringGroup_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "1ee28186-ebd8-4d10-bca0-f113d781a020",
                            "parentId": "cb48a87b-6241-4b80-aa8b-d0faf00ff787",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "slaughteringGroup_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "b3d8348e-e6de-475d-abf5-9507555afe4c",
                    "parentId": "ae303bce-5436-4ee9-8183-d7112cdb1977",
                    "name": "屠宰记录",
                    "url": "/slaughterOperationManage/slaughterRegistration/Index",
                    "perms": "slaughterRegistration_query;slaughterRegistration_saveOrUpdate;slaughteringGroup_queryAll",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": []
                }
            ]
        },
        {
            "id": "9792acc0-fe29-4c24-8f36-66caf74ef5a2",
            "parentId": null,
            "name": "监控管理",
            "url": "/monitoringManage",
            "perms": null,
            "type": 0,
            "icon": "icon_12",
            "orderNum": 120,
            "hidden": 1,
            "subs": [
                {
                    "id": "4d728d48-855c-4768-9146-e6eae2ff1312",
                    "parentId": "9792acc0-fe29-4c24-8f36-66caf74ef5a2",
                    "name": "采集数据展示",
                    "url": "/monitoringManage/dataDisplay/Index",
                    "perms": null,
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": []
                },
                {
                    "id": "5c819472-8cbd-4762-88e1-4e8e78416d9f",
                    "parentId": "9792acc0-fe29-4c24-8f36-66caf74ef5a2",
                    "name": "实时监控视频",
                    "url": "/monitoringManage/videoDisplay/Index",
                    "perms": null,
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": []
                },
                {
                    "id": "213b6b6c-1c30-4552-9128-05d55e665533",
                    "parentId": "9792acc0-fe29-4c24-8f36-66caf74ef5a2",
                    "name": "设备反向控制",
                    "url": "/monitoringManage/deviceManage/Index",
                    "perms": null,
                    "type": 1,
                    "icon": null,
                    "orderNum": 3,
                    "hidden": 1,
                    "subs": []
                }
            ]
        },
        {
            "id": "4a12d78b-d871-42cb-b7b9-179eb3ddc7ab",
            "parentId": null,
            "name": "销售作业管理",
            "url": "/salesOperationManage",
            "perms": null,
            "type": 0,
            "icon": "icon_11",
            "orderNum": 110,
            "hidden": 1,
            "subs": [
                {
                    "id": "b8c14cb4-24a9-44f1-a913-eba7ed224973",
                    "parentId": "4a12d78b-d871-42cb-b7b9-179eb3ddc7ab",
                    "name": "客户管理",
                    "url": "/salesOperationManage/customer/Index",
                    "perms": "customer_queryAllUser;customer_query;base_role_findAll",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "b0fd6387-db32-4cb2-8f82-2a30cb430f61",
                            "parentId": "b8c14cb4-24a9-44f1-a913-eba7ed224973",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "user_selectByRoleId;base_role_findAll;customer_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "de55ba30-36cb-4d5c-84b5-85fc6c1e09a8",
                            "parentId": "b8c14cb4-24a9-44f1-a913-eba7ed224973",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "customer_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "38e06ac4-11f9-44bb-9837-4a6c2b2b019f",
                            "parentId": "b8c14cb4-24a9-44f1-a913-eba7ed224973",
                            "name": "禁用",
                            "url": null,
                            "perms": "customer_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "87201978-dbea-48ba-a196-b6282b5fa32d",
                    "parentId": "4a12d78b-d871-42cb-b7b9-179eb3ddc7ab",
                    "name": "出单记录",
                    "url": "/salesOperationManage/issueRecord/Index",
                    "perms": "issueRecord_query;issueRecord_queryAllUser",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "e7bfb2fc-e8c8-4400-b758-0a7543c866b2",
                            "parentId": "87201978-dbea-48ba-a196-b6282b5fa32d",
                            "name": "批量删除",
                            "url": null,
                            "perms": "issueRecord_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "5b9cb98d-76a3-47bc-9f13-510862adc323",
                            "parentId": "87201978-dbea-48ba-a196-b6282b5fa32d",
                            "name": "完成",
                            "url": null,
                            "perms": "issueRecord_updateStatusById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "0b409bbd-c36e-476f-92fb-b8023979234c",
                            "parentId": "87201978-dbea-48ba-a196-b6282b5fa32d",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "base_role_findAll;user_selectByRoleId;customer_queryAll;issueRecord_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "c10ecf84-d091-4e70-a071-46553d817e92",
                            "parentId": "87201978-dbea-48ba-a196-b6282b5fa32d",
                            "name": "删除",
                            "url": null,
                            "perms": "issueRecord_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "c91692a7-d649-43c7-abd9-eaf57c6dfa8a",
            "parentId": null,
            "name": "特殊情况上报",
            "url": "/specialCaseReporting",
            "perms": null,
            "type": 0,
            "icon": "icon_6",
            "orderNum": 60,
            "hidden": 1,
            "subs": [
                {
                    "id": "bcf4b9f0-ea1b-4b11-9810-9e69d046cc11",
                    "parentId": "c91692a7-d649-43c7-abd9-eaf57c6dfa8a",
                    "name": "特殊情况上报",
                    "url": "/specialCaseReporting/situationReporting/Index",
                    "perms": "situationReporting_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "e46e383c-6e72-42eb-aeb7-d77500cac72a",
                            "parentId": "bcf4b9f0-ea1b-4b11-9810-9e69d046cc11",
                            "name": "删除",
                            "url": null,
                            "perms": "situationReporting_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "3a178a98-fffd-450d-8d3a-2327e69ff9fb",
                            "parentId": "bcf4b9f0-ea1b-4b11-9810-9e69d046cc11",
                            "name": "批量删除",
                            "url": null,
                            "perms": "situationReporting_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "13ae1bb7-8998-488f-821a-8aa5d59e3025",
                            "parentId": "bcf4b9f0-ea1b-4b11-9810-9e69d046cc11",
                            "name": "处理",
                            "url": null,
                            "perms": "situationReporting_updateStatus;base_role_findAll;user_selectByRoleId",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "e2631140-1cdd-49bd-ab02-cf756c00da05",
                            "parentId": "bcf4b9f0-ea1b-4b11-9810-9e69d046cc11",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "situationReporting_saveOrUpdate;base_role_findAll;user_selectByRoleId",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "7824bc8e-9cd9-4816-ace9-152586605de1",
            "parentId": null,
            "name": "日志管理",
            "url": "/logs",
            "perms": null,
            "type": 0,
            "icon": "icon_14",
            "orderNum": 400,
            "hidden": 1,
            "subs": [
                {
                    "id": "6fdafe5f-f0ef-4c62-9c16-e9232fa7127e",
                    "parentId": "7824bc8e-9cd9-4816-ace9-152586605de1",
                    "name": "日志管理",
                    "url": "/logs/logs/Index",
                    "perms": "base_log_findByCondition",
                    "type": 1,
                    "icon": null,
                    "orderNum": null,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "3def01d2-b18b-485d-a71b-47b473d7dffb",
                            "parentId": "6fdafe5f-f0ef-4c62-9c16-e9232fa7127e",
                            "name": "搜索",
                            "url": null,
                            "perms": "base_log_findByCondition",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 1,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "a531a5c1-38e5-4467-b594-f695805d9124",
            "parentId": null,
            "name": "饲料作业管理",
            "url": "/feedOperationManage",
            "perms": null,
            "type": 0,
            "icon": "icon_4",
            "orderNum": 40,
            "hidden": 1,
            "subs": [
                {
                    "id": "28cd492c-ba44-48cf-b74a-6144e783c415",
                    "parentId": "a531a5c1-38e5-4467-b594-f695805d9124",
                    "name": "饲料管理",
                    "url": "/feedOperationManage/feed/Index",
                    "perms": "feed_query",
                    "type": 1,
                    "icon": "",
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "b3f365db-3b76-435a-892e-9f6e3eb2dc5f",
                            "parentId": "28cd492c-ba44-48cf-b74a-6144e783c415",
                            "name": "禁用",
                            "url": null,
                            "perms": "feed_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "7b1a33fa-ac7d-44e7-8f96-54e877bec3a5",
                            "parentId": "28cd492c-ba44-48cf-b74a-6144e783c415",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "feed_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "8a93d109-f8bb-43ee-ad99-55f4094f8c8b",
                            "parentId": "28cd492c-ba44-48cf-b74a-6144e783c415",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "feed_saveOrUpdate;file_upload",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "2e3601f9-0fac-4a40-a3d3-65e5f78d06db",
                    "parentId": "a531a5c1-38e5-4467-b594-f695805d9124",
                    "name": "饲料更换",
                    "url": "/feedOperationManage/feedRecord/Index",
                    "perms": "feedRecord_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "e448c20f-a73b-46c3-9e13-cfb1d376d78f",
                            "parentId": "2e3601f9-0fac-4a40-a3d3-65e5f78d06db",
                            "name": "删除",
                            "url": null,
                            "perms": "feedRecord_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "099156c6-347c-4cf5-9c70-281456009a42",
                            "parentId": "2e3601f9-0fac-4a40-a3d3-65e5f78d06db",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "batch_queryAll;feed_queryAll;base_role_findAll;user_selectByRoleId;feedRecord_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "510ffd82-ae72-4506-baab-94c20afb596a",
                            "parentId": "2e3601f9-0fac-4a40-a3d3-65e5f78d06db",
                            "name": "批量删除",
                            "url": null,
                            "perms": "feedRecord_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "1d54bf62-6c5a-4c1f-9858-7ba2b4dc8ec2",
            "parentId": null,
            "name": "医疗作业管理",
            "url": "/medicalOperationManage",
            "perms": null,
            "type": 0,
            "icon": "icon_7",
            "orderNum": 70,
            "hidden": 1,
            "subs": [
                {
                    "id": "781eafe2-0727-41d8-9e13-4188d1dc2d42",
                    "parentId": "1d54bf62-6c5a-4c1f-9858-7ba2b4dc8ec2",
                    "name": "病症管理",
                    "url": "/medicalOperationManage/disease/Index",
                    "perms": "disease_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "4116d630-8ca0-4bc8-9190-ce5909319a1d",
                            "parentId": "781eafe2-0727-41d8-9e13-4188d1dc2d42",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "disease_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "fb72bd69-3002-4d67-a3c8-db47a2e4d7b8",
                            "parentId": "781eafe2-0727-41d8-9e13-4188d1dc2d42",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "disease_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "f14a980b-c273-449a-be7e-b0effe1b6feb",
                            "parentId": "781eafe2-0727-41d8-9e13-4188d1dc2d42",
                            "name": "禁用",
                            "url": null,
                            "perms": "disease_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "df0412ca-e3b5-4f59-80fb-9cee4c8e5a86",
                    "parentId": "1d54bf62-6c5a-4c1f-9858-7ba2b4dc8ec2",
                    "name": "病症记录",
                    "url": "/medicalOperationManage/diseaseRecord/Index",
                    "perms": "diseaseRecord_queryAllDisease;diseaseRecord_queryAllUser;diseaseRecord_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "c5bc838e-ed7e-4df1-8009-dfdbb6fa9e5a",
                            "parentId": "df0412ca-e3b5-4f59-80fb-9cee4c8e5a86",
                            "name": "批量删除",
                            "url": null,
                            "perms": "diseaseRecord_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "c37577b6-6cb8-49fe-9f53-b3e7cb6b03cb",
                            "parentId": "df0412ca-e3b5-4f59-80fb-9cee4c8e5a86",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "diseaseRecord_queryAllDisease;base_role_findAll;user_selectByRoleId;diseaseRecord_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "3bf4792d-f63e-4ed2-a0a2-5a14f95936e2",
                            "parentId": "df0412ca-e3b5-4f59-80fb-9cee4c8e5a86",
                            "name": "删除",
                            "url": null,
                            "perms": "diseaseRecord_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "5972ad1f-05e8-410d-8097-4f4d9a23cc00",
                            "parentId": "df0412ca-e3b5-4f59-80fb-9cee4c8e5a86",
                            "name": "诊疗记录",
                            "url": null,
                            "perms": "diseaseRecord_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "699c61d8-9c76-4d3b-a36f-65d89ae31787",
                    "parentId": "1d54bf62-6c5a-4c1f-9858-7ba2b4dc8ec2",
                    "name": "疫苗管理",
                    "url": "/medicalOperationManage/vaccines/Index",
                    "perms": "vaccines_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 3,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "71d292e2-1f65-46c2-a2a0-c4f871e44e48",
                            "parentId": "699c61d8-9c76-4d3b-a36f-65d89ae31787",
                            "name": "禁用",
                            "url": null,
                            "perms": "vaccines_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "1f8962d1-2d7d-4708-9336-bcc745cc37e6",
                            "parentId": "699c61d8-9c76-4d3b-a36f-65d89ae31787",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "vaccines_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "e5fd0cbe-e22e-4664-893e-cef56e989683",
                            "parentId": "699c61d8-9c76-4d3b-a36f-65d89ae31787",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "vaccines_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "e2640086-3534-4737-beb4-872f89202264",
                    "parentId": "1d54bf62-6c5a-4c1f-9858-7ba2b4dc8ec2",
                    "name": "接种记录",
                    "url": "/medicalOperationManage/inoculationRecord/Index",
                    "perms": "vaccines_queryAll;inoculationRecord_selectAllAccount;inoculationRecord_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 4,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "006128fa-cdaa-4d88-bbe2-c40f7bb37541",
                            "parentId": "e2640086-3534-4737-beb4-872f89202264",
                            "name": "批量删除",
                            "url": null,
                            "perms": "inoculationRecord_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "7f3e6296-ec92-4877-9ec8-c20975e29c9a",
                            "parentId": "e2640086-3534-4737-beb4-872f89202264",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "vaccines_queryAll;base_role_findAll;user_selectByRoleId;inoculationRecord_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "0a54d0d8-569f-423f-9c5f-f77104e2b0b0",
                            "parentId": "e2640086-3534-4737-beb4-872f89202264",
                            "name": "删除",
                            "url": null,
                            "perms": "inoculationRecord_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "1",
            "parentId": null,
            "name": "人员权限控制",
            "url": "/base",
            "perms": null,
            "type": 0,
            "icon": "icon_1",
            "orderNum": 300,
            "hidden": 1,
            "subs": [
                {
                    "id": "2",
                    "parentId": "1",
                    "name": "用户管理",
                    "url": "/base/user/Index",
                    "perms": "base_account_findByCondition",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "89b19328-3e54-4d62-b7fd-b435d1f7ce4d",
                            "parentId": "2",
                            "name": "重置密码",
                            "url": null,
                            "perms": "base_account_resetPasswd",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "4",
                            "parentId": "2",
                            "name": "移除",
                            "url": null,
                            "perms": "base_account_deleteAccoutById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "71c0d708-90c9-4661-94bd-cdb6a0b63001",
                            "parentId": "2",
                            "name": "启用/禁用账户",
                            "url": null,
                            "perms": "base_account_toggleAccountStatus",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "f7136b5a-0ae0-43a8-a898-413f0d2e35b9",
                            "parentId": "2",
                            "name": "设置角色",
                            "url": null,
                            "perms": "base_account_saveOrUpdateAccount;base_role_findAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 1,
                            "subs": []
                        },
                        {
                            "id": "3",
                            "parentId": "2",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "base_account_saveOrUpdateAccount",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "d902d901-5727-42e3-b40c-1f35d88fef6a",
                    "parentId": "1",
                    "name": "角色管理",
                    "url": "/base/role/Index",
                    "perms": "base_role_findAll",
                    "type": 1,
                    "icon": "",
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "e0273cca-f6f6-42b2-8971-6105db4a60c6",
                            "parentId": "d902d901-5727-42e3-b40c-1f35d88fef6a",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "base_authority_findByRoleId;base_authority_findAllAuthorityTree;base_role_saveOrUpdateRole",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 1,
                            "subs": []
                        },
                        {
                            "id": "a1ae72bd-496a-415a-8f29-99a11119185d",
                            "parentId": "d902d901-5727-42e3-b40c-1f35d88fef6a",
                            "name": "移除",
                            "url": null,
                            "perms": "base_role_deleteRoleById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 1,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "7df6ee06-7865-44a1-a362-f09f0f217590",
                    "parentId": "1",
                    "name": "权限管理",
                    "url": "/base/auth/Index",
                    "perms": "base_authority_findAllAuthorityTree",
                    "type": 1,
                    "icon": null,
                    "orderNum": 3,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "7f72859f-75bf-47d2-bed4-0aab46cbae28",
                            "parentId": "7df6ee06-7865-44a1-a362-f09f0f217590",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "base_authority_saveOrUpdate;base_authority_findAllAuthorityTree",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 1,
                            "subs": []
                        },
                        {
                            "id": "f5f54e42-589c-49ea-9d26-531ef2013e6d",
                            "parentId": "7df6ee06-7865-44a1-a362-f09f0f217590",
                            "name": "移除",
                            "url": null,
                            "perms": "base_authority_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 1,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "8ba36a5f-a9d7-46e0-a3c4-b2669970b9c2",
                    "parentId": "1",
                    "name": "挂载API",
                    "url": "/base/api/Index",
                    "perms": "base_authority_findAllAuthorityTree",
                    "type": 1,
                    "icon": null,
                    "orderNum": 4,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "9df2578a-180a-4263-90b7-ec5786450a8a",
                            "parentId": "8ba36a5f-a9d7-46e0-a3c4-b2669970b9c2",
                            "name": "挂载",
                            "url": null,
                            "perms": "base_backendapi_findByCondition;base_authority_authorityWithBackendApi",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 1,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "3ab650d6-5f6a-4dd9-b52d-6e64db142a5b",
            "parentId": null,
            "name": "质检出栏管理",
            "url": "/qualityInspectionAndExportManage",
            "perms": null,
            "type": 0,
            "icon": "icon_8",
            "orderNum": 80,
            "hidden": 1,
            "subs": [
                {
                    "id": "299453f9-f2e1-4d56-a264-9df2407e79bc",
                    "parentId": "3ab650d6-5f6a-4dd9-b52d-6e64db142a5b",
                    "name": "检疫登记",
                    "url": "/qualityInspectionAndExportManage/quarantineRegistration/Index",
                    "perms": "quarantineRegistration_query;quarantineRegistration_queryAllUser",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "d35c9146-1da2-4636-af37-0592b952fbd0",
                            "parentId": "299453f9-f2e1-4d56-a264-9df2407e79bc",
                            "name": "批量删除",
                            "url": null,
                            "perms": "quarantineRegistration_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "cfbc2bd7-27c9-40b9-ab57-dbbc849d7f15",
                            "parentId": "299453f9-f2e1-4d56-a264-9df2407e79bc",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "batch_queryAll;base_role_findAll;user_selectByRoleId;quarantineRegistration_saveOrUpdate;file_upload",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "0018c288-74be-4071-a9df-11dfb3177e50",
                            "parentId": "299453f9-f2e1-4d56-a264-9df2407e79bc",
                            "name": "删除",
                            "url": null,
                            "perms": "quarantineRegistration_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "e88cdde1-9b73-4784-8b26-4fe15ac4fc66",
                    "parentId": "3ab650d6-5f6a-4dd9-b52d-6e64db142a5b",
                    "name": "生猪出栏",
                    "url": "/qualityInspectionAndExportManage/outCircle/Index",
                    "perms": "outCircle_query;outCircle_saveOrUpdate",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": []
                }
            ]
        },
        {
            "id": "db22352a-6a9d-4bc9-a930-4498bc4f7675",
            "parentId": null,
            "name": "场地管理",
            "url": "/locationManage",
            "perms": null,
            "type": 0,
            "icon": "icon_2",
            "orderNum": 20,
            "hidden": 1,
            "subs": [
                {
                    "id": "05fa9a0e-a9f5-495b-9b62-4958d80b03e2",
                    "parentId": "db22352a-6a9d-4bc9-a930-4498bc4f7675",
                    "name": "栏舍管理",
                    "url": "/locationManage/fenceHouse/Index",
                    "perms": "fenceHouse_query",
                    "type": 1,
                    "icon": "icon_1",
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "eb860046-9a40-470e-bfc0-cbf933ad0e3b",
                            "parentId": "05fa9a0e-a9f5-495b-9b62-4958d80b03e2",
                            "name": "详情",
                            "url": null,
                            "perms": "fenceHouse_selectById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "c2dfb17c-07b3-4f87-ae8f-0a1ebadb0aa2",
                            "parentId": "05fa9a0e-a9f5-495b-9b62-4958d80b03e2",
                            "name": "禁用",
                            "url": null,
                            "perms": "fenceHouse_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "6eb68f43-edeb-450b-a2e0-09d988a499be",
                            "parentId": "05fa9a0e-a9f5-495b-9b62-4958d80b03e2",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "fenceHouse_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "bdd5f480-3c1e-4e4c-aff8-9ccb33909bb1",
                            "parentId": "05fa9a0e-a9f5-495b-9b62-4958d80b03e2",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "fenceHouse_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "16042801-b61c-4c53-8367-37e9e27634fb",
                    "parentId": "db22352a-6a9d-4bc9-a930-4498bc4f7675",
                    "name": "栏圈管理",
                    "url": "/locationManage/hurdles/Index",
                    "perms": "hurdles_query;hurdles_queryAllMax;fenceHouse_queryAll",
                    "type": 1,
                    "icon": "icon_11",
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "7c4c67b0-cc0f-4054-93fc-45488ca1aadc",
                            "parentId": "16042801-b61c-4c53-8367-37e9e27634fb",
                            "name": "禁用",
                            "url": null,
                            "perms": "hurdles_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "52f3dcac-2253-489b-9cd3-b4a15848a369",
                            "parentId": "16042801-b61c-4c53-8367-37e9e27634fb",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "hurdles_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "e7573ee0-8340-4520-a7d4-35951c06fca3",
                            "parentId": "16042801-b61c-4c53-8367-37e9e27634fb",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "fenceHouse_queryAll;hurdles_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "d218abf5-3aa6-4965-bdaa-093b021fad15",
            "parentId": null,
            "name": "仓储物流管理",
            "url": "/storageLogisticsManage",
            "perms": null,
            "type": 0,
            "icon": "icon_10",
            "orderNum": 100,
            "hidden": 1,
            "subs": [
                {
                    "id": "df497bc1-b0e9-4723-9b74-9dd92a4ad435",
                    "parentId": "d218abf5-3aa6-4965-bdaa-093b021fad15",
                    "name": "冷库管理",
                    "url": "/storageLogisticsManage/freezer/Index",
                    "perms": "freezer_query;freezer_selectAllAccount",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "4781a1f3-0a61-46d7-8b40-025fd56fe69b",
                            "parentId": "df497bc1-b0e9-4723-9b74-9dd92a4ad435",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "freezer_saveOrUpdate;base_role_findAll;user_selectByRoleId",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "6b4f37c6-c6db-46aa-a74e-558b5f254028",
                            "parentId": "df497bc1-b0e9-4723-9b74-9dd92a4ad435",
                            "name": "禁用",
                            "url": null,
                            "perms": "freezer_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "af34103a-17b8-4ade-9ae5-fa51836f515e",
                            "parentId": "df497bc1-b0e9-4723-9b74-9dd92a4ad435",
                            "name": "批量禁用",
                            "url": null,
                            "perms": "freezer_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "a92dc2e1-5bc4-4ce4-b734-14e39ac69689",
                    "parentId": "d218abf5-3aa6-4965-bdaa-093b021fad15",
                    "name": "入库登记",
                    "url": "/storageLogisticsManage/coldStorageRecord/Index",
                    "perms": "coldStorageRecord_query;base_role_findAll;freezer_squeryAll;coldStorageRecord_saveOrUpdate;user_selectByRoleId",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": []
                },
                {
                    "id": "8a01be98-5cae-43d1-809a-daf9b723d19b",
                    "parentId": "d218abf5-3aa6-4965-bdaa-093b021fad15",
                    "name": "出库登记",
                    "url": "/storageLogisticsManage/outStorageRecord/Index",
                    "perms": "issueRecord_query;issueRecord_queryAllUser;coldStorageRecord_queryAll;coldStorageRecord_updateStorageRecord",
                    "type": 1,
                    "icon": null,
                    "orderNum": 3,
                    "hidden": 1,
                    "subs": []
                }
            ]
        },
        {
            "id": "3ff8914f-5758-460e-aec8-9b69349375e9",
            "parentId": null,
            "name": "动物管理",
            "url": "/animalManage",
            "perms": null,
            "type": 0,
            "icon": "icon_3",
            "orderNum": 30,
            "hidden": 1,
            "subs": [
                {
                    "id": "2edc77be-5cb2-450f-b890-35d2b8d2c880",
                    "parentId": "3ff8914f-5758-460e-aec8-9b69349375e9",
                    "name": "批次管理",
                    "url": "/animalManage/batch/Index",
                    "perms": "batch_query;batch_queryAll",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "363c4dee-b805-4fda-b627-7efdf7da0b6f",
                            "parentId": "2edc77be-5cb2-450f-b890-35d2b8d2c880",
                            "name": "删除",
                            "url": null,
                            "perms": "batch_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "c985e9bc-ebd5-4ad3-8be6-664db1a5f3f6",
                            "parentId": "2edc77be-5cb2-450f-b890-35d2b8d2c880",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "batch_saveOrUpdate",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "0d56d156-f35a-4b3d-ab8f-9fec15247835",
                            "parentId": "2edc77be-5cb2-450f-b890-35d2b8d2c880",
                            "name": "批量删除",
                            "url": null,
                            "perms": "batch_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "7744e10c-f58f-4d5d-8b61-0b8a3c387db6",
                    "parentId": "3ff8914f-5758-460e-aec8-9b69349375e9",
                    "name": "动物管理",
                    "url": "/animalManage/animal/Index",
                    "perms": "animal_query;batch_queryAll;hurdles_selectAllHurdles",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "4b5e48ff-56da-40eb-b7ea-df037ad02ebb",
                            "parentId": "7744e10c-f58f-4d5d-8b61-0b8a3c387db6",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "animal_saveOrUpdate;batch_queryAll;hurdles_selectAllHurdles",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "5061701c-32ba-4d04-8e99-0d480fd08b94",
                            "parentId": "7744e10c-f58f-4d5d-8b61-0b8a3c387db6",
                            "name": "移除",
                            "url": null,
                            "perms": "animal_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "317a16da-e9fb-4f68-bf24-bddf47641e24",
                            "parentId": "7744e10c-f58f-4d5d-8b61-0b8a3c387db6",
                            "name": "批量删除",
                            "url": null,
                            "perms": "animal_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "6b3e4069-4cd5-401f-841b-4992d1174e61",
            "parentId": null,
            "name": "预警管理",
            "url": "/warningManage",
            "perms": null,
            "type": 0,
            "icon": "icon_13",
            "orderNum": 130,
            "hidden": 1,
            "subs": [
                {
                    "id": "4738f18b-4de5-4d24-b360-b186f91d7745",
                    "parentId": "6b3e4069-4cd5-401f-841b-4992d1174e61",
                    "name": "阈值设置",
                    "url": "/warningManage/thresholdSet/Index",
                    "perms": null,
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": []
                },
                {
                    "id": "f1e9c8b8-fa97-4b18-8a68-870fde1f5107",
                    "parentId": "6b3e4069-4cd5-401f-841b-4992d1174e61",
                    "name": "自动报警处理",
                    "url": "/warningManage/autoAlarm/Index",
                    "perms": null,
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": []
                }
            ]
        },
        {
            "id": "0d5cf3f7-26e1-4a5b-a635-9cdc37131ea2",
            "parentId": null,
            "name": "溯源查询",
            "url": "/ptsSource",
            "perms": null,
            "type": 0,
            "icon": "icon_1",
            "orderNum": 10,
            "hidden": 1,
            "subs": [
                {
                    "id": "bf700db9-9674-41f4-b8d6-9c7b45ac707c",
                    "parentId": "0d5cf3f7-26e1-4a5b-a635-9cdc37131ea2",
                    "name": "溯源查询",
                    "url": "/ptsSource/Index",
                    "perms": "animal_query;batch_queryAll;hurdles_selectAllHurdles",
                    "type": 1,
                    "icon": null,
                    "orderNum": null,
                    "hidden": 1,
                    "subs": []
                }
            ]
        },
        {
            "id": "4eaaf1b6-9e0e-48cd-b000-2938afac79b7",
            "parentId": null,
            "name": "养殖作业管理",
            "url": "/breedOperationManage",
            "perms": null,
            "type": 0,
            "icon": "icon_5",
            "orderNum": 50,
            "hidden": 1,
            "subs": [
                {
                    "id": "167cdd63-c1c0-4851-850b-466a70f4b402",
                    "parentId": "4eaaf1b6-9e0e-48cd-b000-2938afac79b7",
                    "name": "指标记录",
                    "url": "/breedOperationManage/indexRecord/Index",
                    "perms": "indexRecord_query;indexRecord_selectAllAccount",
                    "type": 1,
                    "icon": null,
                    "orderNum": 1,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "a1ad2700-3917-4940-9cf0-0e7befb47a0a",
                            "parentId": "167cdd63-c1c0-4851-850b-466a70f4b402",
                            "name": "批量删除",
                            "url": null,
                            "perms": "indexRecord_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "c0780e56-b7ba-4121-aa1c-8f2beebfa4b2",
                            "parentId": "167cdd63-c1c0-4851-850b-466a70f4b402",
                            "name": "删除",
                            "url": null,
                            "perms": "indexRecord_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "583ff30b-ad33-4c6d-a695-37558ad12d1a",
                            "parentId": "167cdd63-c1c0-4851-850b-466a70f4b402",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "indexRecord_saveOrUpdate;base_role_findAll;user_selectByRoleId",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                },
                {
                    "id": "192479bf-b7a2-476b-98b5-cbcec24b7a07",
                    "parentId": "4eaaf1b6-9e0e-48cd-b000-2938afac79b7",
                    "name": "移圈管理",
                    "url": "/breedOperationManage/shiftCircle/Index",
                    "perms": "shiftCircle_queryAllUser;base_role_findAll;hurdles_selectAllHurdles;shiftCircle_query",
                    "type": 1,
                    "icon": null,
                    "orderNum": 2,
                    "hidden": 1,
                    "subs": [
                        {
                            "id": "51e66e46-bf22-4af1-9002-884d09806748",
                            "parentId": "192479bf-b7a2-476b-98b5-cbcec24b7a07",
                            "name": "删除",
                            "url": null,
                            "perms": "shiftCircle_deleteById",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "565b893c-eee1-4f4c-8f29-255c099b5c99",
                            "parentId": "192479bf-b7a2-476b-98b5-cbcec24b7a07",
                            "name": "添加和修改",
                            "url": null,
                            "perms": "user_selectByRoleId;base_role_findAll;shiftCircle_saveOrUpdate;animal_findByAnimalId",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        },
                        {
                            "id": "705db11b-e0e3-42cb-ad24-7592b2e4fdec",
                            "parentId": "192479bf-b7a2-476b-98b5-cbcec24b7a07",
                            "name": "批量删除",
                            "url": null,
                            "perms": "shiftCircle_deleteByIdAll",
                            "type": 2,
                            "icon": null,
                            "orderNum": null,
                            "hidden": 0,
                            "subs": []
                        }
                    ]
                }
            ]
        }
    ]
}
    commit('SET_AUTHSME', res.data)
    setAuths(res.data)
    // 获取用户基本信息
    const { data } = await getInfo()
    // 判断用户类型
    /* if (!data) {
        reject('Verification failed, please Login again.')
      } */
    // const { username: name, avatar, accountId: id } = data
    const { username: name, photo : avatar, accountId: id } = data
    let rolesTemp =  [
            {
                "roleId": "1",
                "roleName": "admin",
                "remark": "管理员",
                "authorities": null
            }
        ]
    // const roles = data.roles.map(item => item.roleName)
    // const roleIds = data.roles.map(item => item.roleId)
    const roles = rolesTemp.map(item => item.roleName)
    const roleIds = roles.map(item => item.roleId)
    
    commit('SET_ROLE_IDS', roleIds)
    // 注意：roles数组不能为空数组，否则会死循环
    if (!roles || roles.length <= 0) {
      roles.push('')
    }
    commit('SET_USER', data)
    commit('SET_USER_ID', id)
    commit('SET_ROLES', roles)
    commit('SET_NAME', name)
    commit('SET_AVATAR', avatar)
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_AUTHSME', [])
        removeToken()
        removeAuths()
        // localStorage.removeItem("studentExam");
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
