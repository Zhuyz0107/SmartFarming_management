/*
 * @Description: 接种记录后台api
 * @Author: Ronda
 * @Date: 2022-04-08 17:02:18
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-11 16:06:13
 */

import { get, postJSON, del, delJSON } from '@/utils/request'

/**
 * @description: 根据id删除接种记录
 * @param {*} irId
 * @return {*}
 */
export function delById(irId) {
  return del(`/inoculationRecord/deleteById/${irId}`)
}

/**
 * @description: 批量删除接种记录
 * @param {*} irIds
 * @return {*}
 */
export function deleteByIdAll(irIds) {
  return delJSON(`/inoculationRecord/deleteByIdAll`, irIds)
}

/**
 * @description: 分页并根据条件查询接种记录
 * @param {*} data
 * @return {*}
 */
export function findByOption(data) {
  const obj = { ...data }
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return get(`/inoculationRecord/query`, obj)
}
/**
 * @description: 查询所有接种记录
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/inoculationRecord/queryAll`)
}

/**
 * @description: 保存或更新接种记录
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/inoculationRecord/saveOrUpdate`, data)
}

/**
 * @description: 查询所有已参与接种人员信息
 * @param {*}
 * @return {*}
 */
export function findAllRecordAccount() {
  return get(`/inoculationRecord/selectAllAccount`)
}
