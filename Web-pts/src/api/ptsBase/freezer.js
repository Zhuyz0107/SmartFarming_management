/*
 * @Description: 冷库管理api
 * @Author: Ronda
 * @Date: 2022-03-29 15:55:10
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-02 11:13:20
 */

import { get, postJSON, del } from '@/utils/request.js'

/**
 * @description: 根据id删除冷库信息
 * @param {*} freezerId
 * @return {*}
 */
export function delById(freezerId) {
  return del(`/freezer/deleteById/${freezerId}`)
}

/**
 * @description: 批量删除冷库信息
 * @param {*} freezerIds
 * @return {*}
 */
export function deleteByIdAll(freezerIds) {
  return postJSON(`/freezer/deleteByIdAll`, freezerIds)
}

/**
 * @description: 分页并根据条件查询冷库基本信息以及负责人信息
 * @param {*} data  查询的参数
 * @return {*}
 */
export function findByOption(data) {
  const obj = { ...data }
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return get(`/freezer/query`, obj)
}

/**
 * @description: 不分页查询所有冷库基本信息
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/freezer/queryAll`)
}

/**
 * @description: 保存或更新冷库
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/freezer/saveOrUpdate`, data)
}

/**
 * @description: 不分页查询冷库所有负责人信息
 * @param {*}
 * @return {*}
 */
export function findAllFreezerAccount() {
  return get(`/freezer/selectAllAccount`)
}

