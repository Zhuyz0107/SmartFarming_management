/*
 * @Description: 饲料管理api
 * @Author: Ronda
 * @Date: 2022-04-01 18:59:45
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-07 13:48:59
 */
import { postJSON, del, get } from '@/utils/request'

/**
 * @description: 根据id删除
 * @param {*} id
 * @return {*}
 */
export function delById(id) {
  return del(`/feed/deleteById/${id}`)
}

/**
 * @description: 批量删除
 * @param {*} ids
 * @return {*}
 */
export function deleteByIdAll(ids) {
  return del(`/feed/deleteByIdAll`, { ids: ids.toString() })
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
  return get(`/feed/query`, obj)
}

/**
 * @description: 查询饲料
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/feed/queryAll`)
}

/**
 * @description: 保存或更新
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/feed/saveOrUpdate`, data)
}
