/*
 * @Description: 基础权限管理api
 * @Author: Ronda
 * @Date: 2022-03-08 10:16:33
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-15 14:45:23
 */

import { get, post, postJSON, del } from '@/utils/request'

/**
 * @description: 保存或更新权限
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/base/authority`, data)
}

/**
 * @description: 通过ID删除权限
 * @param {*} authorityId
 * @return {*}
 */
export function deleteById(authorityId) {
  return del(`/base/authority/${authorityId}`)
}

/**
 * @description: 给权限挂接口api
 * @param {*} data
 * @return {*}
 */
export function mountAPI(data) {
  return post(`/base/authority/authorityWithBackendApi`, data)
}

/**
 * @description: 按照角色查找权限树
 * @param {*} roleId
 * @return {*}
 */
export function findByRoleId(roleId) {
  return get(`/base/authority/by/role`, { roleId })
}

/**
 * @description: 权限树
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/base/authority/tree`)
}
