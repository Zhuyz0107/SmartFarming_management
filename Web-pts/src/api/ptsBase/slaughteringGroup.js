/*
 * @Description: 屠宰组管理后台接口api
 * @Author: Ronda
 * @Date: 2022-04-02 15:31:18
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-08 10:54:05
 */

import { get, postJSON, del, delJSON } from '@/utils/request'

/**
 * @description: 根据id删除
 * @param {*} sgId
 * @return {*}
 */
export function delById(sgId) {
  return del(`/slaughteringGroup/deleteById/${sgId}`)
}

/**
 * @description: 批量删除
 * @param {*} sgroupIds
 * @return {*}
 */
export function deleteByIdAll(sgroupIds) {
  return delJSON(`/slaughteringGroup/deleteByIdAll`, sgroupIds)
}

/**
 * @description: 分页并根据条件查询屠宰组信息(含组员信息)
 * @param {*} data
 * @return {*}
 */
export function findByOption(data) {
  const obj = { ...data }
  for (const key in obj) {
    if (!obj[key] && +obj[key] !== 0) {
      delete obj[key]
    }
  }
  return get(`/slaughteringGroup/query`, obj)
}

/**
 * @description: 查询所有屠宰组信息
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/slaughteringGroup/queryAll`)
}

/**
 * @description: 保存或更新屠宰组基本信息
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/slaughteringGroup/saveOrUpdate`, data)
}

/**
 * @description: 查询所有屠宰人员信息
 * @param {*}
 * @return {*}
 */
export function selectAllAccount() {
  return get(`/slaughteringGroup/selectAllAccount`)
}

/**
 * @description: 根据屠宰组id查询屠宰组完整信息(含组员信息)
 * @param {*} sgId
 * @return {*}
 */
export function selectById(sgId) {
  return get(`/slaughteringGroup/selectById`, { sgId })
}

/**
 * @description: 更新屠宰组中人员信息
 * @param {*} data
 * @return {*}
 */
export function addAccount(data) {
  return get(`/slaughteringGroup/updateAccount`, data)
}

