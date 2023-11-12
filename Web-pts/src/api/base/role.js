/*
 * @Description: 基础角色API
 * @Author: Ronda
 * @Date: 2020-08-04 16:47:38
 * @LastEditors: Ronda
 * @LastEditTime: 2022-03-29 16:27:08
 */
import { get, postJSON, del } from '@/utils/request'

/**
 * @description: 保存或更新角色信息
 * @param {*} data  角色的基本信息和权限信息
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/base/role`, data)
}

/**
 * @description: 通过id删除角色
 * @param {*} roleId   角色id
 * @return {*}
 */
export function deleteById(roleId) {
  return del(`/base/role/${roleId}`)
}

/**
 * @description: 查找所有角色
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/base/role/all`)
}

/**
 * @description: 查找某个用户的角色权限信息
 * @param {*} data
 * @return {*}
 */
export function findByAccountId(data) {
  return get(`/base/role/by/account`, data)
}

/**
 * @description: 分页查找角色信息，可能不用
 * @param {*} data  分页数据
 * @return {*}
 */
export function findByPage(data) {
  return get(`/base/role/by/page`, data)
}

