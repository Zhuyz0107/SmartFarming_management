/*
 * @Description: 特殊情况上报api
 * @Author: Ronda
 * @Date: 2022-04-02 13:14:01
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-02 14:18:40
 */

import { get, postJSON, del, put } from '@/utils/request'

/**
 * @description: 根据id删除
 * @param {*} irdId
 * @return {*}
 */
export function delById(srId) {
  return del(`/situationReporting/deleteById/${srId}`)
}

/**
 * @description: 批量删除
 * @param {*} irdIds
 * @return {*}
 */
export function deleteByIdAll(irdIds) {
  return postJSON(`/situationReporting/deleteByIdAll`, irdIds)
}

/**
 * @description: 分页并根据条件查询
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
  return get(`/situationReporting/query`, obj)
}

/**
 * @description: 保存或更新
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/situationReporting/saveOrUpdate`, data)
}

/**
 * @description: 更新特殊情况状态
 * @param {*}
 * @return {*}
 */
export function updateStatus(data) {
  return put(`/situationReporting/updateStatus`, data)
}
