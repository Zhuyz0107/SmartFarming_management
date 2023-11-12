/*
 * @Description: 饲料更换api
 * @Author: Ronda
 * @Date: 2022-04-07 13:29:25
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-07 14:29:04
 */
import { del, get, postJSON } from '@/utils/request'

/**
 * @description: 根据id删除饲料更换记录
 * @param {*} frId
 * @return {*}
 */
export function delById(frId) {
  return del(`/feedRecord/deleteById/${frId}`)
}

/**
 * @description: 批量删除饲料更换记录
 * @param {*} frIds
 * @return {*}
 */
export function deleteByIdAll(frIds) {
  return postJSON(`/feedRecord/deleteByIdAll`, frIds)
}

/**
 * @description: 分页并根据条件查询饲料更换记录信息
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
  return get(`/feedRecord/query`, obj)
}

/**
 * @description: 保存或更新饲料更换
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/feedRecord/saveOrUpdate`, data)
}

