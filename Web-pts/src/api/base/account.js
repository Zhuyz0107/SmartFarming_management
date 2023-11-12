/*
 * @Description: 用户账户服务api
 * @Author: Ronda
 * @Date: 2022-03-08 14:35:57
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-29 16:27:18
 */

import { get, postJSON, del, put } from '@/utils/request'

/**
 * @description: 保存或更新用户信息
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/base/account`, data)
}

/**
 * @description: 通过账户id查找账户信息
 * @param {*} accountId
 * @return {*}
 */
export function findById(accountId) {
  return get(`/base/account/${accountId}`)
}

/**
 * @description: 按照id删除用户
 * @param {*} accountId
 * @return {*}
 */
export function delById(accountId) {
  return del(`/base/account/${accountId}`)
}

/**
 * @description: 分页查找所有用户，可能不用，用findByOption
 * @param {*} data  分页数据
 * @return {*}
 */
export function findByPage(data) {
  return get(`/base/account/all`, data)
}

/**
 * @description: 按条件分页查找
 * @param {*} data
 * @return {*}
 */
export function findByOption(data) {
  return get(`/base/account/by/condition`, data)
}

/**
 * @description: 修改个人密码
 * @param {*} data
 * @return {*}
 */
export function changePassword(data) {
  return put(`/base/account/passwd`, data)
}

/**
 * @description: 重置其他账户密码
 * @param {*} id
 * @return {*}
 */
export function resetPassword(id) {
  return put(`/base/account/passwd/reset`, { accountId: id })
}

/**
 * @description: 启用/禁用账户
 * @param {*} id
 * @return {*}
 */
export function toggleStatus(data) {
  return put(`/base/account/status`, data)
}

/**
 * @description: 通过角色id获取用户信息
 * @param {*} roleId
 * @return {*}
 */
export function findByRole(roleId) {
  return get(`/user/selectByRoleId`, { roleId })
}
