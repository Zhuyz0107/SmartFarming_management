/*
 * @Description: 出单记录后台api
 * @Author: Ronda
 * @Date: 2022-04-08 11:03:29
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-08 11:18:42
 */
import { get, postJSON, del, put, delJSON } from '@/utils/request'

/**
 * @description: 根据id删除出单记录
 * @param {*} isrId
 * @return {*}
 */
export function delById(isrId) {
  return del(`/issueRecord/deleteById/${isrId}`)
}

/**
 * @description: 批量删除出单记录
 * @param {*} isrIds
 * @return {*}
 */
export function deleteByIdAll(isrIds) {
  return delJSON(`/issueRecord/deleteByIdAll`, isrIds)
}

/**
 * @description: 分页并根据条件查询出单记录
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
  return get(`/issueRecord/query`, obj)
}

/**
 * @description: 查询所有出单记录
 * @param {*}
 * @return {*}
 */
export function findAll() {
  return get(`/issueRecord/queryAll`)
}

/**
 * @description: 查询所有销售人员信息
 * @param {*}
 * @return {*}
 */
export function findAllRecordAccount() {
  return get(`/issueRecord/queryAllUser`)
}

/**
 * @description: 保存或更新出单记录
 * @param {*} data
 * @return {*}
 */
export function saveOrUpdate(data) {
  return postJSON(`/issueRecord/saveOrUpdate`, data)
}

/**
 * @description: 根据出单id查询批次
 * @param {*} isrId
 * @return {*}
 */
export function findById(isrId) {
  return get(`/issueRecord/selectById/${isrId}`)
}

/**
 * @description: 根据出单记录id更新状态
 * @param {*}
 * @return {*}
 */
export function updateStatusById(data) {
  return put(`/issueRecord/updateStatusById`, data)
}

